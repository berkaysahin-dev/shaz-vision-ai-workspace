import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, CheckSquare, Users, Globe, FileCode, Play, Sparkles, X, Plus } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { AgentId } from '../../types';
import { sound } from '../../services/soundEngine';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setSelectedAgentId,
    setCenterTab,
    setRightTab,
    executeGlobalPrompt,
    setIsTaskModalOpen,
    setIsSettingsOpen,
    addTerminalPane,
  } = useWorkspace();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  interface Item {
    id: string;
    title: string;
    sub: string;
    cat: string;
    icon: React.FC<{ className?: string }>;
    action: () => void;
  }

  const items: Item[] = [
    {
      id: 'cmd-prompt',
      title: 'Run AI Company Sprint',
      sub: 'Dispatch global prompt across the crew',
      cat: 'Actions',
      icon: Play,
      action: () => executeGlobalPrompt('refresh the landing page, spread it across the crew'),
    },
    {
      id: 'cmd-new-task',
      title: 'Create New Task',
      sub: 'Add task to Kanban board with agent assignment',
      cat: 'Actions',
      icon: Plus,
      action: () => setIsTaskModalOpen(true),
    },
    {
      id: 'cmd-term',
      title: 'Spawn New Live Terminal',
      sub: 'Open parallel agent CLI shell',
      cat: 'Terminal',
      icon: Terminal,
      action: () => addTerminalPane(),
    },
    {
      id: 'cmd-browser',
      title: 'Open In-App Headless Browser',
      sub: 'View live responsive DOM preview',
      cat: 'Tools',
      icon: Globe,
      action: () => setRightTab('browser'),
    },
    {
      id: 'cmd-code',
      title: 'Open Code Explorer & Editor',
      sub: 'Inspect agent source code modifications',
      cat: 'Code',
      icon: FileCode,
      action: () => setCenterTab('code'),
    },
    {
      id: 'agent-nova',
      title: 'Focus Agent: Nova (Backend Eng)',
      sub: 'TASK-CH23757 · gpt-5-codex',
      cat: 'Agents',
      icon: Users,
      action: () => setSelectedAgentId('nova'),
    },
    {
      id: 'agent-emre',
      title: 'Focus Agent: Emre (Fullstack Eng)',
      sub: 'TASK-CH15038 · Fable 5',
      cat: 'Agents',
      icon: Users,
      action: () => setSelectedAgentId('emre'),
    },
    {
      id: 'agent-kai',
      title: 'Focus Agent: Kai (Frontend Eng)',
      sub: 'TASK-CH88491 · Fable 5',
      cat: 'Agents',
      icon: Users,
      action: () => setSelectedAgentId('kai'),
    },
  ];

  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.sub.toLowerCase().includes(query.toLowerCase()) ||
      i.cat.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: Item) => {
    sound.playClick();
    setIsSearchOpen(false);
    item.action();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((p) => (p + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((p) => (p - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) handleSelect(filtered[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-24 p-4 font-mono select-none"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-[#0F121C] border border-[#262E44] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input */}
        <div className="p-3.5 bg-[#141824] border-b border-[#21283B] flex items-center gap-3">
          <Search className="w-4 h-4 text-purple-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search agents, tasks, terminals, files, or actions..."
            className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 outline-none font-mono"
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-[#0A0D15] text-slate-400 border border-[#232B3F]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="p-2 overflow-y-auto space-y-1 flex-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching commands or agents found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-900/40 border border-purple-500/50 text-purple-200 shadow-sm'
                      : 'hover:bg-[#151A28] text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-lg bg-[#0A0D14] border border-[#232B40] text-purple-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold truncate">{item.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{item.sub}</div>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#0A0D14] text-slate-500 border border-[#1E2536]">
                    {item.cat}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="p-2 px-3 border-t border-[#1C2234] bg-[#0A0D14] text-[10px] text-slate-500 flex justify-between">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>Shaz Vision AI Workspace</span>
        </div>
      </div>
    </div>
  );
};
