import React, { useState } from 'react';
import {
  Minus,
  Square,
  Maximize2,
  X,
  Bell,
  Search,
  Settings,
  Plus,
  Volume2,
  VolumeX,
  Languages,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { TeamId } from '../../types';
import { sound } from '../../services/soundEngine';

export const DesktopFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    language,
    setLanguage,
    t,
    activeTeam,
    setActiveTeam,
    setIsNotificationOpen,
    setIsSettingsOpen,
    setIsSearchOpen,
    isSoundMuted,
    toggleSound,
    stats,
  } = useWorkspace();

  const [isMaximized, setIsMaximized] = useState(false);

  const teams: { id: TeamId; label: string; count: number }[] = [
    { id: 'PRODUCT', label: t.teamProduct, count: 8 },
    { id: 'MARKETING', label: t.teamMarketing, count: 5 },
    { id: 'SUPPORT', label: t.teamSupport, count: 5 },
  ];

  const handleMaximize = () => {
    sound.playClick();
    setIsMaximized(!isMaximized);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleToggleLanguage = () => {
    sound.playClick();
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0E1017] text-slate-200 select-none overflow-hidden font-mono antialiased">
      {/* Top Header Bar Matching Muratify with Shaz Vision Identity */}
      <header className="h-11 bg-[#131620] border-b border-[#232838] px-3 flex items-center justify-between gap-4 shrink-0 z-40">
        {/* Left: macOS window controls + Logo Text + BETA Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            <button
              onClick={() => sound.playClick()}
              title="Close window"
              className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 active:scale-90 transition-transform flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-[#4A0000] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => sound.playClick()}
              title="Minimize window"
              className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 active:scale-90 transition-transform flex items-center justify-center group"
            >
              <Minus className="w-2 h-2 text-[#5B3E00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleMaximize}
              title="Maximize / Fullscreen"
              className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-110 active:scale-90 transition-transform flex items-center justify-center group"
            >
              {isMaximized ? (
                <Square className="w-1.5 h-1.5 text-[#004A10] opacity-0 group-hover:opacity-100 transition-opacity" />
              ) : (
                <Maximize2 className="w-2 h-2 text-[#004A10] opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>

          <div
            onClick={() => {
              sound.playClick();
              setIsSearchOpen(true);
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="font-bold text-sm text-slate-100 tracking-wide">
              Shaz Vision <span className="text-purple-400">AI Workspace</span>
            </span>

            {/* BETA Badge */}
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-500/40 font-bold uppercase tracking-wider">
              {t.beta}
            </span>
          </div>
        </div>

        {/* Center: Team switcher pills */}
        <div className="flex items-center gap-1.5 bg-[#0A0D14] p-1 rounded-lg border border-[#232838]">
          {teams.map((tItem) => {
            const isActive = activeTeam === tItem.id;
            return (
              <button
                key={tItem.id}
                onClick={() => setActiveTeam(tItem.id)}
                className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#7C3AED] text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A2030]'
                }`}
              >
                <span>{tItem.label}</span>
                <span className={`text-[9px] px-1 rounded ${isActive ? 'bg-purple-900/60' : 'bg-slate-800'}`}>
                  {tItem.count}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => {
              sound.playClick();
              setIsSettingsOpen(true);
            }}
            className="px-2 py-1 text-[11px] text-slate-500 hover:text-slate-300 font-mono flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>{t.addTeam}</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* TR / EN Language Switcher Button */}
          <button
            onClick={handleToggleLanguage}
            title="Dili Değiştir / Switch Language (TR / EN)"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#0A0D14] hover:bg-[#1C2234] text-slate-300 border border-[#232838] text-xs font-bold font-mono transition-colors"
          >
            <Languages className="w-3 h-3 text-cyan-400" />
            <span className={language === 'tr' ? 'text-purple-400 font-bold' : 'text-slate-500'}>TR</span>
            <span className="text-slate-600">/</span>
            <span className={language === 'en' ? 'text-purple-400 font-bold' : 'text-slate-500'}>EN</span>
          </button>

          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            title={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'}
            className={`p-1.5 rounded-lg border transition-all ${
              !isSoundMuted
                ? 'bg-purple-950/60 text-purple-300 border-purple-500/40'
                : 'bg-[#131722] text-slate-500 border-[#22283A]'
            }`}
          >
            {isSoundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Notifications button */}
          <div
            onClick={() => {
              sound.playClick();
              setIsNotificationOpen(true);
            }}
            title={t.notifications}
            className="relative cursor-pointer p-1.5 rounded-lg hover:bg-[#1C2234] text-slate-400 hover:text-slate-200 border border-[#232838] transition-colors"
          >
            <Bell className="w-3.5 h-3.5" />
            {stats.unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center shadow-md animate-pulse">
                {stats.unreadNotifications}
              </span>
            )}
          </div>

          {/* Search / Command palette trigger */}
          <button
            onClick={() => {
              sound.playClick();
              setIsSearchOpen(true);
            }}
            title={t.search}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[#0A0D14] hover:bg-[#1A2030] text-slate-400 hover:text-slate-200 border border-[#232838] text-xs transition-colors"
          >
            <Search className="w-3 h-3" />
            <kbd className="text-[9px] text-slate-500 px-1 py-0.2 rounded bg-slate-900 border border-slate-800">
              ⌘K
            </kbd>
          </button>

          {/* User profile */}
          <div
            onClick={() => {
              sound.playClick();
              setIsSettingsOpen(true);
            }}
            title="Supervisor Profile (Berkay Şahin)"
            className="w-7 h-7 rounded-full bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/50 flex items-center justify-center text-xs font-bold text-purple-300 cursor-pointer transition-all hover:scale-105"
          >
            BS
          </div>

          {/* Settings button */}
          <button
            onClick={() => {
              sound.playClick();
              setIsSettingsOpen(true);
            }}
            title={t.settings}
            className="p-1.5 rounded-lg hover:bg-[#1C2234] text-slate-400 hover:text-slate-200 border border-[#232838] transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Multi-Pane Workspace */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#0A0C13]">
        {children}
      </div>
    </div>
  );
};
