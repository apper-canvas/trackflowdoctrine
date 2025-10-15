import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IssueCard from "@/components/molecules/IssueCard";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const KanbanBoard = ({ issues, onIssueClick, onStatusChange }) => {
  const [draggedIssue, setDraggedIssue] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const dragCounterRef = useRef(0);

  const columns = [
    { 
      id: "open", 
      title: "Open", 
      bgColor: "bg-slate-50", 
      borderColor: "border-slate-200",
      iconColor: "text-slate-600"
    },
    { 
      id: "in-progress", 
      title: "In Progress", 
      bgColor: "bg-blue-50", 
      borderColor: "border-blue-200",
      iconColor: "text-blue-600"
    },
    { 
      id: "review", 
      title: "Review", 
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
      iconColor: "text-purple-600"
    },
    { 
      id: "closed", 
      title: "Closed", 
      bgColor: "bg-green-50", 
      borderColor: "border-green-200",
      iconColor: "text-green-600"
    },
  ];

  const getColumnIssues = (columnId) => {
    return issues.filter(issue => issue.status === columnId);
  };

  const getColumnIcon = (columnId) => {
    const icons = {
      "open": "AlertCircle",
      "in-progress": "Clock",
      "review": "Eye",
      "closed": "CheckCircle"
    };
    return icons[columnId] || "Circle";
  };

  const handleDragStart = (e, issue) => {
    setDraggedIssue(issue);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };

  const handleDragEnd = () => {
    setDraggedIssue(null);
    setDragOverColumn(null);
    dragCounterRef.current = 0;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e, columnId) => {
    e.preventDefault();
    dragCounterRef.current++;
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = async (e, columnId) => {
    e.preventDefault();
    dragCounterRef.current = 0;
    setDragOverColumn(null);

    if (!draggedIssue || draggedIssue.status === columnId) {
      return;
    }

    try {
      await onStatusChange(draggedIssue.Id, columnId);
      toast.success(`Issue moved to ${columns.find(col => col.id === columnId)?.title}`);
    } catch (error) {
      toast.error("Failed to update issue status");
    }
  };

  return (
    <div className="flex gap-6 h-full overflow-x-auto pb-6">
      {columns.map((column) => {
        const columnIssues = getColumnIssues(column.id);
        const isDragOver = dragOverColumn === column.id;
        
        return (
          <div
            key={column.id}
            className={`
              flex-shrink-0 w-80 h-full
              ${isDragOver ? "transform scale-105 transition-transform duration-200" : ""}
            `}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className={`
              ${column.bgColor} ${column.borderColor} border rounded-lg p-4 mb-4 shadow-sm
              ${isDragOver ? "ring-2 ring-primary-500 ring-opacity-50" : ""}
            `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ApperIcon 
                    name={getColumnIcon(column.id)} 
                    size={16} 
                    className={column.iconColor}
                  />
                  <h3 className="font-semibold text-slate-900">
                    {column.title}
                  </h3>
                </div>
                <Badge variant={column.id} className="text-xs">
                  {columnIssues.length}
                </Badge>
              </div>
            </div>

            {/* Column Content */}
            <div className={`
              flex-1 space-y-3 min-h-[200px] rounded-lg p-2 transition-all duration-200
              ${isDragOver 
                ? "bg-primary-50 border-2 border-dashed border-primary-300" 
                : "border-2 border-transparent"
              }
            `}>
              <AnimatePresence mode="popLayout">
                {columnIssues.map((issue) => (
                  <motion.div
                    key={issue.Id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  >
                    <IssueCard
                      issue={issue}
                      onClick={() => onIssueClick(issue)}
                      isDragging={draggedIssue?.Id === issue.Id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, issue)}
                      onDragEnd={handleDragEnd}
                      className="cursor-grab active:cursor-grabbing"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Empty State */}
              {columnIssues.length === 0 && !isDragOver && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                    <ApperIcon 
                      name={getColumnIcon(column.id)} 
                      size={24} 
                      className="text-slate-400" 
                    />
                  </div>
                  <p className="text-slate-500 text-sm">
                    No {column.title.toLowerCase()} issues
                  </p>
                </div>
              )}

              {/* Drop Zone Indicator */}
              {isDragOver && (
                <motion.div
                  className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-primary-400 rounded-lg bg-primary-50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <ApperIcon name="ArrowDown" size={24} className="text-primary-600 mb-2" />
                  <p className="text-primary-700 font-medium">
                    Drop to move to {column.title}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;