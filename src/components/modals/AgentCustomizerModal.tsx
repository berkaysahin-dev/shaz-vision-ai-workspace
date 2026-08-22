import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { AgentId, AccessoryType, PetType, DeskItemType, AgentState } from '../../types';
import { sound } from '../../services/soundEngine';
import { PixelCharacter } from '../office/PixelArtSprite';
import { 
  X, 
  Sparkles, 
  Palette, 
  Glasses, 
  Cat, 
  Coffee, 
  Laptop, 
  Play, 
  Check, 
  Flame, 
  ShieldAlert,
  Zap,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AgentCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_PALETTES = [
  '#0D9488', // Teal
  '#6B21A8', // Purple
  '#7C3AED', // Violet
  '#EA580C', // Orange
  '#047857', // Emerald
  '#0284C7', // Cyan
  '#E11D48', // Pink
  '#F59E0B', // Amber
  '#3B82F6', // Blue
  '#1E293B', // Stealth Black
];

const ACCESSORIES: { id: AccessoryType; label: string; icon: string }[] = [
  { id: 'none', label: 'None', icon: '❌' },
  { id: 'visor', label: 'Cyber Visor', icon: '🕶️' },
  { id: 'glasses', label: 'Smart Specs', icon: '👓' },
  { id: 'headphones', label: 'RGB Headset', icon: '🎧' },
  { id: 'hacker-mask', label: 'Hacker Mask', icon: '🥷' },
  { id: 'party-hat', label: 'Party Hat', icon: '🥳' },
  { id: 'beret', label: 'Artist Beret', icon: '🎨' },
];

const PETS: { id: PetType; label: string; icon: string }[] = [
  { id: 'none', label: 'None', icon: '❌' },
  { id: 'cyber-cat', label: 'Cyber Cat', icon: '🐱' },
  { id: 'pixel-dog', label: 'Pixel Dog', icon: '🐶' },
  { id: 'mini-drone', label: 'Mini Drone', icon: '🛸' },
  { id: 'rubber-duck', label: 'Rubber Duck', icon: '🦆' },
];

const ANIMATIONS: { state: AgentState; label: string; emoji: string }[] = [
  { state: 'WORKING', label: 'Standard Coding', emoji: '💻' },
  { state: 'FOCUS', label: 'Deep Focus Flow', emoji: '⚡' },
  { state: 'COFFEE', label: 'Coffee Sip', emoji: '☕' },
  { state: 'CELEBRATING', label: 'Victory Party', emoji: '🎉' },
  { state: 'ALERT', label: 'Bug Alert Flare', emoji: '🚨' },
];

export const AgentCustomizerModal: React.FC<AgentCustomizerModalProps> = ({ isOpen, onClose }) => {
  const { agents, selectedAgentId, setSelectedAgentId, updateAgentCustomization } = useWorkspace();
  const [activeTab, setActiveTab] = useState<'wardrobe' | 'pets' | 'animations'>('wardrobe');

  if (!isOpen) return null;

  const currentAgentId: AgentId = selectedAgentId || 'nova';
  const currentAgent = agents[currentAgentId] || agents.nova;

  const handleColorSelect = (color: string) => {
    sound.playClick();
    updateAgentCustomization(currentAgentId, { customOutfitColor: color });
  };

  const handleAccessorySelect = (acc: AccessoryType) => {
    sound.playClick();
    updateAgentCustomization(currentAgentId, { accessory: acc });
  };

  const handlePetSelect = (pet: PetType) => {
    sound.playClick();
    updateAgentCustomization(currentAgentId, { pet: pet });
  };

  const handleAnimationTrigger = (state: AgentState) => {
    sound.playSuccess();
    if (state === 'CELEBRATING') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    updateAgentCustomization(currentAgentId, { state });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0D1019] border border-[#263147] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E273A] bg-[#111624]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                PIXEL ART CHARACTER STUDIO & WARDROBE
              </h2>
              <p className="text-[11px] text-slate-400">
                Customize outfits, accessories, pets and animation states for your AI crew
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Agent Selector + Live Preview + Customization Controls */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* Left Column: Agent Selector List */}
          <div className="w-full md:w-56 border-r border-[#1E273A] bg-[#0A0D15] p-3 overflow-y-auto max-h-56 md:max-h-none custom-scrollbar">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 px-1">
              SELECT AI AGENT
            </div>
            <div className="space-y-1">
              {Object.values(agents).map((agent) => {
                const isSelected = agent.id === currentAgentId;
                return (
                  <button
                    key={agent.id}
                    onClick={() => { sound.playClick(); setSelectedAgentId(agent.id); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-purple-950/80 border border-purple-500/60 text-white shadow-md'
                        : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: agent.color }}
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold truncate">{agent.name}</div>
                      <div className="text-[9px] text-slate-500 truncate">{agent.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: Live 3x Pixel Sprite Canvas */}
          <div className="w-full md:w-64 bg-[#080A10] p-6 flex flex-col items-center justify-between border-r border-[#1E273A] relative">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              LIVE PREVIEW
            </div>

            {/* Enlarged 3D Pixel Pedestal */}
            <div className="my-auto flex flex-col items-center relative py-6">
              <div className="scale-[2.5] my-4 transition-transform duration-200">
                <PixelCharacter
                  agent={currentAgent}
                  onClick={() => sound.playClick()}
                  isSelected={true}
                  showSpeech={true}
                />
              </div>

              {/* Pedestal Base */}
              <div className="w-28 h-4 rounded-full bg-gradient-to-r from-purple-500/20 via-cyan-500/30 to-purple-500/20 blur-xs mt-2" />
            </div>

            <div className="w-full p-2.5 bg-[#0D1019] rounded-xl border border-[#1E273A] text-center text-[10px]">
              <span className="text-slate-400">Current Action: </span>
              <span className="text-cyan-400 font-bold">{currentAgent.currentAction}</span>
            </div>
          </div>

          {/* Right Column: Customization Controls & Tabs */}
          <div className="flex-1 flex flex-col bg-[#0D1019] p-4 min-h-0 overflow-y-auto custom-scrollbar">
            {/* Customization Tabs */}
            <div className="flex items-center gap-1 bg-[#090C14] p-1 rounded-xl border border-[#1E273A] mb-4">
              <button
                onClick={() => { sound.playClick(); setActiveTab('wardrobe'); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'wardrobe' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                Wardrobe
              </button>
              <button
                onClick={() => { sound.playClick(); setActiveTab('pets'); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'pets' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cat className="w-3.5 h-3.5" />
                Pets & Companions
              </button>
              <button
                onClick={() => { sound.playClick(); setActiveTab('animations'); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'animations' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Animations
              </button>
            </div>

            {/* TAB 1: WARDROBE & COLOR SWATCHES */}
            {activeTab === 'wardrobe' && (
              <div className="space-y-4">
                {/* Outfit Color Palette */}
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
                    OUTFIT / SHIRT COLOR
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {COLOR_PALETTES.map((color) => {
                      const isChosen = currentAgent.customOutfitColor === color;
                      return (
                        <button
                          key={color}
                          onClick={() => handleColorSelect(color)}
                          className={`h-8 rounded-lg flex items-center justify-center transition-transform hover:scale-105 border ${
                            isChosen ? 'border-white ring-2 ring-purple-500 scale-105' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                        >
                          {isChosen && <Check className="w-4 h-4 text-white drop-shadow" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
                    CYBER ACCESSORIES & HEADWEAR
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {ACCESSORIES.map((acc) => {
                      const isChosen = currentAgent.accessory === acc.id || (!currentAgent.accessory && acc.id === 'none');
                      return (
                        <button
                          key={acc.id}
                          onClick={() => handleAccessorySelect(acc.id)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                            isChosen
                              ? 'bg-purple-950/80 border-purple-500 text-white shadow-md'
                              : 'bg-[#090C14] border-[#1E273A] text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-base">{acc.icon}</span>
                          <span>{acc.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PETS & COMPANIONS */}
            {activeTab === 'pets' && (
              <div className="space-y-3">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  ROBOTIC & OFFICE PETS
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {PETS.map((pet) => {
                    const isChosen = currentAgent.pet === pet.id || (!currentAgent.pet && pet.id === 'none');
                    return (
                      <button
                        key={pet.id}
                        onClick={() => handlePetSelect(pet.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          isChosen
                            ? 'bg-purple-950/80 border-purple-500 text-white shadow-md'
                            : 'bg-[#090C14] border-[#1E273A] text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xl">{pet.icon}</span>
                        <div>
                          <div>{pet.label}</div>
                          <div className="text-[9px] text-slate-500 font-normal">Desk Companion</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: ANIMATIONS & EMOTES */}
            {activeTab === 'animations' && (
              <div className="space-y-3">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  TRIGGER LIVE AGENT ANIMATION / EMOTE
                </label>
                <div className="space-y-2">
                  {ANIMATIONS.map((anim) => (
                    <button
                      key={anim.state}
                      onClick={() => handleAnimationTrigger(anim.state)}
                      className="w-full flex items-center justify-between p-3 bg-[#090C14] hover:bg-slate-900 border border-[#1E273A] hover:border-purple-500 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{anim.emoji}</span>
                        <span>{anim.label}</span>
                      </div>
                      <Play className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-3 border-t border-[#1E273A] bg-[#111624]">
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
