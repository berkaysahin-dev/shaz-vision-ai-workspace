import React, { useState } from 'react';
import { X, Plus, CheckSquare } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';
import { AgentId, TeamId } from '../../types';

export const TaskModal: React.FC = () => {
  const { isTaskModalOpen, setIsTaskModalOpen, addTask, activeTeam, agents, t, language } = useWorkspace();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedAgent, setAssignedAgent] = useState<AgentId>('nova');
  const [priority, setPriority] = useState<'Low' | 'Normal' | 'High' | 'Urgent'>('Normal');
  const [subtasksInput, setSubtasksInput] = useState('');

  if (!isTaskModalOpen) return null;

  const handleClose = () => {
    sound.playClick();
    setIsTaskModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const subtasks = subtasksInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s, idx) => ({ id: `sub-${idx + 1}`, title: s, completed: false }));

    addTask({
      title: title.trim(),
      description: description.trim() || 'Engineering task dispatched via Task Matrix',
      team: activeTeam,
      assignedAgent,
      status: 'TODO',
      priority,
      progress: 0,
      tokensEst: 14000,
      costEst: 0.12,
      subtasks: subtasks.length > 0 ? subtasks : [{ id: 'sub-1', title: 'Analyze requirements', completed: false }],
    });

    setTitle('');
    setDescription('');
    setSubtasksInput('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 select-none font-mono"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 text-slate-300"
        style={{
          backgroundColor: 'var(--app-bg-panel, #0F121C)',
          borderColor: 'var(--app-border, #222736)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="h-12 border-b px-4 flex items-center justify-between shrink-0"
          style={{ borderColor: 'var(--app-border, #1E2333)' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="p-1 rounded border"
              style={{
                backgroundColor: 'var(--app-badge-bg, rgba(224, 86, 76, 0.2))',
                borderColor: 'var(--app-accent, #E0564C)',
                color: 'var(--app-text-accent, #FECDD3)',
              }}
            >
              <CheckSquare className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-slate-100">{t.createTaskTitle}</span>
          </div>

          <button onClick={handleClose} className="p-1 rounded text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold">{t.taskTitleLabel}</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={language === 'tr' ? 'örn. OAuth login entegrasyonu ve vitest testleri' : 'e.g. Implement OAuth login and run vitest pack'}
              className="w-full mt-1 px-3 py-2 border rounded-lg text-slate-200 outline-none"
              style={{
                backgroundColor: 'var(--app-bg-dark, #090B12)',
                borderColor: 'var(--app-border, #222A3E)',
              }}
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold">{t.taskSpecLabel}</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'tr' ? 'Görev şartnamesi ve kabul kriterleri...' : 'Task specification and constraints...'}
              className="w-full mt-1 px-3 py-2 border rounded-lg text-slate-200 outline-none resize-none"
              style={{
                backgroundColor: 'var(--app-bg-dark, #090B12)',
                borderColor: 'var(--app-border, #222A3E)',
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-bold">{t.assignedAgentLabel}</label>
              <select
                value={assignedAgent}
                onChange={(e) => setAssignedAgent(e.target.value as AgentId)}
                className="w-full mt-1 px-2.5 py-1.5 border rounded-lg text-slate-200 outline-none"
                style={{
                  backgroundColor: 'var(--app-bg-dark, #090B12)',
                  borderColor: 'var(--app-border, #222A3E)',
                }}
              >
                {Object.values(agents).map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 uppercase font-bold">{t.priorityLabel}</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full mt-1 px-2.5 py-1.5 border rounded-lg text-slate-200 outline-none"
                style={{
                  backgroundColor: 'var(--app-bg-dark, #090B12)',
                  borderColor: 'var(--app-border, #222A3E)',
                }}
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent (Critical)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold">{t.subtasksLabel}</label>
            <textarea
              rows={3}
              value={subtasksInput}
              onChange={(e) => setSubtasksInput(e.target.value)}
              placeholder={language === 'tr' ? 'Her satıra bir alt görev yazın:\n- Schema doğrulama\n- Unit testleri koş' : 'One subtask per line:\n- Schema validation\n- Run unit test suite'}
              className="w-full mt-1 px-3 py-2 border rounded-lg text-slate-200 outline-none resize-none"
              style={{
                backgroundColor: 'var(--app-bg-dark, #090B12)',
                borderColor: 'var(--app-border, #222A3E)',
              }}
            />
          </div>

          <div
            className="pt-3 border-t flex justify-end gap-2"
            style={{ borderColor: 'var(--app-border, #1E2333)' }}
          >
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-1.5 rounded-lg border text-slate-400 hover:text-slate-200"
              style={{
                backgroundColor: 'var(--app-bg-surface, #151926)',
                borderColor: 'var(--app-border, #28324D)',
              }}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-white font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              style={{ backgroundColor: 'var(--app-accent, #E0564C)' }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.dispatchTaskBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
