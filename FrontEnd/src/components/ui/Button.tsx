"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 inner-shadow",
      secondary: "bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 inner-shadow",
      outline: "border border-slate-200 dark:border-white/10 glass hover:bg-white/10 dark:text-slate-50",
      ghost: "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400",
      danger: "bg-red-500 text-white shadow-lg shadow-red-500/20 inner-shadow",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base font-bold",
      lg: "px-10 py-5 text-lg font-black tracking-tight",
    };

    // Filter out props that might conflict with Framer Motion or are already handled
    const { onAnimationStart: _, onDragStart: __, onDragEnd: ___, onDrag: ____, ...restProps } = props;

    return (
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-outfit uppercase transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...restProps as any}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
