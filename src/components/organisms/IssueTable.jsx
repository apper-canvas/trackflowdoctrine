import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const IssueTable = ({ issues, onIssueClick, onStatusChange, onDelete }) => {
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortedIssues = () => {
    return [...issues].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle different data types
      if (sortField === "createdAt" || sortField === "updatedAt") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortField === "priority") {
        const priorityOrder = { low: 1, medium: 2, high: 3, critical: 4 };
        aValue = priorityOrder[aValue];
        bValue = priorityOrder[bValue];
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  const getTypeIcon = (type) => {
    const icons = {
      bug: "Bug",
      feature: "Sparkles",
      task: "CheckSquare"
    };
    return icons[type] || "Circle";
  };

  const formatDate = (date) => {
    return format(new Date(date), "MMM d, yyyy");
  };

  const columns = [
    { key: "id", label: "ID", sortable: false, width: "w-20" },
    { key: "title", label: "Title", sortable: true, width: "flex-1" },
    { key: "status", label: "Status", sortable: true, width: "w-32" },
    { key: "priority", label: "Priority", sortable: true, width: "w-28" },
    { key: "type", label: "Type", sortable: true, width: "w-24" },
    { key: "createdAt", label: "Created", sortable: true, width: "w-32" },
    { key: "actions", label: "Actions", sortable: false, width: "w-24" },
  ];

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <ApperIcon name="ArrowUpDown" size={14} className="text-slate-400" />;
    }
    return (
      <ApperIcon
        name={sortDirection === "asc" ? "ArrowUp" : "ArrowDown"}
        size={14}
        className="text-primary-600"
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 bg-slate-50 border-b">
        <div className="flex items-center gap-4">
          {columns.map((column) => (
            <div
              key={column.key}
              className={cn(
                column.width,
                column.sortable ? "cursor-pointer select-none" : ""
              )}
              onClick={column.sortable ? () => handleSort(column.key) : undefined}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">
                  {column.label}
                </span>
                {column.sortable && <SortIcon field={column.key} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {getSortedIssues().map((issue, index) => (
            <motion.div
              key={issue.Id}
              className={cn(
                "px-6 py-4 hover:bg-slate-50 transition-colors duration-150 cursor-pointer",
                hoveredRow === issue.Id ? "bg-slate-50" : ""
              )}
              onClick={() => onIssueClick(issue)}
              onMouseEnter={() => setHoveredRow(issue.Id)}
              onMouseLeave={() => setHoveredRow(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <div className="flex items-center gap-4">
                {/* ID */}
                <div className="w-20">
                  <span className="text-sm font-mono text-slate-500">
                    #{issue.id}
                  </span>
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-900 truncate">
                    {issue.title}
                  </h4>
                  {issue.description && (
                    <p className="text-sm text-slate-500 truncate mt-1">
                      {issue.description}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="w-32">
                  <Badge variant={issue.status}>
                    {issue.status.replace("-", " ")}
                  </Badge>
                </div>

                {/* Priority */}
                <div className="w-28">
                  <Badge variant={issue.priority}>
                    {issue.priority}
                  </Badge>
                </div>

                {/* Type */}
                <div className="w-24">
                  <div className="flex items-center gap-1">
                    <ApperIcon
                      name={getTypeIcon(issue.type)}
                      size={14}
                      className="text-slate-500"
                    />
                    <span className="text-sm text-slate-600 capitalize">
                      {issue.type}
                    </span>
                  </div>
                </div>

                {/* Created Date */}
                <div className="w-32">
                  <span className="text-sm text-slate-500">
                    {formatDate(issue.createdAt)}
                  </span>
                </div>

                {/* Actions */}
                <div className="w-24">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onIssueClick(issue);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <ApperIcon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(issue.Id);
                      }}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <ApperIcon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            Showing {issues.length} issue{issues.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <Badge variant="default">
              {columns.find(col => col.key === sortField)?.label} {sortDirection === "asc" ? "↑" : "↓"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueTable;