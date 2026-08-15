import React from 'react';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { DesktopFrame } from './components/layout/DesktopFrame';
import { MuratifyWorkspace } from './components/muratify/MuratifyWorkspace';
import { NotificationDrawer } from './components/modals/NotificationDrawer';
import { SettingsModal } from './components/modals/SettingsModal';
import { SearchModal } from './components/modals/SearchModal';
import { TaskModal } from './components/modals/TaskModal';
import { AgentInspectorModal } from './components/modals/AgentInspectorModal';

export const App: React.FC = () => {
  return (
    <WorkspaceProvider>
      <DesktopFrame>
        <MuratifyWorkspace />
        <NotificationDrawer />
        <SettingsModal />
        <SearchModal />
        <TaskModal />
        <AgentInspectorModal />
      </DesktopFrame>
    </WorkspaceProvider>
  );
};

export default App;
