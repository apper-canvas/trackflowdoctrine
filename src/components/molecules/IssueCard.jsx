import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const IssueCard = ({ issue, onClick, onStatusChange, isDragging = false, ...props }) => {
  const getTypeIcon = (type) => {
    const icons = {
      bug: "Bug",
      feature: "Sparkles",
      task: "CheckSquare"
    };
    return icons[type] || "Circle";
  };

  const formatDate = (date) => {
    return format(new Date(date), "MMM d");
  };

  return (
    <motion.div
      className={`
        bg-white rounded-lg p-4 border shadow-sm cursor-pointer
        hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
        ${isDragging ? "opacity-50 rotate-3 scale-105" : ""}
      `}
      onClick={onClick}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      {...props}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0 mr-3">
          <h4 className="font-medium text-slate-900 truncate">
            {issue.title}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            #{issue.id}
          </p>
        </div>
        <Badge variant={issue.priority} className="flex-shrink-0">
          {issue.priority}
        </Badge>
      </div>

      {issue.description && (
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
          {issue.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ApperIcon 
            name={getTypeIcon(issue.type)} 
            size={14} 
            className="text-slate-500" 
          />
          <span className="text-xs text-slate-500 capitalize">
            {issue.type}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ApperIcon name="Calendar" size={12} />
          {formatDate(issue.createdAt)}
        </div>
      </div>

      {issue.labels && issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {issue.labels.slice(0, 3).map((label) => (
            <span
              key={label}
              className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full"
            >
              {label}
            </span>
          ))}
          {issue.labels.length > 3 && (
            <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
              +{issue.labels.length - 3}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default IssueCard;