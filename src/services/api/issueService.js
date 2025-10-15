import issuesData from "@/services/mockData/issues.json";

let issues = [...issuesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const issueService = {
  async getAll() {
    await delay(300);
    return [...issues];
  },

  async getById(id) {
    await delay(200);
    const issue = issues.find(issue => issue.Id === parseInt(id));
    if (!issue) {
      throw new Error(`Issue with ID ${id} not found`);
    }
    return { ...issue };
  },

async create(issueData) {
    await delay(400);
    
    const maxId = Math.max(...issues.map(issue => issue.Id));
    const newId = maxId + 1;
    const issueCount = issues.length + 1;
    
    const newIssue = {
      Id: newId,
      id: `TRACK-${String(issueCount).padStart(3, '0')}`,
      title: issueData.title,
      description: issueData.description,
      status: issueData.status || "open",
      priority: issueData.priority || "medium",
      type: issueData.type || "bug",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignee: issueData.assignee || null,
      dueDate: issueData.dueDate || null,
      labels: issueData.labels || [],
      activities: []
    };

    issues.push(newIssue);
    return { ...newIssue };
  },

  async update(id, updateData) {
    await delay(350);
    
    const index = issues.findIndex(issue => issue.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Issue with ID ${id} not found`);
    }

const updatedIssue = {
      ...issues[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    if (updateData.newActivity) {
      const maxActivityId = updatedIssue.activities && updatedIssue.activities.length > 0
        ? Math.max(...updatedIssue.activities.map(a => a.Id))
        : 0;
      const newActivity = {
        ...updateData.newActivity,
        Id: maxActivityId + 1,
        timestamp: new Date().toISOString()
      };
      updatedIssue.activities = [...(updatedIssue.activities || []), newActivity];
      delete updatedIssue.newActivity;
    }

    issues[index] = updatedIssue;
    return { ...updatedIssue };
  },

  async delete(id) {
    await delay(250);
    
    const index = issues.findIndex(issue => issue.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Issue with ID ${id} not found`);
    }

    const deletedIssue = issues[index];
    issues.splice(index, 1);
    return { ...deletedIssue };
  },

  async updateStatus(id, status) {
    return this.update(id, { status });
  },

  async duplicate(originalIssue) {
    const duplicateData = {
      title: `${originalIssue.title} (Copy)`,
      description: originalIssue.description,
      priority: originalIssue.priority,
      type: originalIssue.type,
      assignee: originalIssue.assignee,
      dueDate: originalIssue.dueDate,
      labels: [...(originalIssue.labels || [])]
    };

    return this.create(duplicateData);
  },

  async search(query) {
    await delay(200);
    
    if (!query || query.trim() === "") {
      return this.getAll();
    }

    const searchTerm = query.toLowerCase().trim();
    const filtered = issues.filter(issue => 
      issue.title.toLowerCase().includes(searchTerm) ||
      issue.description.toLowerCase().includes(searchTerm) ||
      issue.id.toLowerCase().includes(searchTerm) ||
      (issue.assignee && issue.assignee.toLowerCase().includes(searchTerm)) ||
      (issue.labels && issue.labels.some(label => 
        label.toLowerCase().includes(searchTerm)
      ))
    );

    return [...filtered];
  },

  async filter(filters) {
    await delay(200);
    
    let filtered = [...issues];

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(issue => 
        filters.status.includes(issue.status)
      );
    }

    if (filters.priority && filters.priority.length > 0) {
      filtered = filtered.filter(issue => 
        filters.priority.includes(issue.priority)
      );
    }

    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter(issue => 
        filters.type.includes(issue.type)
      );
    }

    return filtered;
  },

  async searchAndFilter(query, filters) {
    await delay(250);
    
    let result = [...issues];

    // Apply search first
    if (query && query.trim() !== "") {
      const searchTerm = query.toLowerCase().trim();
      result = result.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm) ||
        issue.description.toLowerCase().includes(searchTerm) ||
        issue.id.toLowerCase().includes(searchTerm) ||
        (issue.assignee && issue.assignee.toLowerCase().includes(searchTerm)) ||
        (issue.labels && issue.labels.some(label => 
          label.toLowerCase().includes(searchTerm)
        ))
      );
    }

    // Apply filters
    if (filters.status && filters.status.length > 0) {
      result = result.filter(issue => 
        filters.status.includes(issue.status)
      );
    }

    if (filters.priority && filters.priority.length > 0) {
      result = result.filter(issue => 
        filters.priority.includes(issue.priority)
      );
    }

    if (filters.type && filters.type.length > 0) {
      result = result.filter(issue => 
        filters.type.includes(issue.type)
      );
    }

    return result;
  }
};