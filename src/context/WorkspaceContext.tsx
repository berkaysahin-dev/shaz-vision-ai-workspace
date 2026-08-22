import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Agent,
  AgentId,
  TeamId,
  MainViewTab,
  TerminalPane,
  RightTab,
  TaskItem,
  TaskStatus,
  ReportItem,
  BrowserPage,
  CodeFile,
  McpServer,
  NotificationItem,
  GlobalVoiceState,
} from '../types';
import {
  initialAgents,
  initialTerminalPanes,
  initialTasksList,
  initialCodeFiles,
  initialBrowserPages,
  initialMcpServers,
  initialNotifications,
  initialReports,
  initialVoiceState,
} from '../services/mockData';
import { sound } from '../services/soundEngine';
import { Language, translations } from '../services/i18n';
import { ThemeId, THEMES, applyThemeToDOM } from '../services/themeManager';
import { aiEngine } from '../services/aiEngine';
import { terminalBridge } from '../services/terminalBridge';

interface WorkspaceContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  currentTheme: ThemeId;
  setCurrentTheme: (theme: ThemeId) => void;
  activeTeam: TeamId;
  setActiveTeam: (team: TeamId) => void;
  mainView: MainViewTab;
  setMainView: (view: MainViewTab) => void;
  agents: Record<string, Agent>;
  selectedAgentId: AgentId | null;
  setSelectedAgentId: (id: AgentId | null) => void;
  isInspectorOpen: boolean;
  setIsInspectorOpen: (open: boolean) => void;
  pauseAgent: (id: AgentId) => void;
  sendMessageToAgent: (agentId: AgentId, message: string) => void;
  terminalPanes: TerminalPane[];
  addTerminalPane: () => void;
  closeTerminalPane: (paneId: string) => void;
  addTerminalLine: (paneId: string, line: string) => void;
  clearTerminalPane: (paneId: string) => void;
  centerTab: 'terminal' | 'code';
  setCenterTab: (tab: 'terminal' | 'code') => void;
  rightTab: RightTab;
  setRightTab: (tab: RightTab) => void;
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
  reports: ReportItem[];
  codeFiles: CodeFile[];
  selectedFileId: string;
  setSelectedFileId: (id: string) => void;
  updateFileContent: (fileId: string, content: string) => void;
  browserPage: BrowserPage;
  setBrowserUrl: (url: string) => void;
  reloadBrowser: () => void;
  browserViewport: 'desktop' | 'mobile';
  setBrowserViewport: (vp: 'desktop' | 'mobile') => void;
  mcpServers: McpServer[];
  toggleMcpServer: (id: string) => void;
  notifications: NotificationItem[];
  markNotificationsAsRead: () => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isTaskModalOpen: boolean;
  setIsTaskModalOpen: (open: boolean) => void;
  isMobileModalOpen: boolean;
  setIsMobileModalOpen: (open: boolean) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  updateAgentCustomization: (agentId: AgentId, data: Partial<Agent>) => void;
  isMobileCompanionMode: boolean;
  projectDir: string;
  setProjectDir: (dir: string) => void;
  selectProjectDirectory: () => Promise<void>;
  voiceState: GlobalVoiceState;
  globalPrompt: string;
  setGlobalPrompt: (prompt: string) => void;
  executeGlobalPrompt: (prompt: string) => void;
  isSoundMuted: boolean;
  toggleSound: () => void;
  stats: {
    activeAgents: number;
    totalAgents: number;
    tasksCount: number;
    terminalCount: number;
    unreadNotifications: number;
  };
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('tr');
  const [currentTheme, setCurrentThemeState] = useState<ThemeId>('espresso');
  const [activeTeam, setActiveTeamState] = useState<TeamId>('PRODUCT');
  const [mainView, setMainViewState] = useState<MainViewTab>('office');
  const [agents, setAgents] = useState<Record<string, Agent>>(initialAgents);
  const [selectedAgentId, setSelectedAgentIdState] = useState<AgentId | null>('nova');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [terminalPanes, setTerminalPanes] = useState<TerminalPane[]>(initialTerminalPanes);
  const [centerTab, setCenterTab] = useState<'terminal' | 'code'>('terminal');
  const [rightTab, setRightTab] = useState<RightTab>('tasks');
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasksList);
  const [reports] = useState<ReportItem[]>(initialReports);
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>(initialCodeFiles);
  const [selectedFileId, setSelectedFileId] = useState<string>('file-1');
  const [browserPage, setBrowserPage] = useState<BrowserPage>(initialBrowserPages[0]);
  const [browserViewport, setBrowserViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [mcpServers, setMcpServers] = useState<McpServer[]>(initialMcpServers);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isMobileCompanionMode, setIsMobileCompanionMode] = useState(false);

  // Check URL query parameters for mobile mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('mode') === 'mobile') {
        setIsMobileCompanionMode(true);
      }
    }
  }, []);

  const updateAgentCustomization = (agentId: AgentId, data: Partial<Agent>) => {
    setAgents((prev) => {
      const current = prev[agentId];
      if (!current) return prev;
      return {
        ...prev,
        [agentId]: {
          ...current,
          ...data,
        },
      };
    });
  };

  const [voiceState, setVoiceState] = useState<GlobalVoiceState>(initialVoiceState);
  const [globalPrompt, setGlobalPrompt] = useState('refresh the landing page, spread it across the crew');
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Apply theme immediately on startup and changes
  useEffect(() => {
    applyThemeToDOM(currentTheme);
  }, [currentTheme]);

  const setLanguage = (lang: Language) => {
    sound.playClick();
    setLanguageState(lang);
  };

  const setCurrentTheme = (theme: ThemeId) => {
    sound.playClick();
    setCurrentThemeState(theme);
    applyThemeToDOM(theme);
  };

  const t = translations[language];

  const setActiveTeam = (team: TeamId) => {
    sound.playClick();
    setActiveTeamState(team);
  };

  const setMainView = (view: MainViewTab) => {
    sound.playClick();
    setMainViewState(view);
  };

  const setSelectedAgentId = (id: AgentId | null) => {
    setSelectedAgentIdState(id);
    if (id) setIsInspectorOpen(true);
  };

  const toggleSound = () => {
    const next = !isSoundMuted;
    setIsSoundMuted(next);
    sound.isMuted = next;
    if (!next) sound.playClick();
  };

  const pauseAgent = (id: AgentId) => {
    sound.playClick();
    setAgents((prev) => {
      const target = prev[id];
      if (!target) return prev;
      return {
        ...prev,
        [id]: {
          ...target,
          isPaused: !target.isPaused,
          state: !target.isPaused ? 'IDLE' : 'WORKING',
          speechBubble: !target.isPaused ? 'Paused by supervisor' : 'Resuming task execution...',
        },
      };
    });
  };

  const sendMessageToAgent = (agentId: AgentId, message: string) => {
    sound.playAgentPing();
    addTerminalLine('term-1', `[Supervisor -> ${agents[agentId]?.name}]: ${message}`);
    setAgents((prev) => {
      const target = prev[agentId];
      if (!target) return prev;
      return {
        ...prev,
        [agentId]: {
          ...target,
          speechBubble: `Processing: ${message.slice(0, 20)}...`,
        },
      };
    });
  };

  const addTerminalPane = () => {
    sound.playClick();
    const newId = `term-${Date.now()}`;
    const newPane: TerminalPane = {
      id: newId,
      taskId: `TASK-CH${Math.floor(Math.random() * 90000 + 10000)}`,
      agentId: 'ada',
      agentName: 'Ada - Architect',
      model: 'Claude 3.5 Sonnet',
      taskTitle: 'Module Synthesis',
      currentFile: 'src/lib/runtime.ts',
      status: 'running',
      lines: [
        '$ codex "pull your task from the board"',
        '▸ Codex · Claude 3.5 - Ada',
        '● module synthesis initiated',
        'reading src/lib/runtime.ts...',
      ],
    };
    setTerminalPanes((prev) => [...prev, newPane]);
  };

  const closeTerminalPane = (paneId: string) => {
    sound.playClick();
    setTerminalPanes((prev) => prev.filter((p) => p.id !== paneId));
  };

  const addTerminalLine = (paneId: string, line: string) => {
    sound.playTerminalTick();
    setTerminalPanes((prev) =>
      prev.map((p) => (p.id === paneId ? { ...p, lines: [...p.lines, line] } : p))
    );
  };

  const clearTerminalPane = (paneId: string) => {
    sound.playClick();
    setTerminalPanes((prev) =>
      prev.map((p) => (p.id === paneId ? { ...p, lines: [] } : p))
    );
  };

  const addTask = (newTaskData: Omit<TaskItem, 'id' | 'createdAt'>) => {
    sound.playClick();
    const id = `TASK-CH${Math.floor(Math.random() * 90000 + 10000)}`;
    const task: TaskItem = {
      id,
      createdAt: 'Just now',
      ...newTaskData,
    };
    setTasks((prev) => [task, ...prev]);
    setIsTaskModalOpen(false);
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    sound.playClick();
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status, progress: status === 'DONE' ? 100 : t.progress } : t))
    );
  };

  const deleteTask = (taskId: string) => {
    sound.playClick();
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const updateFileContent = (fileId: string, content: string) => {
    sound.playClick();
    setCodeFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, content } : f))
    );
  };

  const setBrowserUrl = (url: string) => {
    setBrowserPage((prev) => ({ ...prev, url, status: 'Loading' }));
    setTimeout(() => {
      setBrowserPage((prev) => ({ ...prev, status: '200 OK' }));
    }, 500);
  };

  const reloadBrowser = () => {
    sound.playClick();
    setBrowserPage((prev) => ({ ...prev, status: 'Loading' }));
    setTimeout(() => {
      setBrowserPage((prev) => ({ ...prev, status: '200 OK' }));
    }, 400);
  };

  const toggleMcpServer = (id: string) => {
    sound.playClick();
    setMcpServers((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'Connected' || s.status === 'Running' ? 'Disconnected' : 'Connected';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const markNotificationsAsRead = () => {
    sound.playClick();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const [projectDir, setProjectDirState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('shaz_project_dir') || 'C:\\Projects\\shaz-vision-workspace';
    }
    return 'C:\\Projects\\shaz-vision-workspace';
  });

  const setProjectDir = (dir: string) => {
    setProjectDirState(dir);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('shaz_project_dir', dir); } catch (e) {}
    }
  };

  const selectProjectDirectory = async () => {
    sound.playClick();
    const chosen = await terminalBridge.selectProjectDirectory();
    if (chosen) {
      sound.playSuccess();
      setProjectDir(chosen);
      addTerminalLine('term-1', `+ Switched workspace directory to: ${chosen}`);
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: language === 'tr' ? 'Çalışma Alanı Değiştirildi' : 'Workspace Directory Switched',
          message: chosen,
          timestamp: 'Just now',
          type: 'success',
          read: false,
        },
        ...prev,
      ]);
    }
  };

  const executeGlobalPrompt = async (prompt: string) => {
    if (!prompt.trim()) return;
    sound.playAgentPing();
    
    setVoiceState({
      isSpeaking: true,
      speakingAgentName: 'ADA (LEAD ARCHITECT)',
      lastAction: `orchestrating prompt: "${prompt.slice(0, 32)}..."`,
      transcript: prompt,
    });

    // 1. Lead Orchestration via AI Engine
    const plan = await aiEngine.orchestratePrompt(prompt);

    // Update Ada and crew states
    setAgents((prev) => ({
      ...prev,
      ada: {
        ...prev.ada,
        state: 'WORKING',
        speechBubble: plan.leadThought,
      },
      nova: {
        ...prev.nova,
        state: 'RUNNING',
        speechBubble: 'implementing backend handlers',
      },
      kai: {
        ...prev.kai,
        state: 'RUNNING',
        speechBubble: 'syncing UI components',
      },
      selin: {
        ...prev.selin,
        state: 'TESTING',
        speechBubble: 'running regression tests',
      },
    }));

    addTerminalLine('term-1', `[AI Orchestrator] Ada: "${plan.leadThought}"`);

    // 2. Execute steps in terminal bridge
    plan.steps.forEach((step, idx) => {
      setTimeout(() => {
        if (step.suggestedCommand) {
          sound.playTerminalTick();
          terminalBridge.executeCommand({
            cmd: step.suggestedCommand,
            cwd: projectDir,
            onData: (chunk) => {
              addTerminalLine('term-1', chunk.trimEnd());
            },
          });
        }
      }, (idx + 1) * 800);
    });

    // 3. Mark complete
    setTimeout(() => {
      sound.playSuccess();
      setVoiceState((prev) => ({
        ...prev,
        speakingAgentName: 'AGENT X',
        lastAction: `completed -> task dispatched to crew`,
      }));

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: language === 'tr' ? 'Görev Başarıyla Tamamlandı' : 'Mission Executed Successfully',
          message: `Crew completed: "${prompt}" with 0 errors.`,
          timestamp: 'Just now',
          type: 'success',
          read: false,
        },
        ...prev,
      ]);
    }, (plan.steps.length + 1) * 900);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeAgents = Object.values(agents).filter((a) => a.team === activeTeam && a.state !== 'IDLE').length;
  const totalAgents = Object.values(agents).filter((a) => a.team === activeTeam).length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <WorkspaceContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentTheme,
        setCurrentTheme,
        activeTeam,
        setActiveTeam,
        mainView,
        setMainView,
        agents,
        selectedAgentId,
        setSelectedAgentId,
        isInspectorOpen,
        setIsInspectorOpen,
        pauseAgent,
        sendMessageToAgent,
        terminalPanes,
        addTerminalPane,
        closeTerminalPane,
        addTerminalLine,
        clearTerminalPane,
        centerTab,
        setCenterTab,
        rightTab,
        setRightTab,
        tasks,
        addTask,
        updateTaskStatus,
        deleteTask,
        reports,
        codeFiles,
        selectedFileId,
        setSelectedFileId,
        updateFileContent,
        browserPage,
        setBrowserUrl,
        reloadBrowser,
        browserViewport,
        setBrowserViewport,
        mcpServers,
        toggleMcpServer,
        notifications,
        markNotificationsAsRead,
        isNotificationOpen,
        setIsNotificationOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isSearchOpen,
        setIsSearchOpen,
        isTaskModalOpen,
        setIsTaskModalOpen,
        isMobileModalOpen,
        setIsMobileModalOpen,
        isCustomizerOpen,
        setIsCustomizerOpen,
        updateAgentCustomization,
        isMobileCompanionMode,
        projectDir,
        setProjectDir,
        selectProjectDirectory,
        voiceState,
        globalPrompt,
        setGlobalPrompt,
        executeGlobalPrompt,
        isSoundMuted,
        toggleSound,
        stats: {
          activeAgents,
          totalAgents: totalAgents || Object.keys(agents).length,
          tasksCount: tasks.filter((t) => t.team === activeTeam).length,
          terminalCount: terminalPanes.length,
          unreadNotifications,
        },
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return context;
};
