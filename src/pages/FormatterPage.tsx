import React from 'react';
import { useStore } from '../store/useStore';
import { JSONEditor } from '../components/JSONEditor';
import { formatJson, minifyJson, jsonToYaml, yamlToJson } from '../utils/jsonUtils';
import { AlignLeft, Minimize2, Copy, Trash2, Wand2, FileText, FileCode2 } from 'lucide-react';
import { toast } from 'sonner';

export const FormatterPage: React.FC = () => {
  const { mainJson, setMainJson, indentSize } = useStore();

  const handlePrettify = () => {
    try {
      const fixed = formatJson(mainJson, indentSize);
      setMainJson(fixed);
      toast.success('JSON Prettified');
    } catch (e) {
      toast.error('Could not format invalid JSON');
    }
  };

  const handleMinify = () => {
    try {
      const minified = minifyJson(mainJson);
      setMainJson(minified);
      toast.success('JSON Minified');
    } catch (e) {
      toast.error('Could not minify invalid JSON');
    }
  };

  const handleToYaml = () => {
    const yamlStr = jsonToYaml(mainJson);
    if (yamlStr.startsWith('Invalid')) {
      toast.error(yamlStr);
    } else {
      setMainJson(yamlStr);
      toast.success('Converted to YAML');
    }
  };

  const handleToJson = () => {
    const jsonStr = yamlToJson(mainJson);
    if (jsonStr.startsWith('Invalid')) {
      toast.error(jsonStr);
    } else {
      setMainJson(jsonStr);
      toast.success('Converted to JSON');
    }
  };

  const handleClear = () => {
    setMainJson('');
    toast('Editor cleared');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mainJson);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--header)] overflow-x-auto no-scrollbar">
        <h2 className="text-xl font-semibold flex items-center gap-2 shrink-0 mr-4">
          Formatter
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={handlePrettify}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold transition-all hover:bg-blue-700"
          >
            <AlignLeft size={14} /> Prettify
          </button>
          <button 
            onClick={handleMinify}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-[#21262d] text-slate-700 dark:text-slate-200 border border-[var(--border)] rounded-lg text-xs font-bold transition-all hover:bg-slate-300 dark:hover:bg-[#30363d]"
          >
            <Minimize2 size={14} /> Minify
          </button>
          <div className="w-px h-4 bg-[var(--border)] mx-1" />
          <button 
            onClick={handleToYaml}
            className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border)] rounded-lg text-xs font-bold transition-all text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#21262d]"
          >
            <FileText size={14} /> to YAML
          </button>
          <button 
            onClick={handleToJson}
            className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border)] rounded-lg text-xs font-bold transition-all text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#21262d]"
          >
            <FileCode2 size={14} /> to JSON
          </button>
          <div className="w-px h-4 bg-[var(--border)] mx-1" />
          <button onClick={handleCopy} className="p-2 hover:bg-slate-200 dark:hover:bg-[#21262d] rounded-lg transition-all text-slate-500 hover:text-[var(--fg)]" title="Copy">
            <Copy size={18} />
          </button>
          <button onClick={handleClear} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-all" title="Clear">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col space-y-4 bg-[var(--bg)] transition-colors">
        <div className="flex-1 rounded-2xl overflow-hidden border border-[var(--border)] shadow-inner bg-[var(--card)]">
          <JSONEditor value={mainJson} onChange={(val) => setMainJson(val || '')} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl">
             <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
               <Wand2 size={14} /> Power Format
             </div>
             <p className="text-[10px] text-blue-500/70 leading-relaxed">
               Format and standardize your JSON instantly using professional-grade pretty printing.
             </p>
          </div>
          <div className="p-4 bg-[var(--header)] border border-[var(--border)] rounded-xl col-span-2 flex items-center justify-between">
             <div>
               <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Editor Info</div>
               <div className="text-sm font-mono text-slate-600 dark:text-slate-400">
                 Lines: {mainJson.split('\n').length} | Characters: {mainJson.length}
               </div>
             </div>
             <div className="text-right">
               <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Mode</div>
               <div className="text-sm font-bold text-blue-500">Auto-Detect</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
