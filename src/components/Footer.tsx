import React from 'react';
import { useStore } from '../store/useStore';

export const Footer: React.FC = () => {
  const { mainJson } = useStore();
  const lineCount = mainJson.split('\n').length;
  const byteSize = new Blob([mainJson]).size;

  return (
    <footer className="h-6 theme-footer flex items-center px-4 justify-between text-[10px] text-slate-500 dark:text-[#8b949e] shrink-0 transition-colors z-20">
      <div className="flex items-center space-x-4 sm:space-x-6">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          <span className="hidden sm:inline">Ready</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Lines: {lineCount}</span>
          <span className="hidden xs:inline">Size: {byteSize >= 1024 ? `${(byteSize / 1024).toFixed(2)} KB` : `${byteSize} B`}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="hidden md:inline">Optimized for large files</span>
        <span className="text-blue-500 font-medium">v1.4.2-stable</span>
      </div>
    </footer>
  );
};
