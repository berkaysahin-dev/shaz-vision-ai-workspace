import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { AgentId } from '../../types';
import { sound } from '../../services/soundEngine';
import { Coffee, Server, Cpu, Sparkles, Terminal, Activity, FileCode } from 'lucide-react';

export const LargePixelOffice: React.FC = () => {
  const { agents, selectedAgentId, setSelectedAgentId, activeTeam } = useWorkspace();

  const handleAgentClick = (id: AgentId) => {
    sound.playClick();
    setSelectedAgentId(id);
  };

  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-hidden select-none bg-[#080A10]">
      {/* Office Header Strip */}
      <div className="flex items-center justify-between bg-[#0F121C] border border-[#1E2538] px-4 py-2 rounded-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="font-bold text-xs text-slate-100 tracking-wider font-mono uppercase">
            SHAZ VISION HQ · {activeTeam} CREW
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            (Click any AI employee to inspect live tasks, model, code & metrics)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/40 font-bold">
            8/8 AI EMPLOYEES ACTIVE
          </span>
        </div>
      </div>

      {/* Large Expansive 2D Pixel Office Canvas */}
      <div className="flex-1 bg-[#090C14] border border-[#1E2436] rounded-2xl p-3 overflow-hidden shadow-2xl relative flex flex-col justify-between">
        {/* Subtle Pixel Brick / Tile Floor Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#2D3A54_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* 6 Spacious Departmental Rooms (2 Rows x 3 Cols) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0 relative z-10">
          {/* ROOM 1: ARCHITECTURE LAB (Ada) */}
          <div
            onClick={() => handleAgentClick('ada')}
            className={`relative rounded-xl p-3 bg-gradient-to-b from-[#1C142B] to-[#100B1B] border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
              selectedAgentId === 'ada'
                ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-[1.01]'
                : 'border-[#382654] hover:border-purple-500/60'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center z-10">
              <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-[10px] font-mono font-bold text-purple-300 tracking-wider">
                ARCHITECTURE LAB
              </span>
              <span className="text-[9px] font-mono text-purple-400 font-bold">ADA (ARCHITECT)</span>
            </div>

            {/* Architecture Whiteboard Props */}
            <div className="absolute top-3 left-4 w-20 h-11 bg-[#25183A] border border-[#4E3278] rounded-xs p-1 opacity-60">
              <div className="w-full h-1 bg-purple-400 mb-1" />
              <div className="w-3/4 h-1 bg-slate-300 mb-1" />
              <div className="w-1/2 h-1 bg-cyan-400" />
            </div>

            {/* Center Character & Desk */}
            <div className="my-auto z-10 flex flex-col items-center pt-5">
              {/* Dynamic Speech Bubble */}
              <div className="mb-1 px-2.5 py-0.5 bg-[#FDF8E2] text-[#1E1B18] border border-[#1E1B18] rounded text-[10px] font-mono font-bold shadow-md animate-bounce">
                {agents.ada?.speechBubble || "let's do this"}
              </div>

              {/* Character Avatar */}
              <div className="w-8 h-8 relative flex items-center justify-center">
                <div className="w-5 h-5 bg-[#A855F7] rounded-full shadow-sm" />
                <div className="w-6 h-4 bg-[#2E1065] rounded-xs -mt-1" />
              </div>

              {/* Desk with Dual Purple Screens */}
              <div className="w-24 h-8 bg-[#2A1D3D] border border-[#4C336E] rounded-xs flex items-center justify-around px-1 -mt-1 shadow-md">
                <div className="w-6 h-4 bg-[#0A0D15] border border-[#A855F7]/80 rounded-xs flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-purple-400 animate-pulse" />
                </div>
                <div className="w-6 h-4 bg-[#0A0D15] border border-[#A855F7]/80 rounded-xs" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 z-10 pt-1 border-t border-purple-900/40">
              <span>Claude 3.5 Sonnet</span>
              <span className="text-emerald-400 font-bold">● WORKING</span>
            </div>
          </div>

          {/* ROOM 2: CORE BACKEND LAB (Nova) */}
          <div
            onClick={() => handleAgentClick('nova')}
            className={`relative rounded-xl p-3 bg-gradient-to-b from-[#0D1C28] to-[#07121B] border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
              selectedAgentId === 'nova'
                ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.01]'
                : 'border-[#1C3E56] hover:border-cyan-500/60'
            }`}
          >
            <div className="flex justify-between items-center z-10">
              <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 tracking-wider">
                CORE BACKEND LAB
              </span>
              <span className="text-[9px] font-mono text-cyan-400 font-bold">NOVA (BACKEND)</span>
            </div>

            {/* Server Rack with Blinking LEDs */}
            <div className="absolute top-2 right-3 w-8 h-14 bg-[#0A1620] border border-[#1F4C6E] rounded-xs p-1 flex flex-col justify-between opacity-80">
              <div className="flex justify-between"><div className="w-1 h-1 bg-emerald-400 animate-ping" /><div className="w-1 h-1 bg-cyan-400" /></div>
              <div className="flex justify-between"><div className="w-1 h-1 bg-purple-400" /><div className="w-1 h-1 bg-emerald-400" /></div>
              <div className="flex justify-between"><div className="w-1 h-1 bg-amber-400" /><div className="w-1 h-1 bg-cyan-400" /></div>
            </div>

            {/* Character & Desk */}
            <div className="my-auto z-10 flex flex-col items-center pt-5">
              <div className="mb-1 px-2.5 py-0.5 bg-[#FDF8E2] text-[#1E1B18] border border-[#1E1B18] rounded text-[10px] font-mono font-bold shadow-md">
                {agents.nova?.speechBubble || 'patching retry jitter'}
              </div>

              <div className="w-8 h-8 relative flex items-center justify-center">
                <div className="w-5 h-5 bg-[#00E5FF] rounded-full shadow-sm" />
                <div className="w-6 h-4 bg-[#0A1017] rounded-xs -mt-1" />
              </div>

              <div className="w-24 h-8 bg-[#183244] border border-[#2B5676] rounded-xs flex items-center justify-around px-1 -mt-1 shadow-md">
                <div className="w-6 h-4 bg-[#081018] border border-[#00E5FF]/80 rounded-xs flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-cyan-400 animate-pulse" />
                </div>
                <div className="w-6 h-4 bg-[#081018] border border-[#00E5FF]/80 rounded-xs" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 z-10 pt-1 border-t border-cyan-900/40">
              <span>gpt-5-codex</span>
              <span className="text-cyan-400 font-bold">● RUNNING</span>
            </div>
          </div>

          {/* ROOM 3: FULLSTACK STUDIO (Emre) */}
          <div
            onClick={() => handleAgentClick('emre')}
            className={`relative rounded-xl p-3 bg-gradient-to-b from-[#10241A] to-[#08160E] border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
              selectedAgentId === 'emre'
                ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-[1.01]'
                : 'border-[#204A34] hover:border-emerald-500/60'
            }`}
          >
            <div className="flex justify-between items-center z-10">
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-300 tracking-wider">
                FULLSTACK STUDIO
              </span>
              <span className="text-[9px] font-mono text-emerald-400 font-bold">EMRE (FULLSTACK)</span>
            </div>

            {/* Coffee Maker Prop */}
            <div className="absolute top-3 right-3 w-5 h-8 bg-[#1B3627] border border-[#2F6147] rounded-xs flex flex-col items-center p-0.5">
              <div className="w-2.5 h-2.5 bg-emerald-400/60 rounded-full animate-pulse mt-0.5" />
            </div>

            {/* Character & Desk */}
            <div className="my-auto z-10 flex flex-col items-center pt-5">
              <div className="mb-1 px-2.5 py-0.5 bg-[#FDF8E2] text-[#1E1B18] border border-[#1E1B18] rounded text-[10px] font-mono font-bold shadow-md">
                {agents.emre?.speechBubble || 'building onboarding wizard'}
              </div>

              <div className="w-8 h-8 relative flex items-center justify-center">
                <div className="w-5 h-5 bg-[#10B981] rounded-full shadow-sm" />
                <div className="w-6 h-4 bg-[#064E3B] rounded-xs -mt-1" />
              </div>

              <div className="w-24 h-8 bg-[#1F4230] border border-[#31694D] rounded-xs flex items-center justify-around px-1 -mt-1 shadow-md">
                <div className="w-6 h-4 bg-[#09150E] border border-[#10B981]/80 rounded-xs flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-emerald-400 animate-pulse" />
                </div>
                <div className="w-6 h-4 bg-[#09150E] border border-[#10B981]/80 rounded-xs" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 z-10 pt-1 border-t border-emerald-900/40">
              <span>Fable 5</span>
              <span className="text-emerald-400 font-bold">● WORKING</span>
            </div>
          </div>

          {/* ROOM 4: FRONTEND & DESIGN (Kai & Rio) */}
          <div
            onClick={() => handleAgentClick('kai')}
            className={`relative rounded-xl p-3 bg-gradient-to-b from-[#1A182E] to-[#0E0C1B] border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
              selectedAgentId === 'kai' || selectedAgentId === 'rio'
                ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-[1.01]'
                : 'border-[#342F5C] hover:border-blue-500/60'
            }`}
          >
            <div className="flex justify-between items-center z-10">
              <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-[10px] font-mono font-bold text-blue-300 tracking-wider">
                FRONTEND & DESIGN
              </span>
              <span className="text-[9px] font-mono text-blue-400 font-bold">KAI & RIO</span>
            </div>

            {/* Character & Desk */}
            <div className="my-auto z-10 flex flex-col items-center pt-5">
              <div className="mb-1 px-2.5 py-0.5 bg-[#FDF8E2] text-[#1E1B18] border border-[#1E1B18] rounded text-[10px] font-mono font-bold shadow-md">
                {agents.kai?.speechBubble || 'running playwright pack'}
              </div>

              <div className="flex items-center gap-3">
                <div
                  onClick={(e) => { e.stopPropagation(); handleAgentClick('kai'); }}
                  className="w-7 h-7 flex flex-col items-center hover:scale-110 transition-transform"
                  title="Kai - Frontend"
                >
                  <div className="w-4.5 h-4.5 bg-[#3B82F6] rounded-full" />
                  <div className="w-5 h-3 bg-[#1E3A8A] rounded-xs -mt-0.5" />
                </div>

                <div
                  onClick={(e) => { e.stopPropagation(); handleAgentClick('rio'); }}
                  className="w-7 h-7 flex flex-col items-center hover:scale-110 transition-transform"
                  title="Rio - Designer"
                >
                  <div className="w-4.5 h-4.5 bg-[#F59E0B] rounded-full" />
                  <div className="w-5 h-3 bg-[#78350F] rounded-xs -mt-0.5" />
                </div>
              </div>

              <div className="w-28 h-8 bg-[#252140] border border-[#3E386B] rounded-xs flex items-center justify-around px-1 -mt-1 shadow-md">
                <div className="w-6 h-4 bg-[#0B0A14] border border-[#3B82F6]/80 rounded-xs flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-blue-400 animate-pulse" />
                </div>
                <div className="w-6 h-4 bg-[#0B0A14] border border-[#F59E0B]/80 rounded-xs" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 z-10 pt-1 border-t border-blue-900/40">
              <span>Fable 5 / Claude 3.5</span>
              <span className="text-cyan-400 font-bold">● RUNNING</span>
            </div>
          </div>

          {/* ROOM 5: DEVOPS & CLOUD MATRIX (Sol) */}
          <div
            onClick={() => handleAgentClick('sol')}
            className={`relative rounded-xl p-3 bg-gradient-to-b from-[#242010] to-[#120F08] border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
              selectedAgentId === 'sol'
                ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] scale-[1.01]'
                : 'border-[#4A4020] hover:border-yellow-500/60'
            }`}
          >
            <div className="flex justify-between items-center z-10">
              <span className="px-2 py-0.5 rounded bg-yellow-950/80 border border-yellow-500/40 text-[10px] font-mono font-bold text-yellow-300 tracking-wider">
                DEVOPS MATRIX
              </span>
              <span className="text-[9px] font-mono text-yellow-400 font-bold">SOL (DEVOPS)</span>
            </div>

            {/* Character & Desk */}
            <div className="my-auto z-10 flex flex-col items-center pt-5">
              <div className="mb-1 px-2.5 py-0.5 bg-[#FDF8E2] text-[#1E1B18] border border-[#1E1B18] rounded text-[10px] font-mono font-bold shadow-md">
                {agents.sol?.speechBubble || 'routing tasks to crew'}
              </div>

              <div className="w-8 h-8 relative flex items-center justify-center">
                <div className="w-5 h-5 bg-[#EAB308] rounded-full shadow-sm" />
                <div className="w-6 h-4 bg-[#713F12] rounded-xs -mt-1" />
              </div>

              <div className="w-24 h-8 bg-[#383018] border border-[#5C5028] rounded-xs flex items-center justify-around px-1 -mt-1 shadow-md">
                <div className="w-6 h-4 bg-[#0F0D06] border border-[#EAB308]/80 rounded-xs flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-yellow-400 animate-pulse" />
                </div>
                <div className="w-6 h-4 bg-[#0F0D06] border border-[#EAB308]/80 rounded-xs" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 z-10 pt-1 border-t border-yellow-900/40">
              <span>Gemini 1.5 Pro</span>
              <span className="text-yellow-400 font-bold">● SPEAKING</span>
            </div>
          </div>

          {/* ROOM 6: SECURITY & QA LAB (Max) */}
          <div
            onClick={() => handleAgentClick('max')}
            className={`relative rounded-xl p-3 bg-gradient-to-b from-[#281012] to-[#140809] border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
              selectedAgentId === 'max'
                ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-[1.01]'
                : 'border-[#522024] hover:border-red-500/60'
            }`}
          >
            <div className="flex justify-between items-center z-10">
              <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-[10px] font-mono font-bold text-red-300 tracking-wider">
                SECURITY ROOM
              </span>
              <span className="text-[9px] font-mono text-red-400 font-bold">MAX (SECURITY)</span>
            </div>

            {/* Radar Screen Prop */}
            <div className="absolute top-2 left-3 w-8 h-8 rounded-full border border-red-500/50 flex items-center justify-center opacity-70">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            </div>

            {/* Character & Desk */}
            <div className="my-auto z-10 flex flex-col items-center pt-5">
              <div className="mb-1 px-2.5 py-0.5 bg-[#FDF8E2] text-[#1E1B18] border border-[#1E1B18] rounded text-[10px] font-mono font-bold shadow-md">
                {agents.max?.speechBubble || 'verifying OWASP standards'}
              </div>

              <div className="w-8 h-8 relative flex items-center justify-center">
                <div className="w-5 h-5 bg-[#EF4444] rounded-full shadow-sm" />
                <div className="w-6 h-4 bg-[#7F1D1D] rounded-xs -mt-1" />
              </div>

              <div className="w-24 h-8 bg-[#38161A] border border-[#5E242B] rounded-xs flex items-center justify-around px-1 -mt-1 shadow-md">
                <div className="w-6 h-4 bg-[#100607] border border-[#EF4444]/80 rounded-xs flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-red-400 animate-pulse" />
                </div>
                <div className="w-6 h-4 bg-[#100607] border border-[#EF4444]/80 rounded-xs" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 z-10 pt-1 border-t border-red-900/40">
              <span>DeepSeek V3</span>
              <span className="text-emerald-400 font-bold">● WORKING</span>
            </div>
          </div>
        </div>

        {/* Central Entrance Lounge & Reception Hallway */}
        <div className="mt-3 pt-2 border-t border-[#1C2436] flex items-center justify-between px-6 bg-[#0E131F]/90 rounded-xl py-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-mono text-slate-300 font-bold">
              MAIN ENTRANCE · RECEPTION
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-400">
              Selected Agent: <span className="text-cyan-400 font-bold uppercase">{selectedAgentId || 'None'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
