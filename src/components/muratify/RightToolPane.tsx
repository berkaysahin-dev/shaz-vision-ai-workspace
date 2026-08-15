import React, { useState } from 'react';
import {
  Minus,
  Plus,
  Globe,
  CheckSquare,
  FileText,
  Plug,
  RefreshCw,
  Smartphone,
  Monitor,
  MousePointer,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { RightTab, TaskStatus } from '../../types';
import { sound } from '../../services/soundEngine';

export const RightToolPane: React.FC = () => {
  const {
    rightTab,
    setRightTab,
    tasks,
    updateTaskStatus,
    reports,
    browserPage,
    setBrowserUrl,
    reloadBrowser,
    browserViewport,
    setBrowserViewport,
    mcpServers,
    toggleMcpServer,
    agents,
    setIsTaskModalOpen,
    t,
  } = useWorkspace();

  const [browserInput, setBrowserInput] = useState(browserPage.url);
  const [browserSubTab, setBrowserSubTab] = useState<'preview' | 'toolCalls' | 'console'>('preview');

  const tabs: { id: RightTab; label: string; count?: number; color?: string }[] = [
    { id: 'tasks', label: t.tabTasks, count: tasks.length, color: 'bg-amber-400' },
    { id: 'reports', label: t.tabReports },
    { id: 'browser', label: t.tabBrowser, color: 'bg-cyan-400' },
    { id: 'tools', label: t.tabTools, count: mcpServers.length },
  ];

  const handleBrowserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!browserInput.trim()) return;
    sound.playClick();
    setBrowserUrl(browserInput.trim());
  };

  const handleStatusShift = (taskId: string, current: TaskStatus) => {
    sound.playClick();
    const sequence: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE'];
    const idx = sequence.indexOf(current);
    if (idx < sequence.length - 1) {
      updateTaskStatus(taskId, sequence[idx + 1]);
    } else {
      updateTaskStatus(taskId, 'TODO');
    }
  };

  const inProgressTasks = tasks.filter((t) => t.status === 'IN_PROGRESS');
  const todoTasks = tasks.filter((t) => t.status === 'TODO');
  const doneTasks = tasks.filter((t) => t.status === 'DONE');

  const browserToolCalls = [
    { time: '13:48:12', tool: 'browser.navigate_url', arg: 'https://preview.shazvision.local/onboarding', status: '200 OK (42ms)' },
    { time: '13:48:15', tool: 'browser.wait_for_selector', arg: '#workspace-name-input', status: 'found (DOM ready)' },
    { time: '13:48:18', tool: 'browser.fill_input', arg: '#workspace-name-input -> "Shaz Vision HQ"', status: 'success' },
    { time: '13:48:21', tool: 'browser.click_element', arg: 'button:has-text("Continue")', status: 'clicked' },
    { time: '13:48:24', tool: 'browser.take_screenshot', arg: 'viewport: 1440x900', status: 'captured (128 KB)' },
  ];

  return (
    <div
      className="w-[330px] xl:w-[370px] border-l flex flex-col justify-between shrink-0 overflow-y-auto select-none transition-colors duration-300"
      style={{
        backgroundColor: 'var(--app-bg-panel, #10131D)',
        borderColor: 'var(--app-border, #1E2333)',
      }}
    >
      {/* Right Sub-Header Tabs */}
      <div
        className="h-8 border-b px-3 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0 transition-colors duration-300"
        style={{
          backgroundColor: 'var(--app-bg-panel, #141824)',
          borderColor: 'var(--app-border, #1E2333)',
        }}
      >
        <div className="flex items-center gap-3 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = rightTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setRightTab(tab.id);
                }}
                className="flex items-center gap-1.5 font-bold transition-colors whitespace-nowrap"
                style={{
                  color: isActive ? 'var(--app-text-accent, #FECDD3)' : '#64748B',
                }}
              >
                {tab.color && <span className={`w-2 h-2 rounded-full ${tab.color}`} />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="text-[10px] text-slate-500 font-normal">{tab.count}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          {rightTab === 'tasks' && (
            <button
              onClick={() => {
                sound.playClick();
                setIsTaskModalOpen(true);
              }}
              title={t.newTask}
              className="p-1 rounded text-amber-300 border transition-colors"
              style={{
                backgroundColor: 'var(--app-bg-surface, #1C2336)',
                borderColor: 'var(--app-border, #2D3854)',
              }}
            >
              <Plus className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 p-3 overflow-y-auto">
        {/* TASKS KANBAN TAB */}
        {rightTab === 'tasks' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                {t.kanbanTitle}
              </span>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="text-[10px] font-bold flex items-center gap-1"
                style={{ color: 'var(--app-text-accent, #FECDD3)' }}
              >
                <Plus className="w-3 h-3" /> {t.newTask}
              </button>
            </div>

            {/* In Progress */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold flex justify-between" style={{ color: 'var(--app-accent, #E0564C)' }}>
                <span>{t.inProgress} ({inProgressTasks.length})</span>
                <span className="text-slate-500">Active</span>
              </div>

              {inProgressTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleStatusShift(task.id, task.status)}
                  className="p-2.5 rounded-lg border transition-all shadow-md space-y-1.5 cursor-pointer group"
                  style={{
                    backgroundColor: 'var(--app-bg-surface, #141724)',
                    borderColor: 'var(--app-accent, #E0564C)',
                  }}
                >
                  <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                    <span className="font-bold" style={{ color: 'var(--app-text-accent, #FECDD3)' }}>{task.id}</span>
                    <span className="text-[8px] px-1 py-0.2 rounded bg-black/40 text-slate-300">
                      {task.priority}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-100 leading-tight group-hover:text-amber-200 transition-colors">
                    {task.title}
                  </div>

                  <div
                    className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t"
                    style={{ borderColor: 'var(--app-border, #1F263A)' }}
                  >
                    <span>{task.team}</span>
                    <div className="flex items-center gap-1 font-bold" style={{ color: 'var(--app-accent, #E0564C)' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--app-accent, #E0564C)' }} />
                      <span>{agents[task.assignedAgent]?.name || task.assignedAgent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TODO */}
            <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--app-border, #1E2333)' }}>
              <div className="text-[10px] text-slate-400 font-bold">{t.todo} ({todoTasks.length})</div>
              {todoTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleStatusShift(task.id, task.status)}
                  className="p-2 rounded border hover:border-slate-500 cursor-pointer text-slate-300 text-[11px]"
                  style={{
                    backgroundColor: 'var(--app-bg-dark, #0A0C13)',
                    borderColor: 'var(--app-border, #1A2030)',
                  }}
                >
                  <div className="font-semibold truncate">{task.title}</div>
                  <div className="text-[9px] text-slate-500 mt-1 flex justify-between">
                    <span>{task.id}</span>
                    <span>{t.clickToMove}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Done */}
            <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--app-border, #1E2333)' }}>
              <div className="text-[10px] text-emerald-400 font-bold">{t.done} ({doneTasks.length})</div>
              {doneTasks.slice(0, 2).map((task) => (
                <div
                  key={task.id}
                  className="p-2 rounded border text-slate-400 text-[10px] flex justify-between items-center"
                  style={{
                    backgroundColor: 'var(--app-bg-dark, #0A0C13)',
                    borderColor: 'var(--app-border, #1A2030)',
                  }}
                >
                  <span className="truncate">{task.title}</span>
                  <span className="text-emerald-400 font-bold shrink-0">✓ {t.done}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BROWSER WORKSPACE */}
        {rightTab === 'browser' && (
          <div className="space-y-2.5 font-mono text-xs flex flex-col h-full">
            <form
              onSubmit={handleBrowserSubmit}
              className="flex items-center gap-1.5 p-1.5 rounded-lg border"
              style={{
                backgroundColor: 'var(--app-bg-dark, #090C13)',
                borderColor: 'var(--app-border, #1E2333)',
              }}
            >
              <button
                type="button"
                onClick={reloadBrowser}
                title="Reload"
                className="p-1 text-slate-400 hover:text-slate-200"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
              <input
                type="text"
                value={browserInput}
                onChange={(e) => setBrowserInput(e.target.value)}
                className="flex-1 bg-transparent text-[11px] text-cyan-300 outline-none truncate font-mono"
              />
              <button
                type="button"
                onClick={() => setBrowserViewport(browserViewport === 'desktop' ? 'mobile' : 'desktop')}
                title="Toggle Viewport"
                className="p-1 text-slate-400 hover:text-purple-300"
              >
                {browserViewport === 'desktop' ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
              </button>
            </form>

            <div
              className="flex items-center gap-1 p-1 rounded-lg border text-[10px]"
              style={{
                backgroundColor: 'var(--app-bg-dark, #090C14)',
                borderColor: 'var(--app-border, #1E2538)',
              }}
            >
              <button
                onClick={() => setBrowserSubTab('preview')}
                className={`flex-1 py-1 rounded font-bold transition-all ${
                  browserSubTab === 'preview' ? 'text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
                style={browserSubTab === 'preview' ? { backgroundColor: 'var(--app-accent, #E0564C)' } : {}}
              >
                {t.liveDom}
              </button>
              <button
                onClick={() => setBrowserSubTab('toolCalls')}
                className={`flex-1 py-1 rounded font-bold transition-all ${
                  browserSubTab === 'toolCalls' ? 'text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
                style={browserSubTab === 'toolCalls' ? { backgroundColor: 'var(--app-accent, #E0564C)' } : {}}
              >
                {t.toolCalls} (5)
              </button>
              <button
                onClick={() => setBrowserSubTab('console')}
                className={`flex-1 py-1 rounded font-bold transition-all ${
                  browserSubTab === 'console' ? 'text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
                style={browserSubTab === 'console' ? { backgroundColor: 'var(--app-accent, #E0564C)' } : {}}
              >
                {t.devtools}
              </button>
            </div>

            {browserSubTab === 'preview' && (
              <div
                className="flex-1 border rounded-xl p-3 flex flex-col justify-between overflow-y-auto shadow-inner"
                style={{
                  backgroundColor: 'var(--app-terminal-bg, #06080F)',
                  borderColor: 'var(--app-border, #1E2436)',
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: browserPage.domHtml }}
                  className="w-full flex-1"
                />
                <div
                  className="mt-3 pt-2 border-t text-[9px] text-slate-500 font-mono flex justify-between"
                  style={{ borderColor: 'var(--app-border, #1C2234)' }}
                >
                  <span className="text-emerald-400 font-bold">● {t.status}: {browserPage.status}</span>
                  <span>{t.viewport}: {browserViewport === 'desktop' ? '1440x900' : '375x812'}</span>
                </div>
              </div>
            )}

            {browserSubTab === 'toolCalls' && (
              <div
                className="flex-1 border rounded-xl p-2.5 overflow-y-auto space-y-2"
                style={{
                  backgroundColor: 'var(--app-terminal-bg, #06080F)',
                  borderColor: 'var(--app-border, #1E2436)',
                }}
              >
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  {t.toolCalls}
                </div>
                {browserToolCalls.map((tc, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg border text-[10px] space-y-1"
                    style={{
                      backgroundColor: 'var(--app-bg-surface, #0E121D)',
                      borderColor: 'var(--app-border, #1E273D)',
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold flex items-center gap-1" style={{ color: 'var(--app-accent, #E0564C)' }}>
                        <MousePointer className="w-2.5 h-2.5 text-cyan-400" />
                        {tc.tool}
                      </span>
                      <span className="text-[9px] text-slate-500">{tc.time}</span>
                    </div>
                    <div className="text-slate-300 font-mono text-[10px] truncate">{tc.arg}</div>
                    <div className="text-emerald-400 text-[9px] font-bold">✓ {tc.status}</div>
                  </div>
                ))}
              </div>
            )}

            {browserSubTab === 'console' && (
              <div
                className="flex-1 border rounded-xl p-2.5 overflow-y-auto space-y-1.5"
                style={{
                  backgroundColor: 'var(--app-terminal-bg, #06080F)',
                  borderColor: 'var(--app-border, #1E2436)',
                }}
              >
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  {t.devtools}
                </div>
                {browserPage.consoleLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded text-[10px] text-emerald-400 font-mono"
                    style={{ backgroundColor: 'var(--app-bg-dark, #0A0D15)' }}
                  >
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* REPORTS TAB */}
        {rightTab === 'reports' && (
          <div className="space-y-3 font-mono text-xs">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {t.tabReports} & Telemetry
            </h3>
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="p-3 border rounded-lg space-y-2"
                style={{
                  backgroundColor: 'var(--app-bg-dark, #0A0C13)',
                  borderColor: 'var(--app-border, #1E2333)',
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="font-bold text-slate-200">{rep.title}</div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {rep.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">{rep.agentSummary}</div>
                <div
                  className="flex justify-between text-[10px] text-slate-500 pt-1 border-t"
                  style={{ borderColor: 'var(--app-border, #1E2333)' }}
                >
                  <span>{rep.date}</span>
                  <span className="text-cyan-400 font-bold">{rep.coverage} Coverage</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TOOLS / MCP TAB */}
        {rightTab === 'tools' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                MODEL CONTEXT PROTOCOL (MCP)
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">● 5 Connected</span>
            </div>

            {mcpServers.map((server) => (
              <div
                key={server.id}
                className="p-3 border rounded-lg space-y-2"
                style={{
                  backgroundColor: 'var(--app-bg-dark, #0A0C13)',
                  borderColor: 'var(--app-border, #1E2333)',
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold text-slate-200 text-xs">{server.name}</div>
                  <button
                    onClick={() => toggleMcpServer(server.id)}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                      server.status === 'Connected' || server.status === 'Running'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        : 'bg-red-950/60 text-red-300 border-red-500/40'
                    }`}
                  >
                    {server.status}
                  </button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {server.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-1.5 py-0.5 rounded border text-[9px] text-slate-400"
                      style={{
                        backgroundColor: 'var(--app-bg-surface, #131724)',
                        borderColor: 'var(--app-border, #1F263B)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="text-[9px] text-slate-500 text-right">
                  Latency: {server.latencyMs}ms
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
