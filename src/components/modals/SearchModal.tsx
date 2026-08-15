import React, { useState } from 'react';
import { Search, X, Terminal, Users, CheckSquare, FileCode, ArrowRight } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, agents, tasks, codeFiles, setSelectedAgentId, setCenterTab, setRightTab, language } = useWorkspace();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const handleClose = () => {
    sound.playClick();
    setIsSearchOpen(false);
  };

  const handleSelectAgent = (agentId: string) => {
    sound.playClick();
    setSelectedAgentId(agentId as any);
    setIsSearchOpen(false);
  };

  const handleSelectTask = () => {
    sound.playClick();
    setRightTab('tasks');
    setIsSearchOpen(false);
  };

  const handleSelectCode = () => {
    sound.playClick();
    setCenterTab('code');
    setIsSearchOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-20 p-4 select-none font-mono"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 text-slate-300"
        style={{
          backgroundColor: 'var(--app-bg-panel, #0E1119)',
          borderColor: 'var(--app-border, #222736)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          className="h-12 border-b px-4 flex items-center gap-3 shrink-0"
          style={{ borderColor: 'var(--app-border, #1E2333)' }}
        >
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'tr' ? 'Ajan, görev, dosya veya komut arayın (⌘K)...' : 'Search agents, tasks, files or commands (⌘K)...'}
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
          />
          <button onClick={handleClose} className="p-1 text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="p-3 space-y-3 max-h-96 overflow-y-auto text-xs">
          {/* Section: Agents */}
          <div className="space-y-1">
            <div className="text-[9px] font-bold uppercase px-2 py-0.5 tracking-wider" style={{ color: 'var(--app-accent, #E0564C)' }}>
              {language === 'tr' ? 'Ajanlar' : 'Agents'}
            </div>
            {Object.values(agents)
              .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()) || a.role.toLowerCase().includes(query.toLowerCase()))
              .map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => handleSelectAgent(agent.id)}
                  className="p-2 rounded-lg border hover:border-cyan-500/40 flex items-center justify-between cursor-pointer transition-colors"
                  style={{
                    backgroundColor: 'var(--app-bg-surface, #141824)',
                    borderColor: 'var(--app-border, #1E2538)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: agent.color }} />
                    <span className="font-bold text-slate-100">{agent.name}</span>
                    <span className="text-slate-400 text-[11px]">— {agent.role}</span>
                  </div>
                  <span className="text-[10px] text-cyan-300 font-bold">{agent.model}</span>
                </div>
              ))}
          </div>

          {/* Section: Tasks */}
          <div className="space-y-1">
            <div className="text-[9px] font-bold text-amber-400 uppercase px-2 py-0.5 tracking-wider">
              {language === 'tr' ? 'Görevler (Kanban)' : 'Tasks'}
            </div>
            {tasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                onClick={handleSelectTask}
                className="p-2 rounded-lg border hover:border-amber-500/40 flex items-center justify-between cursor-pointer transition-colors"
                style={{
                  backgroundColor: 'var(--app-bg-surface, #141824)',
                  borderColor: 'var(--app-border, #1E2538)',
                }}
              >
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-200">{task.title}</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-amber-300 font-bold border border-amber-500/30">
                  {task.status}
                </span>
              </div>
            ))}
          </div>

          {/* Section: Files */}
          <div className="space-y-1">
            <div className="text-[9px] font-bold text-cyan-400 uppercase px-2 py-0.5 tracking-wider">
              {language === 'tr' ? 'Kod Dosyaları' : 'Code Files'}
            </div>
            {codeFiles.map((file) => (
              <div
                key={file.id}
                onClick={handleSelectCode}
                className="p-2 rounded-lg border hover:border-cyan-500/40 flex items-center justify-between cursor-pointer transition-colors"
                style={{
                  backgroundColor: 'var(--app-bg-surface, #141824)',
                  borderColor: 'var(--app-border, #1E2538)',
                }}
              >
                <div className="flex items-center gap-2">
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-200">{file.name}</span>
                </div>
                <span className="text-[10px] text-slate-500">{file.language}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div
          className="h-9 border-t px-4 flex items-center justify-between text-[10px] text-slate-500 shrink-0"
          style={{
            backgroundColor: 'var(--app-bg-dark, #0A0C13)',
            borderColor: 'var(--app-border, #1E2333)',
          }}
        >
          <span>{language === 'tr' ? 'Geçiş için ↑↓ ok tuşları, seçim için Enter' : 'Navigate with ↑↓, Select with Enter'}</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-slate-700 text-slate-400">Esc</kbd>
        </div>
      </div>
    </div>
  );
};
