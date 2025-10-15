import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="mb-8"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center shadow-lg">
            <ApperIcon name="AlertCircle" size={48} className="text-slate-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            Page Not Found
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <Link to="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4"
            >
              <ApperIcon name="Home" size={20} className="mr-3" />
              Back to Board
            </Button>
          </Link>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/list">
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-slate-900"
              >
                <ApperIcon name="List" size={16} className="mr-2" />
                List View
              </Button>
            </Link>
            
            <span className="text-slate-400">•</span>
            
            <button
              onClick={() => window.history.back()}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;