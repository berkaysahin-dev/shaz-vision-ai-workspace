import React, { useState, useEffect, useRef } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { AgentId, TaskStatus } from '../../types';
import { mobileBridge } from '../../services/mobileBridge';
import { sound } from '../../services/soundEngine';
import { 
  Users, 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  Mic, 
  MicOff, 
  Smartphone, 
  Send, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Radio, 
  Layers, 
  Play, 
  Pause,
  Plus,
  RefreshCw,
  Sparkles,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

type MobileTab = 'roster' | 'terminal' | 'tasks' | 'voice' | 'device';

export const MobileCompanionView: React.FC = () => {
  const { 
    agents, 
    tasks, 
    addTask, 
    updateTaskStatus, 
    terminalPanes, 
    pauseAgent, 
    executeGlobalPrompt,
    selectedAgentId,
    setSelectedAgentId
  } = useWorkspace();

  const [activeTab, setActiveTab] = useState<MobileTab>('roster');
  const [selectedAgentTerminal, setSelectedAgentTerminal] = useState<string>('nova');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [isPausedFeed, setIsPausedFeed] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal logs unless paused
  useEffect(() => {
    if (!isPausedFeed && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalPanes, isPausedFeed]);

  // Handle Speech Recognition for Mobile
  const handleVoiceToggle = () => {
    sound.playClick();
    if (!isRecording) {
      setIsRecording(true);
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        try {
          const recognition = new SpeechRec();
          recognition.lang = 'tr-TR';
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
              .map((res: any) => res[0].transcript)
              .join('');
            setVoiceText(transcript);
          };
          recognition.onend = () => {
            setIsRecording(false);
          };
          recognition.onerror = () => {
            setIsRecording(false);
          };
          recognition.start();
        } catch (e) {
          setIsRecording(false);
        }
      } else {
        // Fallback simulation
        setTimeout(() => {
          setVoiceText('refactor the auth middleware and deploy to staging');
          setIsRecording(false);
        }, 2500);
      }
    } else {
      setIsRecording(false);
    }
  };

  const handleSendVoiceTask = () => {
    if (!voiceText.trim()) return;
    sound.playSuccess();
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    executeGlobalPrompt(voiceText);
    mobileBridge.send('VOICE_TASK', { text: voiceText }, 'mobile');
    setVoiceText('');
  };

  const handleApproveTask = (taskId: string) => {
    sound.playSuccess();
    updateTaskStatus(taskId, 'DONE');
    mobileBridge.send('TASK_ACTION', { taskId, action: 'APPROVE' }, 'mobile');
  };

  const handleRejectTask = (taskId: string) => {
    sound.playClick();
    updateTaskStatus(taskId, 'TODO');
    mobileBridge.send('TASK_ACTION', { taskId, action: 'REJECT' }, 'mobile');
  };

  const handleCreateQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    sound.playClick();
    addTask({
      title: taskInput,
      description: 'Dispatched via Mobile Companion App',
      priority: 'High',
      team: 'PRODUCT',
      assignedAgent: (selectedAgentId as any) || 'nova',
      status: 'IN_PROGRESS',
      progress: 10,
      tokensEst: 15000,
      costEst: 0.15,
      subtasks: [{ id: 'sub-1', title: taskInput, completed: false }],
    });
    setTaskInput('');
  };

  // Filter terminal lines for selected agent
  const currentTerminal = terminalPanes.find((p) => p.agentId === selectedAgentTerminal) || terminalPanes[0];

  return (
    <div className="h-screen w-screen bg-[#07090E] text-slate-200 flex flex-col font-mono antialiased select-none overflow-hidden max-w-md mx-auto border-x border-[#1E2538] shadow-2xl">
      {/* Mobile Top App Bar */}
      <header className="h-14 bg-[#0D1019] border-b border-[#1E273A] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <div>
            <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              SHAZ COMPANION
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                LIVE
              </span>
            </div>
            <div className="text-[9px] text-slate-400 font-normal">Desktop HQ Paired</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>WI-FI / VPN</span>
          </div>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1 min-h-0 overflow-y-auto p-3 custom-scrollbar">
        {/* =========================================================================
            TAB 1: ROSTER & ACTIVE CREW
           ========================================================================= */}
        {activeTab === 'roster' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                AI CREW ({Object.keys(agents).length})
              </span>
              <span className="text-[10px] text-slate-500">Tap to inspect or pause</span>
            </div>

            <div className="space-y-2">
              {Object.values(agents).map((agent) => {
                const isWorking = agent.state !== 'IDLE' && !agent.isPaused;
                return (
                  <div
                    key={agent.id}
                    className="p-3 bg-[#0D1019] border border-[#1E273A] rounded-2xl flex flex-col gap-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-3.5 h-3.5 rounded-full shadow-sm flex items-center justify-center text-[7px] font-bold text-black"
                          style={{ backgroundColor: agent.color }}
                        >
                          {agent.avatarTag}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                            {agent.name}
                            <span className="text-[9px] font-normal text-slate-400">({agent.role})</span>
                          </div>
                          <div className="text-[10px] text-slate-500">{agent.department}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => { sound.playClick(); pauseAgent(agent.id); }}
                        className={`p-1.5 rounded-xl border text-[10px] font-bold flex items-center gap-1 transition-all ${
                          agent.isPaused
                            ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {agent.isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
                        {agent.isPaused ? 'Resume' : 'Pause'}
                      </button>
                    </div>

                    {/* Current live task */}
                    <div className="p-2 bg-[#06080F] rounded-xl border border-[#161D2B] text-[10px] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                        <Activity className="w-3 h-3 text-cyan-400 shrink-0 animate-pulse" />
                        <span className="truncate text-slate-300">{agent.currentAction}</span>
                      </div>
                      <span className="text-emerald-400 font-bold shrink-0">${agent.cost.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: REAL-TIME TERMINAL LOG STREAM (READ-ALONG MODE)
           ========================================================================= */}
        {activeTab === 'terminal' && (
          <div className="flex flex-col h-full space-y-2">
            {/* Agent Terminal Selector Pill Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar shrink-0">
              {Object.values(agents).slice(0, 6).map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => { sound.playClick(); setSelectedAgentTerminal(agent.id); }}
                  className={`px-3 py-1 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                    selectedAgentTerminal === agent.id
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-[#0D1019] text-slate-400 border border-[#1E273A]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: agent.color }} />
                  {agent.name}
                </button>
              ))}
            </div>

            {/* Terminal Screen */}
            <div className="flex-1 bg-[#05070C] border border-[#1E273A] rounded-2xl p-3 font-mono text-[10px] overflow-y-auto flex flex-col justify-between shadow-inner">
              <div className="space-y-1">
                <div className="text-slate-500 pb-1 border-b border-slate-900 flex justify-between">
                  <span>● session: {currentTerminal?.agentName || 'Nova'}</span>
                  <span>{currentTerminal?.model}</span>
                </div>

                {currentTerminal?.lines.map((line, idx) => (
                  <div key={idx} className="leading-relaxed break-all">
                    {line.startsWith('$') ? (
                      <span className="text-cyan-400 font-bold">{line}</span>
                    ) : line.includes('PASS') || line.includes('✓') ? (
                      <span className="text-emerald-400 font-bold">{line}</span>
                    ) : line.includes('error') || line.includes('FAIL') ? (
                      <span className="text-red-400 font-bold">{line}</span>
                    ) : (
                      <span className="text-slate-400">{line}</span>
                    )}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>

              {/* Terminal Floating Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-900 mt-2">
                <button
                  onClick={() => setIsPausedFeed(!isPausedFeed)}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[9px] text-slate-300"
                >
                  {isPausedFeed ? '▶ Resume Scroll' : '⏸ Pause Stream'}
                </button>
                <span className="text-[9px] text-slate-500">Live Read-Along</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: TASKS & 1-TAP APPROVALS
           ========================================================================= */}
        {activeTab === 'tasks' && (
          <div className="space-y-3">
            {/* Quick Task Dispatch Form */}
            <form onSubmit={handleCreateQuickTask} className="flex gap-1.5">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Give instant task to crew..."
                className="flex-1 bg-[#0D1019] border border-[#1E273A] rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shrink-0 shadow-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
              PENDING APPROVALS & ACTIVE TASKS ({tasks.length})
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 bg-[#0D1019] border border-[#1E273A] rounded-2xl space-y-2.5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-slate-100">{task.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{task.description}</div>
                    </div>
                    <span 
                      className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase shrink-0 ${
                        task.status === 'DONE' 
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  {/* 1-Tap Mobile Action Controls */}
                  {task.status !== 'DONE' && (
                    <div className="flex items-center gap-2 pt-1 border-t border-[#182030]">
                      <button
                        onClick={() => handleApproveTask(task.id)}
                        className="flex-1 py-1.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 rounded-xl text-xs font-bold border border-emerald-500/40 flex items-center justify-center gap-1 shadow-sm transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Approve & Ship
                      </button>
                      <button
                        onClick={() => handleRejectTask(task.id)}
                        className="flex-1 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-xl text-xs font-bold border border-red-500/40 flex items-center justify-center gap-1 shadow-sm transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: AGENTVOICE / PUSH-TO-TALK DISPATCH
           ========================================================================= */}
        {activeTab === 'voice' && (
          <div className="flex flex-col items-center justify-between h-full py-4 space-y-4">
            <div className="text-center">
              <h3 className="text-sm font-bold text-slate-100 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                VOICE ORCHESTRATION
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Hold to speak in Turkish or English. The task is transcribed locally and dispatched.
              </p>
            </div>

            {/* Giant Push-to-Talk Orb */}
            <div className="my-auto flex flex-col items-center">
              <button
                onClick={handleVoiceToggle}
                className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl relative ${
                  isRecording
                    ? 'bg-gradient-to-tr from-pink-600 to-red-500 scale-110 ring-8 ring-pink-500/30 animate-pulse'
                    : 'bg-gradient-to-tr from-purple-600 to-cyan-500 hover:scale-105 ring-4 ring-purple-500/20'
                }`}
              >
                {isRecording ? <Mic className="w-12 h-12 text-white" /> : <MicOff className="w-10 h-10 text-white/80" />}
                <span className="text-[10px] font-bold text-white mt-1">
                  {isRecording ? 'Listening...' : 'Tap to Speak'}
                </span>
              </button>

              {/* Transcribed Text Preview */}
              <div className="mt-6 w-full max-w-xs p-3 bg-[#0D1019] border border-[#1E273A] rounded-2xl min-h-[60px] text-center text-xs text-slate-200">
                {voiceText ? (
                  <span className="text-cyan-300 font-bold">"{voiceText}"</span>
                ) : (
                  <span className="text-slate-500 text-[10px]">Your speech will appear here...</span>
                )}
              </div>

              {voiceText && (
                <button
                  onClick={handleSendVoiceTask}
                  className="mt-3 px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Task to Crew
                </button>
              )}
            </div>

            {/* Quick Action Chips */}
            <div className="w-full">
              <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-2 text-center">
                OR TAP PRESET COMMAND
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {[
                  'Run security audit',
                  'Fix webhook jitter',
                  'Test flutter bridge',
                  'Optimize vector index'
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => { sound.playClick(); setVoiceText(chip); }}
                    className="px-2.5 py-1 rounded-xl bg-[#0D1019] border border-[#1E273A] hover:border-purple-500 text-[10px] text-slate-300"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: DEVICE & NETWORK SECURITY
           ========================================================================= */}
        {activeTab === 'device' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#0D1019] border border-[#1E273A] rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-cyan-400" />
                <div>
                  <div className="text-xs font-bold text-slate-100">Paired Mobile Client</div>
                  <div className="text-[10px] text-emerald-400 font-bold">● Active Session</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1.5 pt-2 border-t border-[#182030]">
                <div className="flex justify-between">
                  <span>Protocol:</span>
                  <span className="text-slate-200">Local Encrypted Bridge</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency:</span>
                  <span className="text-emerald-400 font-bold">4ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Permissions:</span>
                  <span className="text-slate-200">Read + Approvals + Voice</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl text-[11px] text-emerald-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Privacy Verified
              </div>
              <p className="text-[10px] text-slate-400">
                Source code, API engine keys, and database files remain solely on your desktop machine's local disk.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="h-16 bg-[#0D1019] border-t border-[#1E273A] px-2 flex items-center justify-around shrink-0">
        {[
          { id: 'roster', label: 'Crew', icon: Users },
          { id: 'terminal', label: 'Feed', icon: Terminal },
          { id: 'tasks', label: 'Tasks', icon: CheckCircle2 },
          { id: 'voice', label: 'Voice', icon: Mic },
          { id: 'device', label: 'Device', icon: Smartphone },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { sound.playClick(); setActiveTab(tab.id as MobileTab); }}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                isActive ? 'text-cyan-400 scale-105 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-cyan-400 animate-pulse' : ''}`} />
              <span className="text-[9px]">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
