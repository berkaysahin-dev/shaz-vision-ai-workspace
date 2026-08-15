import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  Send,
  Terminal,
  FileCode,
  Zap,
  DollarSign,
  Clock,
  CheckCircle2,
  Shield,
  Activity,
  Layers,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';

export const AgentInspectorPanel: React.FC = () => {
  const {
    agents,
    selectedAgentId,
    setSelectedAgentId,
    isInspectorOpen,
    setIsInspectorOpen,
    pauseAgent,
    sendMessageToAgent,
    setCenterTab,
    setMainView,
    setSelectedFileId,
    terminalPanes,
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
    setMainView('code');
  };

  const agentTerminal = terminalPanes.find((p) => p.agentId === agent.id) || terminalPanes[0];

  return (
    <div className="w-[330px] xl:w-[370px] bg-[#0E111B] border-l border-[#1F263A] flex flex-col justify-between shrink-0 font-mono select-none overflow-y-auto animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div>
        <div className="p-3 bg-[#131724] border-b border-[#20273D] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-md"
              style={{ backgroundColor: `${agent.color}25`, border: `1px solid ${agent.color}80`, color: agent.color }}
            >
              {agent.avatarTag}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-100">{agent.name}</span>
                <span
                  className={`text-[8px] px-1.5 py-0.2 rounded font-bold uppercase ${
                    agent.isPaused
                      ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                  }`}
                >
                  {agent.isPaused ? 'PAUSED' : agent.state}
                </span>
              </div>
              <div className="text-[10px] text-slate-400">{agent.role} · {agent.department}</div>
            </div>
          </div>

          <button
            onClick={() => setIsInspectorOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-[#1E253A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3.5 space-y-3.5 overflow-y-auto">
          {/* Current Task Box */}
          <div className="p-3 rounded-xl bg-[#090B12] border border-[#1C2336] space-y-2 shadow-inner">
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span className="font-bold text-purple-400 uppercase">ACTIVE MISSION</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 font-mono">
                {agent.model}
              </span>
            </div>

            <div className="text-xs font-bold text-slate-100 leading-snug">
              {agent.currentTask}
            </div>

            <div className="text-[11px] text-cyan-400 font-mono flex items-center gap-1.5">
              <Activity className="w-3 h-3 animate-pulse" />
              <span className="truncate">{agent.currentAction}</span>
            </div>
          </div>

          {/* Real-time Telemetry Metrics */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-[#090B12] border border-[#1A2133] text-center">
              <div className="text-[9px] text-slate-500 uppercase">TOKENS</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">
                {(agent.tokens / 1000).toFixed(1)}k
              </div>
            </div>
            <div className="p-2 rounded-lg bg-[#090B12] border border-[#1A2133] text-center">
              <div className="text-[9px] text-slate-500 uppercase">COST</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">
                ${agent.cost.toFixed(2)}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-[#090B12] border border-[#1A2133] text-center">
              <div className="text-[9px] text-slate-500 uppercase">RUNTIME</div>
              <div className="text-xs font-bold text-cyan-400 mt-0.5">
                {agent.executionTime}
              </div>
            </div>
          </div>

          {/* Touched Files List */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              WORKSPACE FILES ACCESSED
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
                    Inspect →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Terminal Stream */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
              <span>LIVE AGENT CLI</span>
              <button
                onClick={() => {
                  sound.playClick();
                  setCenterTab('terminal');
                  setMainView('terminals');
                }}
                className="text-cyan-400 hover:text-cyan-300 font-normal"
              >
                Expand Terminal →
              </button>
            </div>

            <div className="p-2 bg-[#06080F] border border-[#1A2030] rounded-lg text-[10px] text-slate-300 font-mono space-y-1 max-h-28 overflow-y-auto scanline-effect">
              {agentTerminal.lines.slice(-4).map((line, idx) => (
                <div key={idx} className="truncate text-slate-400">
                  {line}
                </div>
              ))}
              <div className="text-cyan-400 font-bold animate-pulse">
                ▸ executing step for {agent.name}...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls & Direct Message */}
      <div className="p-3 border-t border-[#1F263A] bg-[#0A0D15] space-y-2">
        <form onSubmit={handleSendMessage} className="flex gap-1.5">
          <input
            type="text"
            value={directMsg}
            onChange={(e) => setDirectMsg(e.target.value)}
            placeholder={`Message ${agent.name} directly...`}
            className="flex-1 px-2.5 py-1.5 bg-[#121622] border border-[#232C42] rounded-lg text-xs text-slate-200 outline-none placeholder-slate-600 font-mono"
          />
          <button
            type="submit"
            className="px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex gap-2">
          <button
            onClick={() => pauseAgent(agent.id)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              agent.isPaused
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-[#181E2E] hover:bg-[#232B40] text-slate-300 border border-[#2B354F]'
            }`}
          >
            {agent.isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
            <span>{agent.isPaused ? 'Resume Agent' : 'Pause Agent'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
