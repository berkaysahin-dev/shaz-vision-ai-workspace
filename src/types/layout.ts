export type PaneId = 
  | 'office' 
  | 'terminals' 
  | 'code' 
  | 'tasks' 
  | 'browser' 
  | 'mcp' 
  | 'reports';

export interface WorkspacePane {
  id: PaneId;
  title: string;
  subtitle?: string;
  iconName: string;
  isVisible: boolean;
  minWidth?: number;
  minHeight?: number;
}

export type LayoutPreset = 
  | 'default-3col' 
  | 'office-focus' 
  | 'terminal-focus' 
  | 'devops-browser' 
  | 'compact-duo'
  | 'custom';

export interface ColumnLayout {
  id: string;
  title: string;
  widthPercent: number;
  paneIds: PaneId[];
}

export interface WorkspaceLayoutConfig {
  preset: LayoutPreset;
  columns: ColumnLayout[];
}
