import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const FilterPanel = ({ filters, onFilterChange, isOpen, onToggle }) => {
  const statusOptions = [
    { value: "open", label: "Open", count: 12 },
    { value: "in-progress", label: "In Progress", count: 8 },
    { value: "review", label: "Review", count: 5 },
    { value: "closed", label: "Closed", count: 23 },
  ];

  const priorityOptions = [
    { value: "critical", label: "Critical", count: 3 },
    { value: "high", label: "High", count: 7 },
    { value: "medium", label: "Medium", count: 15 },
    { value: "low", label: "Low", count: 23 },
  ];

  const typeOptions = [
    { value: "bug", label: "Bug", count: 18 },
    { value: "feature", label: "Feature", count: 20 },
    { value: "task", label: "Task", count: 10 },
  ];

  const handleFilterToggle = (category, value) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({
      ...filters,
      [category]: newValues
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((count, values) => count + (values?.length || 0), 0);
  };

  const clearAllFilters = () => {
    onFilterChange({
      status: [],
      priority: [],
      type: []
    });
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ApperIcon name="Filter" size={16} />
          <span>Filters</span>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="primary" className="ml-2">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <motion.aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-40 lg:z-0
          w-80 lg:w-72 bg-white lg:bg-transparent
          border-r border-slate-200 lg:border-0
          transform lg:transform-none transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto
        `}
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <ApperIcon name="Filter" size={18} />
              Filters
            </h3>
            <div className="flex items-center gap-2">
              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onToggle}
                className="lg:hidden p-1 hover:bg-slate-100 rounded"
              >
                <ApperIcon name="X" size={16} />
              </button>
            </div>
          </div>

          {/* Status Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">Status</h4>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.status?.includes(option.value) || false}
                      onChange={() => handleFilterToggle("status", option.value)}
                      className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-slate-700">{option.label}</span>
                  </div>
                  <Badge variant={option.value}>{option.count}</Badge>
                </label>
              ))}
            </div>
          </div>

          {/* Priority Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">Priority</h4>
            <div className="space-y-2">
              {priorityOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.priority?.includes(option.value) || false}
                      onChange={() => handleFilterToggle("priority", option.value)}
                      className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-slate-700">{option.label}</span>
                  </div>
                  <Badge variant={option.value}>{option.count}</Badge>
                </label>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">Type</h4>
            <div className="space-y-2">
              {typeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.type?.includes(option.value) || false}
                      onChange={() => handleFilterToggle("type", option.value)}
                      className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-slate-700">{option.label}</span>
                  </div>
                  <Badge variant={option.value}>{option.count}</Badge>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default FilterPanel;