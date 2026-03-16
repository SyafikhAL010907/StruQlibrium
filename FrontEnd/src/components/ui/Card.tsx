import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "blueprint";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      style={{ background: 'var(--card-bg)' }}
      className={cn(
        "backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-4xl p-8 transition-all premium-shadow inner-shadow",
        variant === "blueprint" && "bg-linear-to-br from-violet-500/10 to-blue-500/10",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
