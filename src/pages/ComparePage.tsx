import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { JSONEditor } from '../components/JSONEditor';
import { Columns, SplitSquareVertical, ArrowRightLeft, Settings2 } from 'lucide-react';
import ReactDiffViewer from 'react-diff-viewer-continued';

export const ComparePage: React.FC = () => {
  const { leftJson, setLeftJson, rightJson, setRightJson, theme } = useStore();
  const [showDiff, setShowDiff] = useState(false);
  const [useSplitView, setUseSplitView] = useState(true);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[var(--bg)] transition-colors">
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--header)] overflow-x-auto no-scrollbar transition-colors">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-[var(--fg)] shrink-0 mr-4">
          Compare
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex p-1 bg-slate-200 dark:bg-[#21262d] rounded-lg mr-2 border border-[var(--border)] transition-colors">
            <button
              onClick={() => setShowDiff(false)}
              className={ `p-1.5 rounded-md flex items-center gap-2 text-xs font-medium transition-all ${
                !showDiff ? 'bg-white dark:bg-[#30363d] text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-[var(--fg)]'
              }`}
            >
              <Columns size={14} /> Editors
            </button>
            <button
              onClick={() => setShowDiff(true)}
              className={`p-1.5 rounded-md flex items-center gap-2 text-xs font-medium transition-all ${
                showDiff ? 'bg-white dark:bg-[#30363d] text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-[var(--fg)]'
              }`}
            >
              <ArrowRightLeft size={14} /> Diff
            </button>
          </div>
          
          {showDiff && (
            <button 
              onClick={() => setUseSplitView(!useSplitView)}
              className="p-2 hover:bg-slate-200 dark:hover:bg-[#21262d] rounded-lg transition-all text-slate-500 hover:text-[var(--fg)]"
              title={useSplitView ? "Unified View" : "Split View"}
            >
              <SplitSquareVertical size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative flex flex-col">
        {showDiff && (
          <div className="px-4 py-2 bg-[var(--header)] border-b border-[var(--border)] flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800"></div>
              <span>Added</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800"></div>
              <span>Removed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800"></div>
              <span>Modified</span>
            </div>
            <div className="ml-auto opacity-50">
              Comparing Original A → Original B
            </div>
          </div>
        )}
        <div className="flex-1 overflow-hidden relative">
          {!showDiff ? (
            <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-px bg-[var(--border)] transition-colors">
            <div className="bg-[var(--bg)] flex flex-col p-4 relative h-[50vh] md:h-full transition-colors">
              <span className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 z-10 bg-[var(--header)] border border-[var(--border)] px-2 py-0.5 rounded transition-colors">ORIGINAL A</span>
              <JSONEditor value={leftJson} onChange={(val) => setLeftJson(val || '')} />
            </div>
            <div className="bg-[var(--bg)] flex flex-col p-4 relative h-[50vh] md:h-full transition-colors border-t md:border-t-0 md:border-l border-[var(--border)]">
              <span className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 z-10 bg-[var(--header)] border border-[var(--border)] px-2 py-0.5 rounded transition-colors">ORIGINAL B</span>
              <JSONEditor value={rightJson} onChange={(val) => setRightJson(val || '')} />
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto bg-[var(--bg)] transition-colors">
            <ReactDiffViewer 
              oldValue={leftJson} 
              newValue={rightJson} 
              splitView={useSplitView}
              useDarkTheme={theme === 'dark'}
              styles={{
                variables: {
                  dark: {
                    diffViewerBackground: 'var(--bg)',
                    diffViewerColor: 'var(--fg)',
                    addedBackground: 'rgba(46, 160, 67, 0.15)',
                    addedColor: '#7ee787',
                    removedBackground: 'rgba(248, 81, 73, 0.15)',
                    removedColor: '#ffa198',
                    wordAddedBackground: 'rgba(63, 185, 80, 0.3)',
                    wordRemovedBackground: 'rgba(248, 81, 73, 0.3)',
                    gutterBackground: 'var(--bg)',
                    gutterColor: '#484f58',
                    codeFoldBackground: 'var(--header)',
                    codeFoldContentColor: '#8b949e',
                    emptyLineBackground: 'transparent',
                    lineNumberColor: '#484f58',
                  },
                  light: {
                    diffViewerBackground: 'var(--bg)',
                    diffViewerColor: 'var(--fg)',
                    addedBackground: '#dafbe1',
                    addedColor: '#1a7f37',
                    removedBackground: '#ffebe9',
                    removedColor: '#cf222e',
                    wordAddedBackground: '#acf2bd',
                    wordRemovedBackground: '#fdb8c0',
                    gutterBackground: 'var(--bg)',
                    gutterColor: '#94a3b8',
                    codeFoldBackground: '#f8fafc',
                    codeFoldContentColor: '#64748b',
                  }
                },
                contentText: {
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: '13px',
                  lineHeight: '1.6',
                },
                gutter: {
                  padding: '0 12px',
                  minWidth: '50px',
                  borderRight: '1px solid var(--border)',
                },
                line: {
                  padding: '0 10px',
                }
              }}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
