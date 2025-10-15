import { useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import IssueForm from "./IssueForm";

const IssueDetailModal = ({ 
  issue, 
  isOpen, 
  onClose, 
  onUpdate, 
  onDelete,
  onDuplicate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!issue) return null;

  const getTypeIcon = (type) => {
    const icons = {
      bug: "Bug",
      feature: "Sparkles",
      task: "CheckSquare"
    };
    return icons[type] || "Circle";
  };

  const formatDate = (date) => {
    return format(new Date(date), "PPp");
  };

  const handleUpdate = async (updatedData) => {
    try {
      await onUpdate(issue.Id, updatedData);
      setIsEditing(false);
      toast.success("Issue updated successfully");
    } catch (error) {
      toast.error("Failed to update issue");
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(issue.Id);
      onClose();
      toast.success("Issue deleted successfully");
    } catch (error) {
      toast.error("Failed to delete issue");
    }
  };

  const handleDuplicate = async () => {
    try {
      await onDuplicate(issue);
      toast.success("Issue duplicated successfully");
    } catch (error) {
      toast.error("Failed to duplicate issue");
    }
  };

  if (isEditing) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Issue"
        size="xl"
      >
        <IssueForm
          issue={issue}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </Modal>
    );
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Issue #${issue.id}`}
        size="xl"
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {issue.title}
              </h1>
              <div className="flex items-center gap-3">
                <Badge variant={issue.priority}>
                  {issue.priority}
                </Badge>
                <Badge variant={issue.status}>
                  {issue.status.replace("-", " ")}
                </Badge>
                <div className="flex items-center gap-1 text-slate-600">
                  <ApperIcon name={getTypeIcon(issue.type)} size={16} />
                  <span className="capitalize">{issue.type}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <ApperIcon name="Edit" size={16} className="mr-2" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDuplicate}
              >
                <ApperIcon name="Copy" size={16} className="mr-2" />
                Duplicate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <ApperIcon name="Trash2" size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-900">Description</h3>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-slate-700 whitespace-pre-wrap">
                {issue.description}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Assignee</h4>
                <p className="text-slate-600">
                  {issue.assignee || "Unassigned"}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Due Date</h4>
                <p className="text-slate-600">
                  {issue.dueDate 
                    ? formatDate(issue.dueDate)
                    : "No due date set"
                  }
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Created</h4>
                <p className="text-slate-600">
                  {formatDate(issue.createdAt)}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-1">Last Updated</h4>
                <p className="text-slate-600">
                  {formatDate(issue.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Labels */}
          {issue.labels && issue.labels.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-slate-900">Labels</h4>
              <div className="flex flex-wrap gap-2">
                {issue.labels.map((label) => (
                  <span
                    key={label}
                    className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full border"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Issue"
        size="sm"
      >
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertTriangle" size={32} className="text-red-600" />
          </div>
          
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Delete Issue
          </h3>
          
          <p className="text-slate-600 mb-6">
            Are you sure you want to delete "{issue.title}"? This action cannot be undone.
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              <ApperIcon name="Trash2" size={16} className="mr-2" />
              Delete Issue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default IssueDetailModal;