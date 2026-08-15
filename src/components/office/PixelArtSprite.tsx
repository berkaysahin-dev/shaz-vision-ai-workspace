import React, { useState } from 'react';
import { Agent } from '../../types';
import { Activity, Zap, DollarSign } from 'lucide-react';

interface PixelCharacterProps {
  agent: Agent;
  onClick: () => void;
  isSelected?: boolean;
  showSpeech?: boolean;
}

export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  agent,
  onClick,
  isSelected,
  showSpeech,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Render authentic pixel-art face, eyes, hair & clothes based on agent id
  const renderPixelSprite = () => {
    switch (agent.id) {
      case 'nova':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            <rect x="3" y="1" width="10" height="9" fill="#1E293B" rx="1" />
            <rect x="2" y="5" width="1" height="5" fill="#334155" />
            <rect x="13" y="5" width="1" height="5" fill="#334155" />
            
            {/* Hair */}
            <rect x="5" y="3" width="6" height="3" fill="#451A03" />
            <rect x="4" y="4" width="1" height="3" fill="#451A03" />
            <rect x="11" y="4" width="1" height="3" fill="#451A03" />
            
            {/* Face */}
            <rect x="5" y="5" width="6" height="5" fill="#FCD34D" />
            <rect x="6" y="6" width="1" height="1" fill="#000000" />
            <rect x="9" y="6" width="1" height="1" fill="#000000" />
            {/* Mustache */}
            <rect x="6" y="8" width="4" height="1" fill="#451A03" />
            
            {/* Teal Shirt */}
            <rect x="4" y="10" width="8" height="6" fill="#0D9488" />
            <rect x="7" y="10" width="2" height="6" fill="#14B8A6" />
            <rect x="3" y="13" width="2" height="2" fill="#FCD34D" />
            <rect x="11" y="13" width="2" height="2" fill="#FCD34D" />
            
            {/* Chair Base */}
            <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
            <rect x="4" y="18" width="8" height="1.5" fill="#334155" />
          </svg>
        );

      case 'ada':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            <rect x="3" y="1" width="10" height="9" fill="#1E1B4B" rx="1" />
            {/* Grey Hair */}
            <rect x="4" y="2" width="8" height="4" fill="#CBD5E1" />
            <rect x="4" y="4" width="1" height="4" fill="#CBD5E1" />
            <rect x="11" y="4" width="1" height="3" fill="#94A3B8" />
            
            {/* Face & Glasses */}
            <rect x="5" y="5" width="6" height="5" fill="#FED7AA" />
            <rect x="6" y="6" width="1" height="1" fill="#1E293B" />
            <rect x="9" y="6" width="1" height="1" fill="#1E293B" />
            <rect x="5" y="5.5" width="3" height="0.8" fill="#475569" />
            <rect x="8" y="5.5" width="3" height="0.8" fill="#475569" />
            
            {/* Purple Suit */}
            <rect x="4" y="10" width="8" height="6" fill="#6B21A8" />
            <polygon points="7,10 9,10 8,12" fill="#FFFFFF" />
            <rect x="3" y="13" width="2" height="2" fill="#FED7AA" />
            <rect x="11" y="13" width="2" height="2" fill="#FED7AA" />
            
            <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
            <rect x="4" y="18" width="8" height="1.5" fill="#334155" />
          </svg>
        );

      case 'emre':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            <rect x="3" y="1" width="10" height="9" fill="#2E1A0F" rx="1" />
            <rect x="5" y="2" width="6" height="4" fill="#18181B" />
            <rect x="4" y="3" width="1" height="4" fill="#18181B" />
            <rect x="11" y="3" width="1" height="4" fill="#18181B" />
            
            <rect x="5" y="5" width="6" height="5" fill="#FDE68A" />
            <rect x="6" y="6" width="1" height="1" fill="#000000" />
            <rect x="9" y="6" width="1" height="1" fill="#000000" />
            
            <rect x="4" y="10" width="8" height="6" fill="#059669" />
            <rect x="7.5" y="10" width="1" height="4" fill="#10B981" />
            <rect x="3" y="13" width="2" height="2" fill="#FDE68A" />
            <rect x="11" y="13" width="2" height="2" fill="#FDE68A" />
            
            <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
            <rect x="4" y="18" width="8" height="1.5" fill="#475569" />
          </svg>
        );

      case 'kai':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            <rect x="3" y="1" width="10" height="9" fill="#1E293B" rx="1" />
            {/* Orange Cap */}
            <rect x="4" y="2" width="8" height="3" fill="#EA580C" />
            <rect x="3" y="4" width="10" height="1.5" fill="#C2410C" />
            
            <rect x="5" y="5.5" width="6" height="4.5" fill="#FDE68A" />
            <rect x="6" y="7" width="1" height="1" fill="#000000" />
            <rect x="9" y="7" width="1" height="1" fill="#000000" />
            
            <rect x="4" y="10" width="8" height="6" fill="#1D4ED8" />
            <rect x="7" y="10" width="2" height="6" fill="#3B82F6" />
            <rect x="3" y="13" width="2" height="2" fill="#FDE68A" />
            <rect x="11" y="13" width="2" height="2" fill="#FDE68A" />
            
            <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
            <rect x="4" y="18" width="8" height="1.5" fill="#334155" />
          </svg>
        );

      case 'rio':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            <rect x="3" y="1" width="10" height="9" fill="#3F1D38" rx="1" />
            {/* Headphones */}
            <rect x="4" y="1.5" width="8" height="1" fill="#06B6D4" />
            <rect x="3" y="2.5" width="2" height="4" fill="#0891B2" />
            <rect x="11" y="2.5" width="2" height="4" fill="#0891B2" />
            
            <rect x="5" y="2.5" width="6" height="3.5" fill="#EC4899" />
            <rect x="5" y="6" width="6" height="4" fill="#FED7AA" />
            <rect x="6" y="7" width="1" height="1" fill="#000000" />
            <rect x="9" y="7" width="1" height="1" fill="#000000" />
            
            <rect x="4" y="10" width="8" height="6" fill="#BE185D" />
            <rect x="7" y="10" width="2" height="6" fill="#F43F5E" />
            <rect x="3" y="13" width="2" height="2" fill="#FED7AA" />
            <rect x="11" y="13" width="2" height="2" fill="#FED7AA" />
            
            <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
            <rect x="4" y="18" width="8" height="1.5" fill="#334155" />
          </svg>
        );

      case 'lux':
        // Blonde hair, cyan headphones, pink/purple outfit (Room 5 Breakroom Lead)
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            <rect x="3" y="1" width="10" height="9" fill="#2E1065" rx="1" />
            <rect x="4" y="2" width="8" height="3.5" fill="#FACC15" />
            <rect x="3" y="4" width="1" height="4" fill="#EAB308" />
            <rect x="12" y="4" width="1" height="4" fill="#EAB308" />
            
            <rect x="5" y="5.5" width="6" height="4.5" fill="#FED7AA" />
            <rect x="6" y="7" width="1" height="1" fill="#0284C7" />
            <rect x="9" y="7" width="1" height="1" fill="#0284C7" />
            
            <rect x="4" y="10" width="8" height="6" fill="#D946EF" />
            <rect x="7" y="10" width="2" height="6" fill="#F472B6" />
            <rect x="3" y="13" width="2" height="2" fill="#FED7AA" />
            <rect x="11" y="13" width="2" height="2" fill="#FED7AA" />
            
            <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
            <rect x="4" y="18" width="8" height="1.5" fill="#334155" />
          </svg>
        );

      case 'sol':
        // Yellow cyber headset, dark brown hair, yellow matrix outfit
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            <rect x="3" y="1" width="10" height="9" fill="#1C1917" rx="1" />
            <rect x="5" y="2" width="6" height="3" fill="#451A03" />
            <rect x="3" y="4" width="10" height="1.5" fill="#EAB308" />
            
            <rect x="5" y="5.5" width="6" height="4.5" fill="#FDE68A" />
            <rect x="6" y="6.5" width="1" height="1" fill="#00E5FF" />
            <rect x="9" y="6.5" width="1" height="1" fill="#00E5FF" />
            
            <rect x="4" y="10" width="8" height="6" fill="#A16207" />
            <rect x="7" y="10" width="2" height="6" fill="#EAB308" />
            <rect x="3" y="13" width="2" height="2" fill="#FDE68A" />
            <rect x="11" y="13" width="2" height="2" fill="#FDE68A" />
            
            <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
            <rect x="4" y="18" width="8" height="1.5" fill="#334155" />
          </svg>
        );

      case 'max':
      default:
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            <rect x="3" y="1" width="10" height="9" fill="#1E293B" rx="1" />
            <rect x="5" y="2" width="6" height="3" fill="#78350F" />
            <rect x="4" y="3" width="1" height="4" fill="#78350F" />
            <rect x="11" y="3" width="1" height="4" fill="#78350F" />
            
            <rect x="5" y="5" width="6" height="5" fill="#FDE68A" />
            <rect x="6" y="6" width="1" height="1" fill="#000000" />
            <rect x="9" y="6" width="1" height="1" fill="#000000" />
            
            <rect x="4" y="10" width="8" height="6" fill="#F8FAFC" />
            <rect x="7" y="10" width="2" height="6" fill="#94A3B8" />
            <rect x="3" y="13" width="2" height="2" fill="#FDE68A" />
            <rect x="11" y="13" width="2" height="2" fill="#FDE68A" />
            
            <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
            <rect x="4" y="18" width="8" height="1.5" fill="#334155" />
          </svg>
        );
    }
  };

  return (
    <div
      className="relative group inline-block cursor-pointer select-none"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Speech Bubble */}
      {showSpeech && agent.speechBubble && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 px-2 py-0.5 bg-[#FFFFFF] text-[#0F172A] border border-[#0F172A] rounded text-[8px] font-mono font-bold shadow-lg whitespace-nowrap animate-bounce">
          {agent.speechBubble}
        </div>
      )}

      {/* The Sprite with Swivel Chair */}
      <div
        className={`transition-all duration-150 ${
          isSelected
            ? 'scale-110 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]'
            : isHovered
            ? 'scale-110 drop-shadow-[0_0_6px_rgba(0,229,255,0.6)]'
            : 'hover:scale-105'
        }`}
      >
        {renderPixelSprite()}
      </div>

      {/* Mini Agent Badge Tag below character */}
      <div
        className="text-[6px] font-mono font-bold text-center px-1 py-0.2 rounded-xs -mt-0.5 uppercase tracking-wider shadow-sm truncate max-w-[40px] mx-auto"
        style={{
          backgroundColor: `${agent.color}25`,
          border: `1px solid ${agent.color}80`,
          color: agent.color,
        }}
      >
        {agent.name}
      </div>

      {/* =========================================================================
          RICH HOVER TOOLTIP (Shows Tokens, Cost, Action, Model on Mouse Hover)
         ========================================================================= */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 bg-[#090C14]/95 backdrop-blur-md border border-[#2A344D] rounded-xl p-2.5 shadow-2xl font-mono text-left animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-[#1E273A]">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shadow-sm"
                style={{ backgroundColor: agent.color }}
              />
              <span className="font-bold text-xs text-slate-100">{agent.name}</span>
            </div>
            <span className="text-[8px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
              {agent.model}
            </span>
          </div>

          {/* Role & Dept */}
          <div className="text-[9px] text-slate-400 mt-1">{agent.role} · {agent.department}</div>

          {/* Real-time Token & Cost Telemetry */}
          <div className="grid grid-cols-2 gap-1.5 my-2 p-1.5 bg-[#06080F] rounded-lg border border-[#182030]">
            <div className="text-[9px]">
              <div className="text-slate-500 text-[8px]">USED TOKENS</div>
              <div className="font-bold text-cyan-300 flex items-center gap-0.5">
                <Zap className="w-2.5 h-2.5" />
                <span>{(agent.tokens / 1000).toFixed(1)}k tokens</span>
              </div>
            </div>

            <div className="text-[9px]">
              <div className="text-slate-500 text-[8px]">TOTAL COST</div>
              <div className="font-bold text-emerald-400 flex items-center gap-0.5">
                <DollarSign className="w-2.5 h-2.5" />
                <span>${agent.cost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Current Live Action */}
          <div className="text-[9px] text-slate-300">
            <div className="text-slate-500 text-[8px]">CURRENT ACTION</div>
            <div className="text-cyan-400 truncate flex items-center gap-1 mt-0.5">
              <Activity className="w-2.5 h-2.5 shrink-0 animate-pulse" />
              <span className="truncate">{agent.currentAction}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
