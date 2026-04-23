'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CircleAlert } from 'lucide-react';


interface ErrorToastProps {
  message: string | null;
  title?: string | null;
  onClose: () => void;
}

export default function ErrorToast({ message, title, onClose }: ErrorToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <div className="fixed bottom-6 inset-x-0 flex justify-center z-[100] pointer-events-none px-4">
          <motion.div
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 70, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="pointer-events-auto bg-red-50 shadow-2xl border border-red-200 rounded-2xl p-4 flex items-center space-x-4 w-full max-w-[500px]"
          >
            {/* Icône d'alerte */}
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <CircleAlert className="w-6 h-6 text-red-600" />
            </div>

            {/* Message d'erreur */}
            <div className="flex-1">
              <span className="font-bold text-red-800 block text-sm">{title}</span>
              <p className="text-red-600 text-xs leading-relaxed">
                {message}
              </p>
            </div>

            {/* Bouton pour fermer */}
            <button
              onClick={onClose}
              className="text-red-400 hover:text-red-600 transition-colors p-1 cursor-pointer outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}