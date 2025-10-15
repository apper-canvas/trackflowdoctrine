import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import FilterPanel from "@/components/molecules/FilterPanel";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
    type: []
  });
  const [searchQuery, setSearchQuery] = useState("");
const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterToggle = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };
const handleCreateIssue = () => {
    // This will be handled by the page components
    const event = new window.CustomEvent("createIssue");
    window.dispatchEvent(event);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Emit search event for page components to handle
    const event = new window.CustomEvent("searchIssues", { detail: query });
    window.dispatchEvent(event);
  };

const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Emit filter event for page components to handle
    const event = new window.CustomEvent("filterIssues", { detail: newFilters });
    window.dispatchEvent(event);
  };

  return (
<div className="min-h-screen bg-slate-50 flex flex-col">
      <Header
        onCreateIssue={handleCreateIssue}
        onSearch={handleSearch}
        onFilterToggle={handleFilterToggle}
        onSidebarToggle={handleSidebarToggle}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <div className="flex-1 flex overflow-hidden">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            isOpen={isFilterPanelOpen}
            onToggle={handleFilterToggle}
          />
          
<main className="flex-1 overflow-hidden">
            <div className="h-full p-6">
              <Outlet 
                context={{
                  filters,
                  searchQuery
                }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;