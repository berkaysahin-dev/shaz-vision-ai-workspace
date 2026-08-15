import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  Send,
  FileCode,
  Zap,
  DollarSign,
  Activity,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';

export const AgentInspectorModal: React.FC = () => {
  const {
    agents,
    selectedAgentId,
    setSelectedAgentId,
    isInspectorOpen,
    setIsInspectorOpen,
    pauseAgent,
    sendMessageToAgent,
    setCenterTab,
    terminalPanes,
    t,
  } = useWorkspace();

  const [directMsg, setDirectMsg] = useState('');

  if (!isInspectorOpen || !selectedAgentId) return null;

  const agent = agents[selectedAgentId];
  if (!agent) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directMsg.trim()) return;
    sendMessageToAgent(agent.id, directMsg.trim());
    setDirectMsg('');
  };

  const handleInspectFile = (filePath: string) => {
    sound.playClick();
    setCenterTab('code');
    setIsInspectorOpen(false);
  };

  const agentTerminal = terminalPanes.find((p) => p.agentId === agent.id) || terminalPanes[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-end font-mono select-none"
      onClick={() => setIsInspectorOpen(false)}
    >
      <div
        className="w-full max-w-md bg-[#0F121C] border-l border-[#242D44] shadow-2xl h-full flex flex-col justify-between p-4 overflow-y-auto animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#1F273D]">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-md"
                style={{ backgroundColor: `${agent.color}25`, border: `1px solid ${agent.color}80`, color: agent.color }}
              >
                {agent.avatarTag}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-100">{agent.name}</span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                      agent.isPaused
                        ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    {agent.isPaused ? 'PAUSED' : agent.state}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">{agent.role} · {agent.department}</div>
              </div>
            </div>

            <button
              onClick={() => setIsInspectorOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-[#1E263C]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-3.5 mt-3.5">
            {/* Active Mission & AI Model */}
            <div className="p-3 rounded-xl bg-[#090B12] border border-[#1C2336] space-y-2 shadow-inner">
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span className="font-bold text-purple-400 uppercase tracking-wider">{t.activeMission}</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 font-bold">
                  {agent.model}
                </span>
              </div>

              <div className="text-xs font-bold text-slate-100 leading-snug">
                {agent.currentTask}
              </div>

              <div className="text-[11px] text-cyan-400 font-mono flex items-center gap-1.5 pt-1 border-t border-[#181E2E]">
                <Activity className="w-3.5 h-3.5 animate-pulse shrink-0" />
                <span className="truncate">{agent.currentAction}</span>
              </div>
            </div>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-[#090B12] border border-[#1A2133] text-center">
                <div className="text-[9px] text-slate-500 uppercase">{t.usedTokens}</div>
                <div className="text-xs font-bold text-cyan-300 mt-0.5">
                  {(agent.tokens / 1000).toFixed(1)}k tokens
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#090B12] border border-[#1A2133] text-center">
                <div className="text-[9px] text-slate-500 uppercase">{t.cost}</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5">
                  ${agent.cost.toFixed(2)}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#090B12] border border-[#1A2133] text-center">
                <div className="text-[9px] text-slate-500 uppercase">{t.runtime}</div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">
                  {agent.executionTime}
                </div>
              </div>
            </div>

            {/* Accessed / Modified Files */}
            <div className="space-y-1.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                {t.filesAccessed}
              </div>
              <div className="space-y-1">
                {agent.files.map((file, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleInspectFile(file)}
                    className="p-2 rounded-lg bg-[#090B12] hover:bg-[#141A28] border border-[#1A2133] hover:border-cyan-500/40 text-xs text-slate-300 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate text-[11px]">{file}</span>
                    </div>
                    <span className="text-[9px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.inspect} →
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Agent Terminal Stream */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                <span>{t.liveCli}</span>
                <span className="text-[9px] text-emerald-400">● {t.streaming}</span>
              </div>

              <div className="p-2.5 bg-[#06080F] border border-[#1A2030] rounded-xl text-[10px] text-slate-300 font-mono space-y-1 max-h-32 overflow-y-auto scanline-effect">
                {agentTerminal.lines.slice(-4).map((line, idx) => (
                  <div key={idx} className="truncate text-slate-400">
                    {line}
                  </div>
                ))}
                <div className="text-cyan-400 font-bold animate-pulse">
                  ▸ {agent.currentAction}...
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions: Direct Message + Pause/Resume Agent */}
        <div className="p-3 border-t border-[#1F273D] bg-[#0A0D15] rounded-xl space-y-2 mt-4">
          <form onSubmit={handleSendMessage} className="flex gap-1.5">
            <input
              type="text"
              value={directMsg}
              onChange={(e) => setDirectMsg(e.target.value)}
              placeholder={t.messagePlaceholder}
              className="flex-1 px-3 py-1.5 bg-[#121622] border border-[#232C42] rounded-lg text-xs text-slate-200 outline-none placeholder-slate-600 font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <button
            onClick={() => pauseAgent(agent.id)}
            className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              agent.isPaused
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-[#181E2E] hover:bg-[#232B40] text-slate-200 border border-[#2B354F]'
            }`}
          >
            {agent.isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            <span>{agent.isPaused ? t.resumeAgent : t.pauseAgent}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
