import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { useStore } from '../store/useStore';
import { JSONEditor } from '../components/JSONEditor';
import { Copy, Download, Code, ListTree } from 'lucide-react';
import { toast } from 'sonner';

export const ViewerPage: React.FC = () => {
  const { mainJson, setMainJson, theme } = useStore();
  const [viewMode, setViewMode] = useState<'code' | 'tree'>('tree');

  const handleCopy = () => {
    navigator.clipboard.writeText(mainJson);
    toast.success('JSON copied to clipboard');
  };

  const handleDownload = () => {
    const blob = new Blob([mainJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON downloaded');
  };

  let parsedJson = null;
  let parseError = null;
  try {
    parsedJson = JSON.parse(mainJson);
  } catch (e: any) {
    parseError = e.message;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--header)] overflow-x-auto no-scrollbar transition-colors">
        <h2 className="text-xl font-semibold flex items-center gap-2 shrink-0 mr-4">
          Viewer
          {parseError && (
            <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full font-medium">
              Invalid JSON
            </span>
          )}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex p-1 bg-slate-200 dark:bg-[#21262d] rounded-lg mr-4 border border-[var(--border)]">
            <button
              onClick={() => setViewMode('tree')}
              className={`p-1.5 rounded-md flex items-center gap-2 text-xs font-medium transition-all ${
                viewMode === 'tree' ? 'bg-white dark:bg-[#30363d] text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-[var(--fg)]'
              }`}
            >
              <ListTree size={14} /> Tree
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`p-1.5 rounded-md flex items-center gap-2 text-xs font-medium transition-all ${
                viewMode === 'code' ? 'bg-white dark:bg-[#30363d] text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-[var(--fg)]'
              }`}
            >
              <Code size={14} /> Code
            </button>
          </div>
          <button onClick={handleCopy} className="p-2 hover:bg-slate-200 dark:hover:bg-[#21262d] rounded-lg transition-all text-slate-500 hover:text-[var(--fg)]" title="Copy">
            <Copy size={18} />
          </button>
          <button onClick={handleDownload} className="p-2 hover:bg-slate-200 dark:hover:bg-[#21262d] rounded-lg transition-all text-slate-500 hover:text-[var(--fg)]" title="Download">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {viewMode === 'code' ? (
          <JSONEditor value={mainJson} onChange={(val) => setMainJson(val || '')} />
        ) : (
          <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] min-h-full font-mono transition-colors">
            {parsedJson ? (
              <ReactJson 
                src={parsedJson} 
                theme={theme === 'dark' ? 'monokai' : 'bright:inverted'}
                enableClipboard={false}
                displayDataTypes={false}
                iconStyle="square"
                collapsed={2}
                style={{ 
                  backgroundColor: 'transparent',
                  fontSize: '13px'
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 py-20">
                <p className="text-lg">Invalid JSON detected.</p>
                <button
                  onClick={() => setViewMode('code')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-sans font-bold shadow-sm"
                >
                  Switch to Code Mode to fix
                </button>
                <div className="text-red-500 text-sm font-sans mt-4 max-w-md text-center">
                  Error: {parseError}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
