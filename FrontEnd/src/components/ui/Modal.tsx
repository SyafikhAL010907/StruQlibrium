"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-5xl border border-white/20 w-full max-w-lg shadow-2xl shadow-violet-500/10 overflow-hidden"
            >
              <div className="p-8 pb-0 flex justify-between items-center">
                <h2 className="font-outfit text-2xl font-black tracking-tight">{title}</h2>
                <button 
                  onClick={onClose} 
                  className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full hover:rotate-90 transition-transform duration-300"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="p-8">
                {children}
              </div>
              {footer && (
                <div className="px-8 pb-8 flex justify-end gap-3">
                  {footer}
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
