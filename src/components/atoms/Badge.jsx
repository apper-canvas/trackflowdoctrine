import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const badgeVariants = {
  critical: "bg-gradient-to-r from-critical-500 to-critical-600 text-white shadow-lg",
  high: "bg-gradient-to-r from-high-500 to-high-600 text-white shadow-lg",
  medium: "bg-gradient-to-r from-medium-500 to-medium-600 text-white shadow-lg",
  low: "bg-gradient-to-r from-low-500 to-low-600 text-white shadow-lg",
  open: "bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-sm",
  "in-progress": "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm",
  review: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm",
  closed: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm",
  bug: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300",
  feature: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300",
  task: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300",
  default: "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border border-slate-300",
};

const Badge = forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 hover:scale-105",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;