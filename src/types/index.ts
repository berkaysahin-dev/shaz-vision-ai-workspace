export type TeamId = 'PRODUCT' | 'MARKETING' | 'SUPPORT';

export type MainViewTab = 'office' | 'terminals' | 'code' | 'browser' | 'tasks' | 'tools';

export type AgentId = 'ada' | 'nova' | 'emre' | 'kai' | 'rio' | 'lux' | 'sol' | 'max';

export type AgentState =
  | 'IDLE'
  | 'THINKING'
  | 'WORKING'
  | 'RUNNING'
  | 'TESTING'
  | 'SPEAKING'
  | 'COMPLETED'
  | 'ERROR';

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  team: TeamId;
  department: string;
  color: string;
  avatarTag: string;
  state: AgentState;
  currentTask: string;
  currentAction: string;
  model: string;
  speechBubble: string;
  roomIndex: number;
  tokens: number;
  cost: number;
  executionTime: string;
  files: string[];
  skills: string[];
  isPaused: boolean;
}

export interface TerminalPane {
  id: string;
  taskId: string;
  agentId: AgentId;
  agentName: string;
  model: string;
  taskTitle: string;
  currentFile: string;
  lines: string[];
  isMaximized?: boolean;
  status: 'idle' | 'running' | 'success' | 'error';
}

export type RightTab = 'tasks' | 'reports' | 'browser' | 'tools';

export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  team: TeamId;
  assignedAgent: AgentId;
  status: TaskStatus;
  progress: number;
  tokensEst: number;
  costEst: number;
  subtasks: Subtask[];
  createdAt: string;
}

export interface ReportItem {
  id: string;
  title: string;
  date: string;
  coverage: string;
  testsPassed: number;
  testsTotal: number;
  agentSummary: string;
  status: 'PASSED' | 'WARNING';
}

export interface BrowserPage {
  url: string;
  title: string;
  status: '200 OK' | 'Loading' | 'Testing';
  domHtml: string;
  consoleLogs: string[];
}

export interface CodeFile {
  id: string;
  path: string;
  name: string;
  language: string;
  content: string;
  modifiedBy: AgentId;
}

export interface McpServer {
  id: string;
  name: string;
  status: 'Connected' | 'Running' | 'Disconnected';
  tools: string[];
  latencyMs: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'pr';
  read: boolean;
}

export interface GlobalVoiceState {
  isSpeaking: boolean;
  speakingAgentName: string;
  lastAction: string;
  transcript: string;
}
