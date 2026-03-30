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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            className="relative w-full max-w-sm rounded-[2rem] border border-white/14 bg-slate-900/80 p-8 shadow-[0_24px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white tracking-tight">Success!</h3>
                <p className="text-white/70 leading-relaxed">
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
