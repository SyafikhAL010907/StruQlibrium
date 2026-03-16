"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5" />
    );
  }

  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full w-12 h-12 p-0 glass hover:bg-white/10 transition-colors relative overflow-hidden group"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === "dark" ? 0 : 90,
          scale: theme === "dark" ? 1 : 0
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-6 w-6 text-violet-400" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === "dark" ? -90 : 0,
          scale: theme === "dark" ? 0 : 1
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-6 w-6 text-yellow-500" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
