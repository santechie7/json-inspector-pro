import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { JSONEditor } from '../components/JSONEditor';
import { fixJson, FixReport } from '../utils/jsonUtils';
import { Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const ValidatorPage: React.FC = () => {
  const { mainJson, setMainJson } = useStore();
  const [report, setReport] = useState<FixReport | null>(null);

  useEffect(() => {
    setReport(fixJson(mainJson));
  }, [mainJson]);

  const handleApplyFix = () => {
    if (report?.fixed) {
      setMainJson(report.fixed);
      toast.success('Successfully auto-fixed JSON!');
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[var(--bg)]">
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--header)] overflow-x-auto no-scrollbar transition-colors">
        <h2 className="text-xl font-semibold flex items-center gap-2 shrink-0 mr-4">
          Validation & Auto-Fix
        </h2>
        <div className="shrink-0 flex items-center">
          {report?.isValid ? (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 size={14} /> Valid JSON
          </span>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider">
            <AlertCircle size={14} /> Invalid JSON
          </span>
        )}
      </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-auto">
        {/* Left: Original Editor */}
        <div className="flex flex-col space-y-3 h-[400px] lg:h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Source Input</h3>
            {report?.error && (
              <span className="text-[10px] text-red-500 font-mono">
                Error at line {report.error.line}, col {report.error.column}
              </span>
            )}
          </div>
          <div className="flex-1 rounded-xl overflow-hidden border border-[var(--border)] shadow-sm">
            <JSONEditor value={mainJson} onChange={(val) => setMainJson(val || '')} />
          </div>
        </div>

        {/* Right: Analysis & Fixes */}
        <div className="flex flex-col space-y-6 overflow-auto">
           {/* Fixes List */}
           <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm shadow-black/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-blue-500" /> Auto-Fix Suggestions
            </h3>
            
            {report?.fixes && report.fixes.length > 0 ? (
              <ul className="space-y-3">
                {report.fixes.map((fix, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                    {fix}
                  </li>
                ))}
              </ul>
            ) : report?.isValid ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <CheckCircle2 size={40} className="mx-auto text-emerald-500 opacity-50" />
                <p>Your JSON is already perfect!</p>
              </div>
            ) : (
              <div className="p-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl text-red-700 dark:text-red-400 space-y-3">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <AlertCircle size={18} /> Error Details
                </div>
                <p className="text-sm font-mono whitespace-pre-wrap">{report?.error?.message}</p>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-70">
                  Critical failure: Manual fix required
                </div>
              </div>
            )}

            {report && report.fixes.length > 0 && (
              <button
                onClick={handleApplyFix}
                className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 group"
              >
                Apply Corrected JSON <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
           </div>

           {/* Quick Stats or Preview */}
           <div className="bg-[var(--header)] rounded-2xl p-6 border border-dashed border-[var(--border)] transition-colors">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Integrity Check</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[var(--card)] rounded-lg shadow-sm border border-[var(--border)] transition-colors">
                  <div className="text-[10px] text-slate-400 mb-1">Format Status</div>
                  <div className={`text-sm font-bold ${report?.isValid ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {report?.isValid ? 'Compliant' : 'Structural Errors'}
                  </div>
                </div>
                <div className="p-3 bg-[var(--card)] rounded-lg shadow-sm border border-[var(--border)] transition-colors text-right">
                   <div className="text-[10px] text-slate-400 mb-1">Input Size</div>
                   <div className="text-sm font-bold text-[var(--fg)]">{(mainJson.length / 1024).toFixed(2)} KB</div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
