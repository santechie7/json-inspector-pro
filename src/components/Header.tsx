import React from 'react';
import { useStore, TabType } from '../store/useStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Settings, Moon, Sun } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, theme, toggleTheme } = useStore();

  const menuItems = [
    { id: 'formatter' as TabType, label: 'Formatter' },
    { id: 'viewer' as TabType, label: 'Viewer' },
    { id: 'compare' as TabType, label: 'Compare' },
    { id: 'validator' as TabType, label: 'Validator' },
    { id: 'schema' as TabType, label: 'Schema' },
  ];

  return (
    <header className="h-12 theme-header flex items-center justify-between px-4 shrink-0 transition-colors z-20">
      <div className="flex items-center min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center space-x-2 cursor-pointer shrink-0" onClick={() => setActiveTab('formatter')}>
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">
            {'{ }'}
          </div>
          <span className="font-semibold text-sm tracking-tight text-[var(--fg)] hidden sm:inline">
            JSON Inspector <span className="text-blue-500">Pro</span>
          </span>
        </div>
        <nav className="flex items-center space-x-1 ml-4 sm:ml-6 h-full overflow-x-auto no-scrollbar py-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap",
                activeTab === item.id
                  ? "bg-slate-200 dark:bg-[#21262d] text-blue-600 dark:text-blue-400 border border-[var(--border)] shadow-sm"
                  : "text-slate-600 dark:text-[#8b949e] hover:bg-slate-200 dark:hover:bg-[#21262d] hover:text-[var(--fg)]"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 ml-2 shrink-0">
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:text-[var(--fg)] transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-[#21262d]"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={cn(
            "p-2 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-[#21262d]",
            activeTab === 'settings' ? "text-blue-500" : "text-slate-500 hover:text-[var(--fg)]"
          )}
          title="Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};
