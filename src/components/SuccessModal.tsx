import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
};

export default function SuccessModal({ isOpen, onClose, message }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm rounded-[1.75rem] border border-white/14 bg-slate-900/80 p-6 shadow-[0_24px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-white/40 transition-colors hover:text-white sm:right-6 sm:top-6"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6">
              <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-green-500/20 animate-pulse sm:h-20 sm:w-20">
                <CheckCircle2 className="h-9 w-9 text-green-400 sm:h-10 sm:w-10" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-[2rem] font-bold tracking-tight text-white sm:text-3xl">Success!</h3>
                <p className="leading-relaxed text-white/70">
                  {message || "We've received your message. Our team will get back to you shortly."}
                </p>
              </div>

              <button
                onClick={onClose}
                className="liquid-cta w-full py-4 rounded-xl border border-white/14 bg-white/5 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-all"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
