import React, { useState } from 'react';
import { CheckSquare, X, Plus, Trash2, Zap, DollarSign, User, Shield } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { AgentId, TeamId, TaskStatus } from '../../types';
import { sound } from '../../services/soundEngine';

export const TaskModal: React.FC = () => {
  const { isTaskModalOpen, setIsTaskModalOpen, addTask, activeTeam, agents } = useWorkspace();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Normal' | 'High' | 'Urgent'>('Normal');
  const [assignedAgent, setAssignedAgent] = useState<AgentId>('nova');
  const [subtasks, setSubtasks] = useState<{ id: string; title: string; completed: boolean }[]>([
    { id: '1', title: 'Implement core handler logic', completed: false },
    { id: '2', title: 'Write integration test suite', completed: false },
  ]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  if (!isTaskModalOpen) return null;

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    sound.playClick();
    setSubtasks((prev) => [
      ...prev,
      { id: `${Date.now()}`, title: newSubtaskTitle.trim(), completed: false },
    ]);
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (id: string) => {
    sound.playClick();
    setSubtasks((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    sound.playSuccess();
    addTask({
      title: title.trim(),
      description: description.trim() || 'Autonomous engineering task execution.',
      priority,
      team: activeTeam,
      assignedAgent,
      status: 'TODO',
      progress: 0,
      tokensEst: 16000,
      costEst: 0.24,
      subtasks,
    });
    setTitle('');
    setDescription('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 font-mono select-none"
      onClick={() => setIsTaskModalOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-[#0F121C] border border-[#262E44] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#141824] border-b border-[#21283B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Create AI Engineering Task
              </h2>
              <span className="text-[10px] text-slate-400">Dispatch to autonomous crew in {activeTeam}</span>
            </div>
          </div>

          <button
            onClick={() => setIsTaskModalOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-[#1E2538]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
              TASK TITLE
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Implement Stripe Webhook signature verification..."
              className="w-full px-3 py-2 bg-[#121520] border border-[#262E44] rounded-lg text-xs text-slate-100 outline-none focus:border-amber-500 font-mono"
              autoFocus
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
              SPECIFICATION & CONSTRAINTS
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details, edge cases, required files and dependencies..."
              className="w-full px-3 py-2 bg-[#121520] border border-[#262E44] rounded-lg text-xs text-slate-100 outline-none focus:border-amber-500 resize-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                ASSIGNED AGENT
              </label>
              <select
                value={assignedAgent}
                onChange={(e) => setAssignedAgent(e.target.value as AgentId)}
                className="w-full px-3 py-2 bg-[#121520] border border-[#262E44] rounded-lg text-xs text-slate-200 outline-none font-mono cursor-pointer"
              >
                {Object.values(agents).map((a) => (
                  <option key={a.id} value={a.id} className="bg-[#0F121C]">
                    {a.name} ({a.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                PRIORITY LEVEL
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#121520] border border-[#262E44] rounded-lg text-xs text-slate-200 outline-none font-mono cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Subtasks Builder */}
          <div className="space-y-2 pt-1 border-t border-[#1F2536]">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              SUBTASKS & ACCEPTANCE CRITERIA
            </span>

            <div className="space-y-1.5">
              {subtasks.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#0A0D14] border border-[#1E2436] text-xs"
                >
                  <span className="text-slate-300">{st.title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(st.id)}
                    className="text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                placeholder="Add subtask..."
                className="flex-1 px-3 py-1.5 bg-[#121520] border border-[#262E44] rounded-lg text-xs text-slate-200 outline-none"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 bg-[#1F263A] hover:bg-[#2A344F] text-slate-200 rounded-lg text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#1F2536]">
            <span className="text-[10px] text-slate-500">Est: ~16k tokens ($0.24)</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsTaskModalOpen(false)}
                className="px-3 py-2 rounded-lg bg-[#141926] text-slate-400 hover:text-slate-200 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Dispatch Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
