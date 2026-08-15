import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Command,
  Settings,
  Download,
  Square,
  ChevronUp,
  ChevronDown,
  CornerDownLeft,
  Zap,
  DollarSign,
  Move,
  RotateCcw,
  Tv,
  Coffee,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { AgentId } from '../../types';
import { sound } from '../../services/soundEngine';
import { PixelCharacter } from '../office/PixelArtSprite';

interface Position {
  x: number; // percentage (0 to 100)
  y: number; // percentage (0 to 100)
  isWalking?: boolean;
}

const DESK_POSITIONS: Record<AgentId, Position> = {
  nova: { x: 14, y: 22 },
  ada: { x: 26, y: 38 },
  emre: { x: 50, y: 24 },
  kai: { x: 70, y: 22 },
  rio: { x: 86, y: 38 },
  max: { x: 18, y: 74 },
  lux: { x: 50, y: 74 },
  sol: { x: 80, y: 74 },
};

export const LeftOfficePane: React.FC = () => {
  const {
    agents,
    selectedAgentId,
    setSelectedAgentId,
    setIsInspectorOpen,
    voiceState,
    activeTeam,
    setIsSettingsOpen,
    executeGlobalPrompt,
    t,
  } = useWorkspace();

  const [quickInput, setQuickInput] = useState('refresh the landing page, spread it across the crew');
  const [isPushToTalkActive, setIsPushToTalkActive] = useState(false);

  // Click-and-Drag Panning & Zoom State
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Agent Positions and Realistic Smooth Walking State
  const [agentCoords, setAgentCoords] = useState<Record<AgentId, Position>>({ ...DESK_POSITIONS });

  const officeRef = useRef<HTMLDivElement>(null);

  // Autonomous natural wandering & visiting behavior (relaxed 18s interval, calm 3.5s walk speed)
  useEffect(() => {
    const wanderInterval = setInterval(() => {
      const agentList: AgentId[] = ['nova', 'ada', 'emre', 'kai', 'rio', 'lux', 'sol', 'max'];
      const randomAgent = agentList[Math.floor(Math.random() * agentList.length)];
      
      const targets = [
        { x: 50, y: 70, speech: 'getting espresso ☕' }, // Coffee machine
        { x: 50, y: 44, speech: 'checking wall TV stats 📺' }, // Wall TV
        { x: 16, y: 24, speech: 'discussing API with Nova 💬' }, // Nova's desk
        { x: 50, y: 26, speech: 'syncing code with Emre ⚡' }, // Emre's desk
        { x: 72, y: 24, speech: 'reviewing UI with Kai 🎨' }, // Kai's desk
      ];
      const randomTarget = targets[Math.floor(Math.random() * targets.length)];

      // Start calm, natural walk to target
      setAgentCoords((prev) => ({
        ...prev,
        [randomAgent]: { x: randomTarget.x, y: randomTarget.y, isWalking: true },
      }));

      // Finish walk after 3.5s natural walk duration
      setTimeout(() => {
        setAgentCoords((prev) => ({
          ...prev,
          [randomAgent]: { ...prev[randomAgent], isWalking: false },
        }));
      }, 3500);

      // Stay and chat for 8 seconds, then return back to home desk calmly
      setTimeout(() => {
        const homeDesk = DESK_POSITIONS[randomAgent];
        setAgentCoords((prev) => ({
          ...prev,
          [randomAgent]: { x: homeDesk.x, y: homeDesk.y, isWalking: true },
        }));

        setTimeout(() => {
          setAgentCoords((prev) => ({
            ...prev,
            [randomAgent]: { ...homeDesk, isWalking: false },
          }));
        }, 3500);
      }, 9000);
    }, 18000);

    return () => clearInterval(wanderInterval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Click on office floor to command selected agent to walk smoothly
  const handleFloorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!officeRef.current || !selectedAgentId) return;
    const rect = officeRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    sound.playClick();
    setAgentCoords((prev) => ({
      ...prev,
      [selectedAgentId]: {
        x: Math.max(8, Math.min(90, clickX)),
        y: Math.max(10, Math.min(85, clickY)),
        isWalking: true,
      },
    }));

    setTimeout(() => {
      setAgentCoords((prev) => ({
        ...prev,
        [selectedAgentId]: { ...prev[selectedAgentId], isWalking: false },
      }));
    }, 3200);
  };

  const handleResetView = () => {
    sound.playClick();
    setPanOffset({ x: 0, y: 0 });
    setAgentCoords({ ...DESK_POSITIONS });
  };

  const handleAgentClick = (id: AgentId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playClick();
    setSelectedAgentId(id);
    setIsInspectorOpen(true);
  };

  const handleVoiceSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!quickInput.trim()) return;
    sound.playAgentPing();
    executeGlobalPrompt(quickInput.trim());
  };

  const handlePushToTalkDown = () => {
    sound.playAgentPing();
    setIsPushToTalkActive(true);
  };

  const handlePushToTalkUp = () => {
    setIsPushToTalkActive(false);
    handleVoiceSubmit();
  };

  const totalTokens = Object.values(agents).reduce((acc, a) => acc + a.tokens, 0);
  const totalCost = Object.values(agents).reduce((acc, a) => acc + a.cost, 0);

  return (
    <div
      className="w-[370px] xl:w-[420px] border-r flex flex-col justify-between shrink-0 select-none overflow-y-auto font-mono text-slate-300 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--app-bg-panel, #0C0F17)',
        borderColor: 'var(--app-border, #1C2234)',
      }}
    >
      <div className="p-3 space-y-3 flex-1 flex flex-col justify-between">
        
        {/* =========================================================================
            1. THE 6-ROOM PIXEL OFFICE WITH REALISTIC SMOOTH WALKING AGENTS
           ========================================================================= */}
        <div
          className="border rounded-2xl overflow-hidden shadow-2xl flex flex-col relative group transition-colors duration-300"
          style={{
            backgroundColor: 'var(--app-bg-dark, #07090F)',
            borderColor: 'var(--app-border, #1A2030)',
          }}
        >
          {/* Header Bar with Live Totals */}
          <div
            className="p-2 px-3 border-b flex items-center justify-between text-[11px] font-mono z-20 transition-colors duration-300"
            style={{
              backgroundColor: 'var(--app-bg-surface, #0E121E)',
              borderColor: 'var(--app-border, #181E2E)',
            }}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--app-accent, #10B981)' }}
              />
              <span
                className="font-bold uppercase"
                style={{ color: 'var(--app-text-accent, #C4B5FD)' }}
              >
                {activeTeam} {t.office}
              </span>
            </div>

            {/* Total Token Telemetry HUD */}
            <div className="flex items-center gap-2 text-[10px]">
              <span className="font-bold flex items-center gap-0.5 text-cyan-300" title={t.totalTokens}>
                <Zap className="w-2.5 h-2.5" />
                {(totalTokens / 1000).toFixed(1)}k
              </span>
              <span className="font-bold flex items-center gap-0.5 text-emerald-400" title={t.totalCost}>
                <DollarSign className="w-2.5 h-2.5" />
                ${totalCost.toFixed(2)}
              </span>

              <button
                onClick={handleResetView}
                title={t.resetMap}
                className="p-1 rounded text-slate-400 hover:text-cyan-300 border transition-colors"
                style={{
                  backgroundColor: 'var(--app-bg-panel, #161B28)',
                  borderColor: 'var(--app-border, #263047)',
                }}
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Interactive Drag & Floor Click Viewport */}
          <div
            ref={officeRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleFloorClick}
            className={`relative h-[310px] bg-[#111420] overflow-hidden select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {/* The 6-Room Map Surface */}
            <div
              className="absolute inset-0 w-[490px] h-[340px] grid grid-cols-3 grid-rows-2 gap-[2px] bg-[#1C2336] p-[2px] transition-transform duration-75"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
              }}
            >
              {/* ROOM 1 (TOP-LEFT): MİMARİ LAB */}
              <div className="relative bg-[#768494] overflow-hidden p-1.5">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#8C9AA8_25%,transparent_25%),linear-gradient(-45deg,#8C9AA8_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#8C9AA8_75%),linear-gradient(-45deg,transparent_75%,#8C9AA8_75%)] bg-[size:12px_12px] opacity-40" />
                <div className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded bg-[#0A0E17]/90 border border-cyan-500/50 text-[8px] font-bold text-cyan-300 uppercase tracking-wider shadow-sm">
                  {t.roomArch}
                </div>
                <div className="absolute top-0.5 right-6 w-4 h-3 bg-[#B0E0E6] border border-[#3C4A5A] rounded-xs opacity-90" />
                <div className="absolute top-0.5 right-1 w-2.5 h-3.5 bg-[#2D5A27] rounded-full shadow-sm" />

                {/* Desk 1 (Nova Workstation) */}
                <div className="absolute top-12 left-3 flex flex-col items-center">
                  <div className="w-10 h-5 bg-[#3E2723] border border-[#1E120C] rounded-xs flex items-center justify-around px-0.5 shadow-md z-10">
                    <div className="w-3.5 h-3 bg-[#080E14] border border-[#00E5FF] rounded-xs flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-cyan-400 animate-pulse" />
                    </div>
                    <div className="w-3.5 h-3 bg-[#080E14] border border-[#00E5FF]/60 rounded-xs" />
                  </div>
                  <div className="w-2 h-4 bg-[#0A0D14] border border-cyan-400 -mt-1 self-start ml-0.5 shadow-xs" />
                </div>

                {/* Desk 2 (Ada Workstation) */}
                <div className="absolute top-22 right-3 flex flex-col items-center">
                  <div className="w-8 h-4.5 bg-[#3E2723] border border-[#1E120C] rounded-xs flex items-center justify-around px-0.5 shadow-md z-10">
                    <div className="w-3.5 h-3 bg-[#080E14] border border-[#A855F7] rounded-xs flex items-center justify-center">
                      <div className="w-1.5 h-0.5 bg-purple-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ROOM 2 (TOP-MIDDLE): FULLSTACK STÜDYO (BÜYÜK DUVAR TV EKRANI) */}
              <div className="relative bg-[#5A3825] overflow-hidden p-1.5">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#4A2E1D_25%,transparent_25%),linear-gradient(-45deg,#4A2E1D_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#4A2E1D_75%),linear-gradient(-45deg,transparent_75%,#4A2E1D_75%)] bg-[size:10px_10px] opacity-60" />
                <div className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded bg-[#0A0E17]/90 border border-amber-500/50 text-[8px] font-bold text-amber-300 uppercase tracking-wider shadow-sm">
                  {t.roomFullstack}
                </div>

                {/* BÜYÜK DUVAR TELEVİZYONU */}
                <div className="absolute top-1 right-2 w-14 h-7 bg-[#050811] border-2 border-[#1E283D] rounded-xs flex flex-col justify-between p-0.5 shadow-[0_0_8px_rgba(56,189,248,0.5)] z-10">
                  <div className="flex items-center justify-between text-[6px] text-cyan-300 font-bold px-0.5">
                    <span className="flex items-center gap-0.5">
                      <Tv className="w-2 h-2 text-cyan-400" />
                      <span>LIVE TV</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="w-full h-2.5 bg-[#08101E] rounded-xs flex items-end justify-around px-0.5 overflow-hidden">
                    <div className="w-1 h-1.5 bg-emerald-400 animate-pulse" />
                    <div className="w-1 h-2 bg-cyan-400 animate-pulse delay-75" />
                    <div className="w-1 h-1 bg-purple-400" />
                    <div className="w-1 h-2.5 bg-cyan-300 animate-pulse delay-150" />
                  </div>
                </div>

                {/* Center Desk: Emre */}
                <div className="absolute top-14 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-12 h-5 bg-[#2E1A0F] border border-[#1A0E08] rounded-xs flex items-center justify-around px-0.5 shadow-md z-10">
                    <div className="w-2.5 h-3 bg-[#080E14] border border-[#38BDF8] rounded-xs" />
                    <div className="w-3.5 h-3.5 bg-[#080E14] border border-[#10B981] rounded-xs flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-emerald-400 animate-pulse" />
                    </div>
                    <div className="w-2.5 h-3 bg-[#080E14] border border-[#38BDF8] rounded-xs" />
                  </div>
                </div>

                {/* Meeting Table */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-10 h-3.5 bg-[#3E2314] border border-[#22130A] rounded-xs flex items-center justify-around px-1">
                    <div className="w-1.5 h-1 bg-white" />
                  </div>
                  <div className="flex gap-1 mt-0.5">
                    {[1, 2, 3, 4, 5].map((c) => (
                      <div key={c} className="w-1.5 h-1.5 bg-[#1C1008] border border-[#334155] rounded-xs" />
                    ))}
                  </div>
                </div>
              </div>

              {/* ROOM 3 (TOP-RIGHT): TASARIM & FRONTEND */}
              <div className="relative bg-[#50728C] overflow-hidden p-1.5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B5A73_1px,transparent_1px),linear-gradient(to_bottom,#3B5A73_1px,transparent_1px)] bg-[size:10px_10px] opacity-70" />
                <div className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded bg-[#0A0E17]/90 border border-blue-500/50 text-[8px] font-bold text-blue-300 uppercase tracking-wider shadow-sm">
                  {t.roomDesign}
                </div>

                {/* Aquarium */}
                <div className="absolute top-1 right-1 w-7 h-4.5 bg-[#38BDF8]/80 border-2 border-[#0284C7] rounded-xs flex items-center justify-around p-0.5 shadow-md">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-emerald-300 rounded-full animate-pulse" />
                </div>

                {/* Desk 1 (Kai) */}
                <div className="absolute top-12 left-3 flex flex-col items-center">
                  <div className="w-9 h-4.5 bg-[#1E293B] border border-[#0F172A] rounded-xs flex items-center justify-around px-0.5 z-10 shadow-md">
                    <div className="w-3.5 h-3 bg-[#080E14] border border-[#3B82F6] rounded-xs flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-blue-400 animate-pulse" />
                    </div>
                    <div className="w-2.5 h-2.5 bg-[#080E14] border border-[#3B82F6]/70 rounded-xs" />
                  </div>
                </div>

                {/* Desk 2 (Rio) */}
                <div className="absolute top-22 right-3 flex flex-col items-center">
                  <div className="w-8 h-4.5 bg-[#1E293B] border border-[#0F172A] rounded-xs flex items-center justify-around px-0.5 z-10 shadow-md">
                    <div className="w-3.5 h-3 bg-[#080E14] border border-[#F59E0B] rounded-xs flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-amber-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ROOM 4 (BOTTOM-LEFT): GÜVENLİK & QA LAB */}
              <div className="relative bg-[#689484] overflow-hidden p-1.5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#537A6C_1px,transparent_1px),linear-gradient(to_bottom,#537A6C_1px,transparent_1px)] bg-[size:10px_10px] opacity-70" />
                <div className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded bg-[#0A0E17]/90 border border-red-500/50 text-[8px] font-bold text-red-300 uppercase tracking-wider shadow-sm">
                  {t.roomSecurity}
                </div>

                <div className="absolute top-1 right-2 w-7 h-4 bg-[#0A0E14] border border-red-500/60 rounded-xs flex items-center justify-center">
                  <div className="w-4 h-1 bg-red-400 animate-pulse" />
                </div>

                {/* Desk (Max) */}
                <div className="absolute top-14 left-6 flex flex-col items-center">
                  <div className="w-8 h-4.5 bg-[#132A22] border border-[#091510] rounded-xs flex items-center justify-around px-0.5 z-10 shadow-md">
                    <div className="w-3.5 h-3 bg-[#080E14] border border-[#EF4444] rounded-xs flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-red-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ROOM 5 (BOTTOM-MIDDLE): DİNLENME & KAHVE MAKİNESİ */}
              <div className="relative bg-[#C08A5E] overflow-hidden p-1.5">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#AD774D_25%,transparent_25%),linear-gradient(-45deg,#AD774D_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#AD774D_75%),linear-gradient(-45deg,transparent_75%,#AD774D_75%)] bg-[size:10px_10px] opacity-60" />
                <div className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded bg-[#0A0E17]/90 border border-pink-500/50 text-[8px] font-bold text-pink-300 uppercase tracking-wider shadow-sm">
                  {t.roomBreakroom}
                </div>

                {/* Espresso Coffee Machine */}
                <div className="absolute top-1 right-2 flex flex-col items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-ping mb-0.5" />
                  <div className="w-6 h-4 bg-[#1E2433] border border-[#334155] rounded-xs flex items-center justify-around px-0.5 shadow-sm">
                    <Coffee className="w-2.5 h-2.5 text-amber-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                </div>

                {/* Coffee Bar Table */}
                <div className="absolute top-14 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-10 h-4.5 bg-[#451A03] border border-[#270E02] rounded-xs flex items-center justify-around px-1 z-10 shadow-md">
                    <div className="w-3 h-2 bg-[#090C14] border border-pink-400 rounded-xs" />
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* ROOM 6 (BOTTOM-RIGHT): DEVOPS MATRİS */}
              <div className="relative bg-[#1A1F2C] overflow-hidden p-1.5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F131D_1px,transparent_1px),linear-gradient(to_bottom,#0F131D_1px,transparent_1px)] bg-[size:8px_8px] opacity-90" />
                <div className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded bg-[#0A0E17]/90 border border-yellow-500/50 text-[8px] font-bold text-yellow-300 uppercase tracking-wider shadow-sm">
                  {t.roomDevops}
                </div>

                {/* Server Racks */}
                <div className="absolute top-1 right-2 w-5 h-8 bg-[#090B10] border border-yellow-500/60 rounded-xs flex flex-col justify-around p-0.5 shadow-md">
                  <div className="flex justify-around"><span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" /><span className="w-1 h-1 bg-yellow-400 rounded-full" /></div>
                  <div className="flex justify-around"><span className="w-1 h-1 bg-cyan-400 rounded-full" /><span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" /></div>
                  <div className="flex justify-around"><span className="w-1 h-1 bg-yellow-400 rounded-full animate-ping" /><span className="w-1 h-1 bg-red-400 rounded-full" /></div>
                </div>

                {/* Desk (Sol) */}
                <div className="absolute top-14 left-6 flex flex-col items-center">
                  <div className="w-9 h-4.5 bg-[#0A0D15] border border-[#EAB308]/70 rounded-xs flex items-center justify-around px-0.5 z-10 shadow-md">
                    <div className="w-3.5 h-2.5 bg-[#080E14] border border-[#EAB308] rounded-xs flex items-center justify-center">
                      <div className="w-1.5 h-0.5 bg-yellow-400 animate-ping" />
                    </div>
                    <div className="w-2.5 h-2.5 bg-[#00E5FF]" />
                  </div>
                </div>
              </div>

              {/* =============================================================
                  REALISTIC NATURAL WALKING & POSITIONED AGENTS LAYER
                 ============================================================= */}
              {(['nova', 'ada', 'emre', 'kai', 'rio', 'max', 'lux', 'sol'] as AgentId[]).map((aid) => {
                const ag = agents[aid];
                if (!ag) return null;
                const pos = agentCoords[aid] || DESK_POSITIONS[aid];
                const isSelected = selectedAgentId === aid;

                return (
                  <div
                    key={aid}
                    onClick={(e) => handleAgentClick(aid, e)}
                    className="absolute z-20"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'left 3.5s cubic-bezier(0.4, 0, 0.2, 1), top 3.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <PixelCharacter
                      agent={ag}
                      onClick={() => handleAgentClick(aid)}
                      isSelected={isSelected}
                      showSpeech={true}
                      isWalking={pos.isWalking}
                    />
                  </div>
                );
              })}
            </div>

            {/* Drag / Click Navigation Hint */}
            <div className="absolute bottom-1.5 right-2 z-30 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[8px] font-mono text-slate-400 border border-slate-700/50 pointer-events-none">
              <Move className="w-2.5 h-2.5 text-cyan-400" />
              <span>{t.dragHint} · Tıkla ve Yürüt</span>
            </div>
          </div>

          {/* Bottom Monospace Status */}
          <div
            className="p-2 px-3 border-t flex items-center justify-between text-xs font-mono transition-colors duration-300"
            style={{
              backgroundColor: 'var(--app-bg-dark, #0A0D14)',
              borderColor: 'var(--app-border, #181E2E)',
            }}
          >
            <span
              className="flex items-center gap-2 font-bold tracking-wide"
              style={{ color: 'var(--app-accent, #00E5FF)' }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--app-accent, #00E5FF)' }}
              />
              {t.liveHQ}
            </span>
          </div>
        </div>

        {/* =========================================================================
            2. AGENT X SPEAKING POPUP MODAL / WIDGET
           ========================================================================= */}
        <div
          className="border rounded-2xl p-3 shadow-xl space-y-3 relative transition-colors duration-300"
          style={{
            backgroundColor: 'var(--app-bg-surface, #121622)',
            borderColor: 'var(--app-border, #232B3E)',
          }}
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--app-accent, #10B981)' }}
              />
              <span className="font-bold text-slate-100">{t.agentX}</span>
              <span
                className="font-bold text-[10px] tracking-wider"
                style={{ color: 'var(--app-text-accent, #FFA494)' }}
              >
                {t.speaking}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <button title="Download" className="hover:text-slate-300"><Download className="w-3 h-3" /></button>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsSettingsOpen(true);
                }}
                title={t.settings}
                className="hover:text-slate-300"
              >
                <Settings className="w-3 h-3" />
              </button>
              <button title="Window" className="hover:text-slate-300"><Square className="w-3 h-3" /></button>
            </div>
          </div>

          {/* 3D Glowing Sphere / Orb with dynamic theme radial gradient */}
          <div className="flex justify-center py-2">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-24 h-24 rounded-full blur-md animate-pulse"
                style={{ backgroundColor: 'var(--app-accent-glow, rgba(244, 63, 94, 0.45))' }}
              />
              <div
                className="relative w-16 h-16 rounded-full cursor-pointer hover:scale-105 transition-transform"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, var(--app-text-accent, #FFA494), var(--app-accent, #E0564C), var(--app-badge-bg, #7A1D16))',
                  boxShadow: '0 0 25px var(--app-accent-glow, rgba(224,86,76,0.8))',
                }}
                onClick={() => handleVoiceSubmit()}
                title="Click to dispatch prompt"
              />
            </div>
          </div>

          {/* Transcript Box */}
          <div
            className="p-2.5 rounded-xl border text-[11px] font-mono leading-relaxed text-slate-300 shadow-inner"
            style={{
              backgroundColor: 'var(--app-bg-dark, #090C14)',
              borderColor: 'var(--app-border, #1A2133)',
            }}
          >
            "{quickInput}" — the task is on the board and assigned to Rio.
          </div>

          {/* Interactive Prompt Command Input with Spinner Buttons */}
          <form onSubmit={handleVoiceSubmit} className="relative flex items-center">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder='Type: "have an agent do ...", "what is status?"'
              className="w-full border rounded-lg px-2.5 py-2 text-[11px] font-mono text-slate-100 placeholder-slate-500 outline-none pr-14 transition-colors"
              style={{
                backgroundColor: 'var(--app-bg-dark, #080B12)',
                borderColor: 'var(--app-border, #222A3E)',
              }}
            />
            <div className="absolute right-1 flex items-center gap-1">
              <div
                className="flex flex-col rounded border"
                style={{
                  backgroundColor: 'var(--app-bg-panel, #141926)',
                  borderColor: 'var(--app-border, #252E44)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuickInput('run full vitest suite and check code quality')}
                  className="px-1 hover:text-cyan-400 text-slate-400 text-[8px]"
                >
                  <ChevronUp className="w-2.5 h-2.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setQuickInput('refresh the landing page, spread it across the crew')}
                  className="px-1 hover:text-cyan-400 text-slate-400 text-[8px]"
                >
                  <ChevronDown className="w-2.5 h-2.5" />
                </button>
              </div>
              <button
                type="submit"
                className="p-1.5 text-white rounded transition-transform active:scale-95 shadow-md"
                style={{ backgroundColor: 'var(--app-accent, #E0564C)' }}
              >
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </div>
          </form>

          {/* Last Action Telemetry */}
          <div className="text-[10px] font-mono text-slate-400 truncate">
            {t.lastAction}: <span style={{ color: 'var(--app-text-accent, #FECDD3)' }} className="font-bold">{voiceState.lastAction}</span>
          </div>

          {/* Action Buttons: [ Talk ] and [ Push-to-talk ] */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleVoiceSubmit()}
              className="py-1.5 px-3 rounded-lg text-slate-200 border text-xs font-mono flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
              style={{
                backgroundColor: 'var(--app-bg-surface, #181F30)',
                borderColor: 'var(--app-border, #2B3752)',
              }}
            >
              <Mic className="w-3.5 h-3.5" style={{ color: 'var(--app-accent, #FFA494)' }} />
              <span>{t.talk}</span>
            </button>

            <button
              onMouseDown={handlePushToTalkDown}
              onMouseUp={handlePushToTalkUp}
              className="py-1.5 px-3 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 transition-all shadow-sm select-none"
              style={
                isPushToTalkActive
                  ? {
                      backgroundColor: 'var(--app-accent, #E0564C)',
                      borderColor: 'var(--app-text-accent, #FFA494)',
                      color: '#FFFFFF',
                      boxShadow: '0 0 12px var(--app-accent-glow, rgba(224,86,76,0.6))',
                    }
                  : {
                      backgroundColor: 'var(--app-bg-surface, #181F30)',
                      borderColor: 'var(--app-border, #2B3752)',
                      color: '#E2E8F0',
                    }
              }
            >
              <Command className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.pushToTalk}</span>
            </button>
          </div>

          <div className="text-[9px] font-mono text-slate-500 leading-normal text-center">
            {t.pushToTalkHint}
          </div>
        </div>

        {/* =========================================================================
            3. 5-AGENT AVATAR CARDS STRIP
           ========================================================================= */}
        <div
          className="border rounded-xl p-2 flex items-center justify-between gap-1.5 transition-colors duration-300"
          style={{
            backgroundColor: 'var(--app-bg-dark, #07090F)',
            borderColor: 'var(--app-border, #181E2E)',
          }}
        >
          {['ada', 'nova', 'rio', 'emre', 'max'].map((aid) => {
            const ag = agents[aid];
            if (!ag) return null;
            const isSelected = selectedAgentId === aid;
            return (
              <div
                key={aid}
                className="flex-1 border rounded-lg p-1.5 flex flex-col items-center relative cursor-pointer hover:scale-105 transition-all"
                style={{
                  backgroundColor: 'var(--app-bg-surface, #101420)',
                  borderColor: isSelected ? 'var(--app-accent, #E0564C)' : 'var(--app-border, #1E263A)',
                  boxShadow: isSelected ? '0 0 10px var(--app-accent-glow, rgba(224,86,76,0.4))' : 'none',
                }}
              >
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
                <PixelCharacter
                  agent={ag}
                  onClick={() => handleAgentClick(aid as AgentId)}
                  isSelected={isSelected}
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
