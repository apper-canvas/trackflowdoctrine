import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IssueTable from "@/components/organisms/IssueTable";
import IssueDetailModal from "@/components/organisms/IssueDetailModal";
import IssueForm from "@/components/organisms/IssueForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Modal from "@/components/atoms/Modal";
import { issueService } from "@/services/api/issueService";

const ListView = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
    type: []
  });

  const loadIssues = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await issueService.getAll();
      setIssues(data);
      setFilteredIssues(data);
    } catch (err) {
      setError(err.message || "Failed to load issues");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = async () => {
    try {
      setLoading(true);
      const filtered = await issueService.searchAndFilter(searchQuery, filters);
      setFilteredIssues(filtered);
    } catch (err) {
      setError("Failed to filter issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
    
    // Listen for global events from Layout
    const handleCreateIssue = () => setIsCreateModalOpen(true);
    const handleSearchIssues = (e) => setSearchQuery(e.detail);
    const handleFilterIssues = (e) => setFilters(e.detail);
    
    window.addEventListener("createIssue", handleCreateIssue);
    window.addEventListener("searchIssues", handleSearchIssues);
    window.addEventListener("filterIssues", handleFilterIssues);
    
    return () => {
      window.removeEventListener("createIssue", handleCreateIssue);
      window.removeEventListener("searchIssues", handleSearchIssues);
      window.removeEventListener("filterIssues", handleFilterIssues);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      applyFiltersAndSearch();
    }
  }, [searchQuery, filters]);

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    setIsDetailModalOpen(true);
  };

  const handleCreateIssue = async (issueData) => {
    try {
      const newIssue = await issueService.create(issueData);
      setIssues(prev => [newIssue, ...prev]);
      setIsCreateModalOpen(false);
      await applyFiltersAndSearch();
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateIssue = async (id, updateData) => {
    try {
      const updatedIssue = await issueService.update(id, updateData);
      setIssues(prev => prev.map(issue => 
        issue.Id === id ? updatedIssue : issue
      ));
      setSelectedIssue(updatedIssue);
      await applyFiltersAndSearch();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteIssue = async (id) => {
    try {
      await issueService.delete(id);
      setIssues(prev => prev.filter(issue => issue.Id !== id));
      setIsDetailModalOpen(false);
      await applyFiltersAndSearch();
    } catch (error) {
      throw error;
    }
  };

  const handleDuplicateIssue = async (issue) => {
    try {
      const duplicatedIssue = await issueService.duplicate(issue);
      setIssues(prev => [duplicatedIssue, ...prev]);
      setIsDetailModalOpen(false);
      await applyFiltersAndSearch();
    } catch (error) {
      throw error;
    }
  };

  if (loading && issues.length === 0) {
    return <Loading type="list" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadIssues} />;
  }

  if (filteredIssues.length === 0 && searchQuery === "" && 
      Object.values(filters).every(arr => arr.length === 0)) {
    return (
      <Empty
        title="No issues yet"
        description="Get started by creating your first issue to track bugs, features, and tasks."
        actionText="Create First Issue"
        onAction={() => setIsCreateModalOpen(true)}
        icon="Bug"
      />
    );
  }

  if (filteredIssues.length === 0) {
    return (
      <Empty
        title="No matching issues"
        description="Try adjusting your search terms or filters to find what you're looking for."
        actionText="Clear Filters"
        onAction={() => {
          setSearchQuery("");
          setFilters({ status: [], priority: [], type: [] });
        }}
        icon="Search"
      />
    );
  }

  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex-1 overflow-hidden">
        <IssueTable
          issues={filteredIssues}
          onIssueClick={handleIssueClick}
          onStatusChange={() => {}} // Not used in table view
          onDelete={handleDeleteIssue}
        />
      </div>

      {/* Issue Detail Modal */}
      <IssueDetailModal
        issue={selectedIssue}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedIssue(null);
        }}
        onUpdate={handleUpdateIssue}
        onDelete={handleDeleteIssue}
        onDuplicate={handleDuplicateIssue}
      />

      {/* Create Issue Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Issue"
        size="xl"
      >
        <IssueForm
          onSubmit={handleCreateIssue}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </motion.div>
  );
};

export default ListView;