import React from 'react';
import { useStore } from '../store/useStore';
import { Settings, Info, Cpu, ShieldCheck, Sun, Moon } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { indentSize, setIndentSize, theme, toggleTheme } = useStore();

  return (
    <div className="flex flex-col h-full overflow-auto bg-[var(--bg)] p-4 sm:p-8">
      <div className="max-w-3xl space-y-8 mx-auto w-full">
        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3 text-[var(--fg)]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center">
              <Settings size={20} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            Settings
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-[#8b949e]">Configure your workspace preferences and appearance.</p>
        </header>

        {/* Section: Editor */}
        <section className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm transition-colors">
          <div className="p-4 sm:p-6 border-b border-[var(--border)] bg-slate-50/50 dark:bg-[#161b22]/50">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-[#8b949e] flex items-center gap-2">
              <Cpu size={14} /> EDITOR PREFERENCES
            </h3>
          </div>
          
          <div className="p-4 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-200 mb-1">Indent Size</div>
                <div className="text-xs text-slate-500 dark:text-[#8b949e]">
                  Number of spaces used for indentation.
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-100 dark:bg-[#21262d] p-1 rounded-lg border border-[var(--border)] self-start sm:self-center">
                {[2, 4, 8].map((size) => (
                  <button
                    key={size}
                    onClick={() => setIndentSize(size)}
                    className={`px-3 sm:px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                      indentSize === size
                        ? 'bg-white dark:bg-[#388bfd] text-blue-600 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-0'
                        : 'text-slate-500 dark:text-[#8b949e] hover:text-[var(--fg)]'
                    }`}
                  >
                    {size} <span className="hidden xs:inline">Spaces</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-[var(--border)]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-200 mb-1">Appearance Mode</div>
                <div className="text-xs text-slate-500 dark:text-[#8b949e]">
                  Switch between dark and light themes.
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-100 dark:bg-[#21262d] text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all border border-[var(--border)] shadow-sm w-full sm:w-auto"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={16} className="text-amber-500" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={16} className="text-blue-500" /> Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Section: About */}
        <section className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm transition-colors">
          <div className="p-6 border-b border-[var(--border)] bg-slate-50/50 dark:bg-[#161b22]/50">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-[#8b949e] flex items-center gap-2">
              <Info size={14} /> ABOUT JSON INSPECTOR PRO
            </h3>
          </div>
          
          <div className="p-8">
            <div className="flex items-start gap-4 p-5 bg-blue-50/50 dark:bg-blue-500/5 rounded-2xl border border-blue-100 dark:border-blue-500/10 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-200">Security First</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  All processing happens locally in your browser. We never send your JSON data to any server.
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-[#161b22] border border-dashed border-[var(--border)] rounded-xl font-mono text-[10px] text-slate-400 dark:text-[#8b949e]">
              <div className="flex justify-between items-center">
                <span>BUILD VERSION: 1.0.4-PRODUCTION</span>
                <span>STATUS: READY</span>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center py-4">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
            Built with <span className="text-red-500">♥</span> for developers
          </p>
        </div>
      </div>
    </div>
  );
};
