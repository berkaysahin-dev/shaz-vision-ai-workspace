import React, { useState } from 'react';
import { Settings, X, Volume2, VolumeX, Key, User, Globe, Check, Sparkles, Download } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';

export const SettingsModal: React.FC = () => {
  const { isSettingsOpen, setIsSettingsOpen, isSoundMuted, toggleSound } = useWorkspace();
  const [supervisorName, setSupervisorName] = useState('Berkay Şahin');
  const [anthropicKey, setAnthropicKey] = useState('sk-ant-api03-••••••••••••••••••••••••');
  const [openaiKey, setOpenaiKey] = useState('sk-proj-••••••••••••••••••••••••');
  const [geminiKey, setGeminiKey] = useState('AIzaSy••••••••••••••••••••••••');
  const [deepseekKey, setDeepseekKey] = useState('sk-ds-••••••••••••••••••••••••');
  const [isSaved, setIsSaved] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsSettingsOpen(false);
    }, 1000);
  };

  const handleExport = () => {
    sound.playClick();
    const data = {
      app: 'Shaz Vision AI Workspace v0.3.0 BETA',
      supervisor: supervisorName,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shaz_vision_workspace_config.json';
    a.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setIsSettingsOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#0F121C] border border-[#262E44] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] font-mono select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#141824] border-b border-[#21283B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Workspace Settings
              </h2>
              <span className="text-[10px] text-slate-400">Shaz Vision AI Workspace v0.3.0 BETA</span>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-[#1E2538]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Supervisor Profile */}
          <div className="p-3.5 rounded-xl bg-[#0A0C13] border border-[#1E2436] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase">
              <User className="w-4 h-4 text-purple-400" />
              <span>Supervisor Authority</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">SUPERVISOR NAME</label>
                <input
                  type="text"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121520] border border-[#262E44] rounded-lg text-xs text-slate-100 outline-none focus:border-purple-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">AUTHORITY LEVEL</label>
                <input
                  type="text"
                  disabled
                  value="Principal Supervisor / Owner"
                  className="w-full px-3 py-2 bg-[#0C0E17] border border-[#1F2536] rounded-lg text-xs text-slate-500 cursor-not-allowed font-mono"
                />
              </div>
            </div>
          </div>

          {/* Sound & Feedback */}
          <div className="p-3.5 rounded-xl bg-[#0A0C13] border border-[#1E2436] flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase">
                {isSoundMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
                <span>8-Bit Retro Audio Synthesizer</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Keyclick bleeps, speaking chimes, and completion fanfares.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => sound.playSuccess()}
                className="px-2.5 py-1 rounded bg-[#161B29] text-[10px] text-slate-300 border border-[#2B354F] hover:bg-[#20273B]"
              >
                Test Chime
              </button>
              <button
                type="button"
                onClick={toggleSound}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  !isSoundMuted
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-[#181D2B] text-slate-400 border border-[#262E44]'
                }`}
              >
                {!isSoundMuted ? 'ENABLED' : 'MUTED'}
              </button>
            </div>
          </div>

          {/* AI Provider API Keys */}
          <div className="p-3.5 rounded-xl bg-[#0A0C13] border border-[#1E2436] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>AI Provider API Keys</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[9px] text-slate-400 block mb-1">ANTHROPIC (Claude 3.5 Sonnet)</label>
                <input
                  type="password"
                  value={anthropicKey}
                  onChange={(e) => setAnthropicKey(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#121520] border border-[#262E44] rounded-lg text-slate-300 outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[9px] text-slate-400 block mb-1">OPENAI (GPT-4o / Codex)</label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#121520] border border-[#262E44] rounded-lg text-slate-300 outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[9px] text-slate-400 block mb-1">GOOGLE AI (Gemini 1.5 Pro)</label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#121520] border border-[#262E44] rounded-lg text-slate-300 outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[9px] text-slate-400 block mb-1">DEEPSEEK (DeepSeek V3 / R1)</label>
                <input
                  type="password"
                  value={deepseekKey}
                  onChange={(e) => setDeepseekKey(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#121520] border border-[#262E44] rounded-lg text-slate-300 outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Telemetry Export */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141926] hover:bg-[#1E2538] text-slate-300 border border-[#262E44] text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Workspace Config</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono transition-all shadow-md active:scale-95"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : null}
              <span>{isSaved ? 'Saved!' : 'Save Preferences'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
