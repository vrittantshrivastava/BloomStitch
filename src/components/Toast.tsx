import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 bg-primary text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-4">
      <span className="material-symbols-outlined text-[#ffd9dd] text-[20px]">
        check_circle
      </span>
      <span className="font-sans text-sm font-medium tracking-wide">
        {message}
      </span>
    </div>
  );
};
