import React, { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { generateSchema, SchemaNode } from '../utils/jsonUtils';
import { FileCode, Download, ShieldCheck, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const SchemaRow: React.FC<{ node: SchemaNode; depth?: number }> = ({ node, depth = 0 }) => {
  return (
    <>
      <tr className="border-b border-[var(--border)] hover:bg-slate-200 dark:hover:bg-[#21262d] transition-colors">
        <td className="py-3 px-4">
          <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 20}px` }}>
            <span className="text-slate-400 font-mono text-xs">{"•".repeat(depth)}</span>
            <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">{node.name}</span>
          </div>
        </td>
        <td className="py-3 px-4">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-200 dark:bg-[#21262d] text-slate-600 dark:text-slate-400 transition-colors">
            {node.type}
          </span>
        </td>
        <td className="py-3 px-4">
          <span className={`text-[10px] font-bold ${node.nullable ? 'text-amber-500' : 'text-emerald-500'}`}>
            {node.nullable ? 'YES' : 'NO'}
          </span>
        </td>
        <td className="py-3 px-4 text-center">
          <ShieldCheck size={14} className="mx-auto text-emerald-500 opacity-50" />
        </td>
      </tr>
      {node.children && node.children.map((child, i) => (
        <SchemaRow key={`${node.name}-${i}`} node={child} depth={depth + 1} />
      ))}
    </>
  );
};

export const SchemaPage: React.FC = () => {
  const { mainJson } = useStore();

  const schema = useMemo(() => {
    try {
      const parsed = JSON.parse(mainJson);
      return generateSchema(parsed);
    } catch (e) {
      return null;
    }
  }, [mainJson]);

  const handleExportSchema = () => {
    if (!schema) return;
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Schema exported');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--header)] overflow-x-auto no-scrollbar transition-colors">
        <h2 className="text-xl font-semibold flex items-center gap-2 shrink-0 mr-4">
          Schema Insights
        </h2>
        {schema && (
          <button 
            onClick={handleExportSchema}
            className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-900 dark:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all hover:bg-slate-800 dark:hover:bg-blue-700 shadow-sm"
          >
            <Download size={14} /> Export Schema
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[var(--bg)] transition-colors">
        {schema ? (
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm overflow-x-auto transition-colors">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/50 border-b border-[var(--border)]">
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Field Name</th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Type</th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Nullable</th>
                  <th className="py-3 px-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Required</th>
                </tr>
              </thead>
              <tbody>
                <SchemaRow node={schema} />
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
             <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-full text-amber-500">
                <AlertTriangle size={48} />
             </div>
             <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Cannot generate schema</p>
             <p className="text-sm">Please ensure your main JSON input is valid on the Viewer page.</p>
          </div>
        )}
      </div>
    </div>
  );
};
