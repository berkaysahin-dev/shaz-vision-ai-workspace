import React from 'react';
import { ArrowRight, Play, Wand2, Mic } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';

export const BottomCommandBar: React.FC = () => {
  const { voiceState, globalPrompt, setGlobalPrompt, executeGlobalPrompt, t } = useWorkspace();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalPrompt.trim()) return;
    executeGlobalPrompt(globalPrompt.trim());
  };

  const handlePlayAgain = () => {
    sound.playSuccess();
    executeGlobalPrompt('refresh the landing page, spread it across the crew');
  };

  return (
    <footer className="h-24 bg-[#0F121C] border-t border-[#1F263A] p-2.5 px-4 flex flex-col justify-between shrink-0 select-none z-40">
      {/* Telemetry Status Line */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300">
            <Mic className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] font-bold tracking-wider">
              {t.agentX}
            </span>
            <div className="flex items-center gap-0.5 ml-1">
              <span className="w-0.5 h-2 bg-purple-400 animate-pulse" />
              <span className="w-0.5 h-3 bg-purple-300 animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-purple-400 animate-pulse delay-150" />
            </div>
          </div>

          <span className="text-slate-400 text-[11px] font-normal truncate">
            {t.lastAction}: <span className="text-cyan-300">{voiceState.lastAction}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.agentsSynchronized}</span>
        </div>
      </div>

      {/* Global Prompt Input Box */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 bg-[#06080F] border border-[#232B40] focus-within:border-purple-500/80 rounded-xl px-3 py-1.5 flex items-center gap-2 transition-all shadow-inner">
          <input
            type="text"
            value={globalPrompt}
            onChange={(e) => setGlobalPrompt(e.target.value)}
            placeholder={t.globalPromptPlaceholder}
            className="flex-1 bg-transparent text-xs font-mono text-slate-100 placeholder-slate-600 outline-none"
          />
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setGlobalPrompt('build OAuth authentication with google and github, run vitest regression pack');
            }}
            title="Auto-fill prompt suggestion"
            className="p-1 text-slate-500 hover:text-purple-400 transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-transform active:scale-95 shadow-md"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Subtext Controls */}
      <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span>{t.scenarioStopped}</span>
          <span>|</span>
          <button
            onClick={handlePlayAgain}
            className="text-slate-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-bold"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>{t.playAgain}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <span>{t.appTitle} v0.3.0 {t.beta}</span>
        </div>
      </div>
    </footer>
  );
};
