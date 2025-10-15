import { motion } from "framer-motion";

const Loading = ({ type = "board" }) => {
  if (type === "board") {
    return (
      <div className="flex gap-6 h-full">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="flex-1 space-y-4">
            {/* Column header skeleton */}
            <div className="bg-white rounded-lg p-4 border">
              <motion.div 
                className="h-6 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded animate-pulse"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            {/* Issue cards skeleton */}
            {[...Array(3)].map((_, cardIndex) => (
              <div key={cardIndex} className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <motion.div 
                    className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded flex-1 mr-3"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: cardIndex * 0.2 }}
                  />
                  <motion.div 
                    className="h-6 w-16 bg-gradient-to-r from-primary-200 via-primary-100 to-primary-200 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: cardIndex * 0.2 }}
                  />
                </div>
                <motion.div 
                  className="h-3 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded mb-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: cardIndex * 0.2 }}
                />
                <motion.div 
                  className="h-3 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded w-3/4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: cardIndex * 0.2 }}
                />
                <div className="flex justify-between items-center mt-3">
                  <motion.div 
                    className="h-4 w-12 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: cardIndex * 0.2 }}
                  />
                  <motion.div 
                    className="h-6 w-6 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: cardIndex * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Table header skeleton */}
        <div className="px-6 py-4 bg-slate-50 border-b">
          <div className="flex gap-4">
            {[...Array(6)].map((_, index) => (
              <motion.div 
                key={index}
                className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded flex-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
              />
            ))}
          </div>
        </div>
        
        {/* Table rows skeleton */}
        {[...Array(8)].map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4 border-b last:border-b-0 hover:bg-slate-50">
            <div className="flex gap-4 items-center">
              {[...Array(6)].map((_, cellIndex) => (
                <motion.div 
                  key={cellIndex}
                  className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded flex-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: rowIndex * 0.1 + cellIndex * 0.05 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div 
        className="h-8 w-8 border-4 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loading;