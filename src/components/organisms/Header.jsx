import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

function Header({ onCreateIssue, onSearch, onFilterToggle, onSidebarToggle }) {
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm"
    >
      <div className="px-6 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onSidebarToggle}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <ApperIcon name="Menu" size={24} className="text-slate-700" />
          </button>
          
          <SearchBar
            onSearch={onSearch}
            placeholder="Search issues..."
            className="w-full md:w-96"
          />
</div>

<div className="flex items-center gap-3">
          <Button
            onClick={onFilterToggle}
            variant="ghost"
            className="hidden md:flex"
          >
            <ApperIcon name="Filter" size={18} />
            <span>Filters</span>
          </Button>

            {/* Create Issue Button */}
            <Button onClick={onCreateIssue} className="shadow-lg">
              <ApperIcon name="Plus" size={16} className="mr-2" />
              <span className="hidden sm:inline">Create Issue</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              <ApperIcon name="Menu" size={16} />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <SearchBar
            placeholder="Search issues..."
            onSearch={onSearch}
          />
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pt-4 border-t border-slate-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200
                    ${isActive(item.path)
                      ? "bg-primary-100 text-primary-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }
                  `}
                >
                  <ApperIcon name={item.icon} size={16} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;