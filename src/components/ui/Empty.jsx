import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No issues found",
  description = "Get started by creating your first issue",
  actionText = "Create Issue",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div 
        className="mb-6 p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-full shadow-lg"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <ApperIcon 
          name={icon} 
          size={64} 
          className="text-slate-400" 
        />
      </motion.div>
      
      <motion.h3 
        className="text-2xl font-bold text-slate-900 mb-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-slate-600 mb-8 max-w-md text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {description}
      </motion.p>
      
      {onAction && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <Button 
            onClick={onAction}
            size="lg"
            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
          >
            <ApperIcon name="Plus" size={20} className="mr-3" />
            {actionText}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;