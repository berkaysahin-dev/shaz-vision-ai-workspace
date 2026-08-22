import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { AgentId } from '../../types';
import { sound } from '../../services/soundEngine';
import { PixelCharacter } from './PixelArtSprite';
import { 
  Building2, 
  Layers, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Shield, 
  Smartphone, 
  Database, 
  Palette, 
  Activity,
  Zap,
  Server
} from 'lucide-react';

export const LargePixelOffice: React.FC = () => {
  const { agents, selectedAgentId, setSelectedAgentId, activeTeam, setIsInspectorOpen } = useWorkspace();
  const [activeFloor, setActiveFloor] = useState<'floor1' | 'floor2' | 'all'>('all');

  const handleAgentClick = (id: AgentId) => {
    sound.playClick();
    setSelectedAgentId(id);
    setIsInspectorOpen(true);
  };

  const floor1Agents: AgentId[] = ['ada', 'nova', 'emre', 'kai', 'rio', 'sol', 'lux', 'deniz'];
  const floor2Agents: AgentId[] = ['vesper', 'atlas', 'nyx', 'echo', 'zoe', 'max', 'selin'];

  const displayedAgents = activeFloor === 'floor1' 
    ? floor1Agents 
    : activeFloor === 'floor2' 
    ? floor2Agents 
    : [...floor1Agents, ...floor2Agents];

  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-hidden select-none bg-[#080A10]">
      {/* Office Header Strip & Floor Switcher */}
      <div className="flex items-center justify-between bg-[#0F121C] border border-[#1E2538] px-4 py-2 rounded-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="font-bold text-xs text-slate-100 tracking-wider font-mono uppercase flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            SHAZ HQ · {Object.keys(agents).length} ACTIVE AI CREW
          </span>
        </div>

        {/* Floor Switcher Buttons */}
        <div className="flex items-center gap-1 bg-[#090C14] p-1 rounded-lg border border-[#1E2538]">
          <button
            onClick={() => { sound.playClick(); setActiveFloor('all'); }}
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
              activeFloor === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Labs ({Object.keys(agents).length})
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveFloor('floor1'); }}
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
              activeFloor === 'floor1'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Floor 1: Core Labs
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveFloor('floor2'); }}
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
              activeFloor === 'floor2'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Floor 2: R&D & Cyber
          </button>
        </div>
      </div>

      {/* Large Expansive 2D Pixel Office Canvas */}
      <div className="flex-1 bg-[#090C14] border border-[#1E2436] rounded-2xl p-3 overflow-y-auto overflow-x-hidden shadow-2xl relative flex flex-col justify-between custom-scrollbar">
        {/* Subtle Pixel Brick / Tile Floor Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#2D3A54_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Dynamic Multi-Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 flex-1 min-h-0 relative z-10">
          {displayedAgents.map((agentId) => {
            const agent = agents[agentId];
            if (!agent) return null;
            const isSelected = selectedAgentId === agentId;

            return (
              <div
                key={agent.id}
                onClick={() => handleAgentClick(agent.id)}
                className={`relative rounded-xl p-3 border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group min-h-[160px] ${
                  isSelected
                    ? 'scale-[1.02] shadow-xl'
                    : 'hover:scale-[1.01] hover:brightness-110'
                }`}
                style={{
                  backgroundColor: '#0C0F19',
                  borderColor: isSelected ? agent.color : `${agent.color}40`,
                  boxShadow: isSelected ? `0 0 15px ${agent.color}40` : undefined,
                }}
              >
                {/* Room Header */}
                <div className="flex justify-between items-center z-10">
                  <span
                    className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase truncate max-w-[140px]"
                    style={{
                      backgroundColor: `${agent.color}20`,
                      borderColor: `${agent.color}50`,
                      color: agent.color,
                      borderWidth: '1px',
                    }}
                  >
                    {agent.department}
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 font-bold">
                    {agent.name.toUpperCase()}
                  </span>
                </div>

                {/* Ambient Room Prop based on Agent Role */}
                {agent.id === 'vesper' && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-purple-400 opacity-70 animate-pulse pointer-events-none">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span className="font-mono text-[7px]">QUANTUM RIG</span>
                  </div>
                )}
                {agent.id === 'atlas' && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-amber-400 opacity-70 pointer-events-none">
                    <Smartphone className="w-3 h-3 text-orange-400" />
                    <span className="font-mono text-[7px]">IOS / ANDROID</span>
                  </div>
                )}
                {agent.id === 'nyx' && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-emerald-400 opacity-80 pointer-events-none">
                    <Shield className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span className="font-mono text-[7px]">RED MATRIX</span>
                  </div>
                )}
                {agent.id === 'echo' && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-cyan-400 opacity-70 pointer-events-none">
                    <Database className="w-3 h-3 text-cyan-400" />
                    <span className="font-mono text-[7px]">CUDA CLUSTER</span>
                  </div>
                )}
                {agent.id === 'zoe' && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-pink-400 opacity-70 pointer-events-none">
                    <Palette className="w-3 h-3 text-pink-400" />
                    <span className="font-mono text-[7px]">MOTION LAB</span>
                  </div>
                )}

                {/* Character & Interactive Desk Area */}
                <div className="my-auto z-10 flex flex-col items-center pt-2">
                  <PixelCharacter
                    agent={agent}
                    onClick={() => handleAgentClick(agent.id)}
                    isSelected={isSelected}
                    showSpeech={true}
                  />

                  {/* High-tech Desk with Monitors */}
                  <div
                    className="w-24 h-6 border rounded-xs flex items-center justify-around px-1 mt-1 shadow-md"
                    style={{
                      backgroundColor: '#151A28',
                      borderColor: `${agent.color}50`,
                    }}
                  >
                    <div 
                      className="w-5 h-3.5 border rounded-xs flex items-center justify-center"
                      style={{ backgroundColor: '#05070C', borderColor: agent.color }}
                    >
                      <div 
                        className="w-2.5 h-0.5 animate-pulse"
                        style={{ backgroundColor: agent.color }}
                      />
                    </div>
                    <div 
                      className="w-5 h-3.5 border rounded-xs"
                      style={{ backgroundColor: '#05070C', borderColor: `${agent.color}60` }}
                    />
                  </div>
                </div>

                {/* Footer Telemetry */}
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 z-10 pt-1.5 border-t border-[#1E2538]">
                  <span className="truncate max-w-[90px]">{agent.model}</span>
                  <span 
                    className="font-bold flex items-center gap-1"
                    style={{ color: agent.state === 'ERROR' ? '#EF4444' : '#10B981' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                    {agent.state}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
