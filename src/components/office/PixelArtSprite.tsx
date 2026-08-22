import React, { useState } from 'react';
import { Agent, AgentId } from '../../types';
import { Activity, Zap, DollarSign, Sparkles, Coffee, Flame, ShieldAlert, Laptop } from 'lucide-react';

interface PixelCharacterProps {
  agent: Agent;
  onClick: () => void;
  isSelected?: boolean;
  showSpeech?: boolean;
  isWalking?: boolean;
}

export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  agent,
  onClick,
  isSelected,
  showSpeech,
  isWalking = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Render accessories (Visor, Glasses, Headphones, Hacker Mask, Party Hat, Beret)
  const renderAccessory = (acc?: string) => {
    switch (acc) {
      case 'visor':
        return (
          <g className="animate-pulse">
            <rect x="4" y="5.5" width="8" height="2" fill="#00FFFF" opacity="0.9" />
            <rect x="5" y="6" width="6" height="1" fill="#FFFFFF" />
          </g>
        );
      case 'glasses':
        return (
          <g>
            <rect x="4.5" y="5.5" width="3" height="2.5" fill="none" stroke="#1E293B" strokeWidth="0.8" />
            <rect x="8.5" y="5.5" width="3" height="2.5" fill="none" stroke="#1E293B" strokeWidth="0.8" />
            <line x1="7.5" y1="6.5" x2="8.5" y2="6.5" stroke="#1E293B" strokeWidth="0.8" />
          </g>
        );
      case 'headphones':
        return (
          <g>
            <rect x="4" y="1" width="8" height="1.2" fill="#F97316" />
            <rect x="3" y="2" width="2" height="5" fill="#EA580C" rx="0.5" />
            <rect x="11" y="2" width="2" height="5" fill="#EA580C" rx="0.5" />
          </g>
        );
      case 'hacker-mask':
        return (
          <g>
            <rect x="4" y="7" width="8" height="3" fill="#0F172A" />
            <rect x="5" y="7.5" width="2" height="1" fill="#10B981" />
            <rect x="9" y="7.5" width="2" height="1" fill="#10B981" />
          </g>
        );
      case 'party-hat':
        return (
          <polygon points="8,0 5,4 11,4" fill="#EC4899" stroke="#BE185D" strokeWidth="0.5" />
        );
      case 'beret':
        return (
          <g>
            <rect x="3" y="1.5" width="10" height="2" fill="#F43F5E" rx="1" />
            <rect x="7.5" y="0.5" width="1" height="1" fill="#BE185D" />
          </g>
        );
      default:
        return null;
    }
  };

  // Render Robotic / Pixel Pet companion
  const renderPet = (pet?: string) => {
    switch (pet) {
      case 'cyber-cat':
        return (
          <div className="absolute -bottom-1 -right-3 pointer-events-none group-hover:animate-bounce">
            <svg viewBox="0 0 10 10" className="w-3.5 h-3.5 image-pixelated">
              <rect x="2" y="4" width="6" height="4" fill="#8B5CF6" />
              <polygon points="2,4 2,2 4,4" fill="#A78BFA" />
              <polygon points="6,4 8,2 8,4" fill="#A78BFA" />
              <rect x="3" y="5" width="1" height="1" fill="#34D399" />
              <rect x="6" y="5" width="1" height="1" fill="#34D399" />
              <rect x="7" y="6" width="2" height="1" fill="#8B5CF6" className="animate-wiggle" />
            </svg>
          </div>
        );
      case 'pixel-dog':
        return (
          <div className="absolute -bottom-1 -right-3 pointer-events-none">
            <svg viewBox="0 0 10 10" className="w-3.5 h-3.5 image-pixelated">
              <rect x="2" y="4" width="6" height="4" fill="#F59E0B" />
              <rect x="1" y="3" width="2" height="2" fill="#B45309" />
              <rect x="7" y="3" width="2" height="2" fill="#B45309" />
              <rect x="3" y="5" width="1" height="1" fill="#000" />
              <rect x="6" y="5" width="1" height="1" fill="#000" />
              <rect x="4.5" y="6" width="1" height="1" fill="#DC2626" />
            </svg>
          </div>
        );
      case 'mini-drone':
        return (
          <div className="absolute -top-3 -left-2 pointer-events-none animate-float">
            <svg viewBox="0 0 10 8" className="w-3 h-2.5 image-pixelated">
              <rect x="3" y="3" width="4" height="3" fill="#06B6D4" rx="0.5" />
              <line x1="1" y1="2" x2="9" y2="2" stroke="#64748B" strokeWidth="0.8" />
              <rect x="4.5" y="4" width="1" height="1" fill="#22D3EE" className="animate-pulse" />
            </svg>
          </div>
        );
      case 'rubber-duck':
        return (
          <div className="absolute -bottom-1 -left-2 pointer-events-none">
            <svg viewBox="0 0 8 8" className="w-2.5 h-2.5 image-pixelated">
              <rect x="2" y="3" width="4" height="4" fill="#FBBF24" rx="1" />
              <rect x="1" y="4" width="2" height="1" fill="#F97316" />
              <rect x="3" y="3" width="1" height="1" fill="#000" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  // Render authentic pixel-art character
  const renderPixelSprite = () => {
    const shirtColor = agent.customOutfitColor || null;

    switch (agent.id) {
      case 'nova':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            {!isWalking && <rect x="3" y="1" width="10" height="9" fill="#1E293B" rx="1" />}
            <rect x="5" y="3" width="6" height="3" fill="#451A03" />
            <rect x="4" y="4" width="1" height="3" fill="#451A03" />
            <rect x="11" y="4" width="1" height="3" fill="#451A03" />
            <rect x="5" y="5" width="6" height="5" fill="#FCD34D" />
            <rect x="6" y="6" width="1" height="1" fill="#000000" />
            <rect x="9" y="6" width="1" height="1" fill="#000000" />
            <rect x="6" y="8" width="4" height="1" fill="#451A03" />
            <rect x="4" y="10" width="8" height="6" fill={shirtColor || '#0D9488'} />
            <rect x="7" y="10" width="2" height="6" fill="#14B8A6" />
            <rect x="3" y="13" width="2" height="2" fill="#FCD34D" />
            <rect x="11" y="13" width="2" height="2" fill="#FCD34D" />
            {renderAccessory(agent.accessory)}
            {isWalking ? (
              <>
                <rect x="5" y="16" width="2" height="4" fill="#0F172A" />
                <rect x="9" y="16" width="2" height="4" fill="#0F172A" />
              </>
            ) : (
              <>
                <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
                <rect x="4" y="18" width="8" height="1.5" fill="#334155" />
              </>
            )}
          </svg>
        );

      case 'ada':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            {!isWalking && <rect x="3" y="1" width="10" height="9" fill="#1E1B4B" rx="1" />}
            <rect x="4" y="2" width="8" height="4" fill="#CBD5E1" />
            <rect x="4" y="4" width="1" height="4" fill="#CBD5E1" />
            <rect x="11" y="4" width="1" height="3" fill="#94A3B8" />
            <rect x="5" y="5" width="6" height="5" fill="#FED7AA" />
            <rect x="6" y="6" width="1" height="1" fill="#1E293B" />
            <rect x="9" y="6" width="1" height="1" fill="#1E293B" />
            <rect x="4" y="10" width="8" height="6" fill={shirtColor || '#6B21A8'} />
            <polygon points="7,10 9,10 8,12" fill="#FFFFFF" />
            <rect x="3" y="13" width="2" height="2" fill="#FED7AA" />
            <rect x="11" y="13" width="2" height="2" fill="#FED7AA" />
            {renderAccessory(agent.accessory || 'glasses')}
            {isWalking ? (
              <>
                <rect x="5" y="16" width="2" height="4" fill="#1E1B4B" />
                <rect x="9" y="16" width="2" height="4" fill="#1E1B4B" />
              </>
            ) : (
              <>
                <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
                <rect x="4" y="18" width="8" height="1.5" fill="#334155" />
              </>
            )}
          </svg>
        );

      case 'vesper':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            {!isWalking && <rect x="3" y="1" width="10" height="9" fill="#2E1065" rx="1" />}
            {/* White/Silver Cyber Hairstyle */}
            <rect x="4" y="1.5" width="8" height="3" fill="#E2E8F0" />
            <rect x="3" y="3" width="2" height="4" fill="#CBD5E1" />
            <rect x="11" y="3" width="2" height="3" fill="#CBD5E1" />
            <rect x="5" y="5" width="6" height="5" fill="#FCE7F3" />
            <rect x="4" y="10" width="8" height="6" fill={shirtColor || '#7C3AED'} />
            <rect x="6" y="10" width="4" height="3" fill="#06B6D4" />
            <rect x="3" y="13" width="2" height="2" fill="#FCE7F3" />
            <rect x="11" y="13" width="2" height="2" fill="#FCE7F3" />
            {renderAccessory(agent.accessory || 'visor')}
            {isWalking ? (
              <>
                <rect x="5" y="16" width="2" height="4" fill="#4C1D95" />
                <rect x="9" y="16" width="2" height="4" fill="#4C1D95" />
              </>
            ) : (
              <>
                <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
                <rect x="4" y="18" width="8" height="1.5" fill="#6B21A8" />
              </>
            )}
          </svg>
        );

      case 'atlas':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            {!isWalking && <rect x="3" y="1" width="10" height="9" fill="#431407" rx="1" />}
            {/* Orange Hoodie & Hair */}
            <rect x="4" y="2" width="8" height="3" fill="#78350F" />
            <rect x="5" y="5" width="6" height="5" fill="#FDE68A" />
            <rect x="6" y="6.5" width="1" height="1" fill="#000" />
            <rect x="9" y="6.5" width="1" height="1" fill="#000" />
            <rect x="4" y="10" width="8" height="6" fill={shirtColor || '#EA580C'} />
            <rect x="7" y="10" width="2" height="5" fill="#F97316" />
            <rect x="3" y="13" width="2" height="2" fill="#FDE68A" />
            <rect x="11" y="13" width="2" height="2" fill="#FDE68A" />
            {renderAccessory(agent.accessory || 'headphones')}
            {isWalking ? (
              <>
                <rect x="5" y="16" width="2" height="4" fill="#1C1917" />
                <rect x="9" y="16" width="2" height="4" fill="#1C1917" />
              </>
            ) : (
              <>
                <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
                <rect x="4" y="18" width="8" height="1.5" fill="#44403C" />
              </>
            )}
          </svg>
        );

      case 'nyx':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            {!isWalking && <rect x="3" y="1" width="10" height="9" fill="#064E3B" rx="1" />}
            {/* Dark Hood */}
            <rect x="4" y="1" width="8" height="4" fill="#0F172A" />
            <rect x="3" y="3" width="2" height="6" fill="#0F172A" />
            <rect x="11" y="3" width="2" height="6" fill="#0F172A" />
            <rect x="5" y="5" width="6" height="4" fill="#1E293B" />
            <rect x="6" y="6" width="1" height="1" fill="#10B981" className="animate-pulse" />
            <rect x="9" y="6" width="1" height="1" fill="#10B981" className="animate-pulse" />
            <rect x="4" y="10" width="8" height="6" fill={shirtColor || '#047857'} />
            <rect x="7" y="10" width="2" height="6" fill="#059669" />
            <rect x="3" y="13" width="2" height="2" fill="#10B981" />
            <rect x="11" y="13" width="2" height="2" fill="#10B981" />
            {renderAccessory(agent.accessory || 'hacker-mask')}
            {isWalking ? (
              <>
                <rect x="5" y="16" width="2" height="4" fill="#064E3B" />
                <rect x="9" y="16" width="2" height="4" fill="#064E3B" />
              </>
            ) : (
              <>
                <rect x="7" y="16" width="2" height="3" fill="#022C22" />
                <rect x="4" y="18" width="8" height="1.5" fill="#0F172A" />
              </>
            )}
          </svg>
        );

      case 'echo':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            {!isWalking && <rect x="3" y="1" width="10" height="9" fill="#164E63" rx="1" />}
            <rect x="4" y="2" width="8" height="3" fill="#0E7490" />
            <rect x="5" y="5" width="6" height="5" fill="#FEF08A" />
            <rect x="6" y="6" width="1" height="1" fill="#0891B2" />
            <rect x="9" y="6" width="1" height="1" fill="#0891B2" />
            <rect x="4" y="10" width="8" height="6" fill={shirtColor || '#0284C7'} />
            <rect x="7" y="10" width="2" height="6" fill="#38BDF8" />
            <rect x="3" y="13" width="2" height="2" fill="#FEF08A" />
            <rect x="11" y="13" width="2" height="2" fill="#FEF08A" />
            {renderAccessory(agent.accessory || 'glasses')}
            {isWalking ? (
              <>
                <rect x="5" y="16" width="2" height="4" fill="#0C4A6E" />
                <rect x="9" y="16" width="2" height="4" fill="#0C4A6E" />
              </>
            ) : (
              <>
                <rect x="7" y="16" width="2" height="3" fill="#082F49" />
                <rect x="4" y="18" width="8" height="1.5" fill="#0284C7" />
              </>
            )}
          </svg>
        );

      case 'zoe':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            {!isWalking && <rect x="3" y="1" width="10" height="9" fill="#831843" rx="1" />}
            {/* Beret & Pink Hair */}
            <rect x="3" y="1.5" width="10" height="2" fill="#F43F5E" rx="1" />
            <rect x="4" y="3.5" width="8" height="3" fill="#FB7185" />
            <rect x="5" y="6" width="6" height="4" fill="#FDE68A" />
            <rect x="6" y="7" width="1" height="1" fill="#881337" />
            <rect x="9" y="7" width="1" height="1" fill="#881337" />
            <rect x="4" y="10" width="8" height="6" fill={shirtColor || '#E11D48'} />
            <rect x="7" y="10" width="2" height="6" fill="#FDA4AF" />
            <rect x="3" y="13" width="2" height="2" fill="#FDE68A" />
            <rect x="11" y="13" width="2" height="2" fill="#FDE68A" />
            {renderAccessory(agent.accessory || 'beret')}
            {isWalking ? (
              <>
                <rect x="5" y="16" width="2" height="4" fill="#4C0519" />
                <rect x="9" y="16" width="2" height="4" fill="#4C0519" />
              </>
            ) : (
              <>
                <rect x="7" y="16" width="2" height="3" fill="#4C0519" />
                <rect x="4" y="18" width="8" height="1.5" fill="#BE123C" />
              </>
            )}
          </svg>
        );

      case 'deniz':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            {!isWalking && <rect x="3" y="1" width="10" height="9" fill="#0C4A6E" rx="1" />}
            {/* Navy Hair & Headset */}
            <rect x="4" y="2" width="8" height="3" fill="#0369A1" />
            <rect x="5" y="5" width="6" height="5" fill="#FEF3C7" />
            <rect x="6" y="6.5" width="1" height="1" fill="#0369A1" />
            <rect x="9" y="6.5" width="1" height="1" fill="#0369A1" />
            <rect x="4" y="10" width="8" height="6" fill={shirtColor || '#0284C7'} />
            <rect x="7" y="10" width="2" height="6" fill="#38BDF8" />
            <rect x="3" y="13" width="2" height="2" fill="#FEF3C7" />
            <rect x="11" y="13" width="2" height="2" fill="#FEF3C7" />
            {renderAccessory(agent.accessory || 'headphones')}
            {isWalking ? (
              <>
                <rect x="5" y="16" width="2" height="4" fill="#075985" />
                <rect x="9" y="16" width="2" height="4" fill="#075985" />
              </>
            ) : (
              <>
                <rect x="7" y="16" width="2" height="3" fill="#075985" />
                <rect x="4" y="18" width="8" height="1.5" fill="#38BDF8" />
              </>
            )}
          </svg>
        );

      case 'selin':
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            {!isWalking && <rect x="3" y="1" width="10" height="9" fill="#365314" rx="1" />}
            {/* Blonde Bob & Lime Shirt */}
            <rect x="4" y="2" width="8" height="3" fill="#FDE047" />
            <rect x="3" y="4" width="2" height="4" fill="#EAB308" />
            <rect x="11" y="4" width="2" height="4" fill="#EAB308" />
            <rect x="5" y="5" width="6" height="5" fill="#FEF08A" />
            <rect x="6" y="6" width="1" height="1" fill="#14532D" />
            <rect x="9" y="6" width="1" height="1" fill="#14532D" />
            <rect x="4" y="10" width="8" height="6" fill={shirtColor || '#84CC16'} />
            <rect x="7" y="10" width="2" height="6" fill="#A3E635" />
            <rect x="3" y="13" width="2" height="2" fill="#FEF08A" />
            <rect x="11" y="13" width="2" height="2" fill="#FEF08A" />
            {renderAccessory(agent.accessory || 'glasses')}
            {isWalking ? (
              <>
                <rect x="5" y="16" width="2" height="4" fill="#1A2E05" />
                <rect x="9" y="16" width="2" height="4" fill="#1A2E05" />
              </>
            ) : (
              <>
                <rect x="7" y="16" width="2" height="3" fill="#1A2E05" />
                <rect x="4" y="18" width="8" height="1.5" fill="#65A30D" />
              </>
            )}
          </svg>
        );

      // Default generic / remaining agents
      default:
        return (
          <svg viewBox="0 0 16 20" className="w-6 h-8 image-pixelated">
            {!isWalking && <rect x="3" y="1" width="10" height="9" fill="#1E293B" rx="1" />}
            <rect x="4" y="2" width="8" height="3" fill="#475569" />
            <rect x="5" y="5" width="6" height="5" fill="#FDE68A" />
            <rect x="6" y="6" width="1" height="1" fill="#000" />
            <rect x="9" y="6" width="1" height="1" fill="#000" />
            <rect x="4" y="10" width="8" height="6" fill={shirtColor || agent.color} />
            <rect x="7" y="10" width="2" height="6" fill="#FFFFFF" opacity="0.3" />
            <rect x="3" y="13" width="2" height="2" fill="#FDE68A" />
            <rect x="11" y="13" width="2" height="2" fill="#FDE68A" />
            {renderAccessory(agent.accessory)}
            {isWalking ? (
              <>
                <rect x="5" y="16" width="2" height="4" fill="#0F172A" />
                <rect x="9" y="16" width="2" height="4" fill="#0F172A" />
              </>
            ) : (
              <>
                <rect x="7" y="16" width="2" height="3" fill="#0F172A" />
                <rect x="4" y="18" width="8" height="1.5" fill="#334155" />
              </>
            )}
          </svg>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center cursor-pointer select-none group"
    >
      {/* Speech Bubble on Hover or when showSpeech is true */}
      {(showSpeech || isHovered) && agent.speechBubble && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 px-2 py-0.5 bg-[#FFFFFF] text-[#0F172A] border border-[#0F172A] rounded-md text-[8px] font-mono font-bold shadow-lg whitespace-nowrap animate-bounce">
          {agent.speechBubble}
        </div>
      )}

      {/* Special Animation Effects Overlay */}
      {agent.state === 'CELEBRATING' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-yellow-300 animate-spin text-[10px] pointer-events-none">
          ✨
        </div>
      )}
      {agent.state === 'ALERT' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 animate-ping pointer-events-none" />
      )}
      {agent.state === 'FOCUS' && (
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xs animate-pulse pointer-events-none" />
      )}

      {/* The Sprite with Swivel Chair or Walking Legs */}
      <div
        className={`transition-all duration-150 relative ${
          isSelected
            ? 'scale-110 drop-shadow-[0_0_8px_rgba(224,86,76,0.8)]'
            : isHovered
            ? 'scale-110 drop-shadow-[0_0_6px_rgba(0,229,255,0.6)]'
            : 'hover:scale-105'
        }`}
      >
        {renderPixelSprite()}
        {renderPet(agent.pet)}
      </div>

      {/* Mini Agent Badge Tag below character */}
      <div
        className="text-[7px] font-mono font-bold text-center px-1.5 py-0.5 rounded -mt-0.5 uppercase tracking-wider shadow-sm truncate max-w-[50px] mx-auto"
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
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-60 bg-[#090C14]/95 backdrop-blur-md border border-[#2A344D] rounded-xl p-2.5 shadow-2xl font-mono text-left animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-[#1E273A]">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shadow-sm"
                style={{ backgroundColor: agent.color }}
              />
              <span className="font-bold text-xs text-slate-100">{agent.name}</span>
              {agent.level && (
                <span className="text-[8px] px-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-bold">
                  LVL {agent.level}
                </span>
              )}
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
