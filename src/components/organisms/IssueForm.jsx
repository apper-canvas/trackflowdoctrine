import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const IssueForm = ({ issue, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: issue?.title || "",
    description: issue?.description || "",
    status: issue?.status || "open",
    priority: issue?.priority || "medium",
    type: issue?.type || "bug",
    assignee: issue?.assignee || "",
    dueDate: issue?.dueDate ? new Date(issue.dueDate).toISOString().split('T')[0] : "",
    labels: issue?.labels?.join(", ") || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        labels: formData.labels
          .split(",")
          .map(label => label.trim())
          .filter(label => label.length > 0),
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      };

      await onSubmit(submitData);
      toast.success(issue ? "Issue updated successfully" : "Issue created successfully");
    } catch (error) {
      toast.error("Failed to save issue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <FormField
          label="Title"
          required
          error={errors.title}
          className="md:col-span-2"
        >
          <Input
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="Enter issue title..."
            maxLength={100}
          />
        </FormField>

        {/* Description */}
        <FormField
          label="Description"
          required
          error={errors.description}
          className="md:col-span-2"
        >
          <Textarea
            value={formData.description}
            onChange={handleChange("description")}
            placeholder="Describe the issue in detail..."
            rows={4}
          />
        </FormField>

        {/* Status */}
        <FormField label="Status" required>
          <Select value={formData.status} onChange={handleChange("status")}>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="closed">Closed</option>
          </Select>
        </FormField>

        {/* Priority */}
        <FormField label="Priority" required>
          <Select value={formData.priority} onChange={handleChange("priority")}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </Select>
        </FormField>

        {/* Type */}
        <FormField label="Type" required>
          <Select value={formData.type} onChange={handleChange("type")}>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
            <option value="task">Task</option>
          </Select>
        </FormField>

        {/* Assignee */}
        <FormField label="Assignee">
          <Input
            value={formData.assignee}
            onChange={handleChange("assignee")}
            placeholder="Assign to..."
          />
        </FormField>

        {/* Due Date */}
        <FormField label="Due Date">
          <Input
            type="date"
            value={formData.dueDate}
            onChange={handleChange("dueDate")}
          />
        </FormField>

        {/* Labels */}
        <FormField 
          label="Labels"
          className="md:col-span-1"
        >
          <Input
            value={formData.labels}
            onChange={handleChange("labels")}
            placeholder="Enter labels separated by commas..."
          />
          <p className="text-xs text-slate-500 mt-1">
            Separate multiple labels with commas
          </p>
        </FormField>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <>
              <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <ApperIcon name={issue ? "Save" : "Plus"} size={16} className="mr-2" />
              {issue ? "Update Issue" : "Create Issue"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default IssueForm;