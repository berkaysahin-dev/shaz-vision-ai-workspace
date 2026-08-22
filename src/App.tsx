import React from 'react';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import { DesktopFrame } from './components/layout/DesktopFrame';
import { MuratifyWorkspace } from './components/muratify/MuratifyWorkspace';
import { NotificationDrawer } from './components/modals/NotificationDrawer';
import { SettingsModal } from './components/modals/SettingsModal';
import { SearchModal } from './components/modals/SearchModal';
import { TaskModal } from './components/modals/TaskModal';
import { AgentInspectorModal } from './components/modals/AgentInspectorModal';
import { MobileConnectModal } from './components/modals/MobileConnectModal';
import { AgentCustomizerModal } from './components/modals/AgentCustomizerModal';
import { MobileCompanionView } from './components/mobile/MobileCompanionView';

const WorkspaceRoot: React.FC = () => {
  const { 
    isMobileCompanionMode, 
    isMobileModalOpen, 
    setIsMobileModalOpen,
    isCustomizerOpen,
    setIsCustomizerOpen
  } = useWorkspace();

  if (isMobileCompanionMode) {
    return <MobileCompanionView />;
  }

  return (
    <DesktopFrame>
      <MuratifyWorkspace />
      <NotificationDrawer />
      <SettingsModal />
      <SearchModal />
      <TaskModal />
      <AgentInspectorModal />
      <MobileConnectModal 
        isOpen={isMobileModalOpen} 
        onClose={() => setIsMobileModalOpen(false)} 
      />
      <AgentCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </DesktopFrame>
  );
};

export const App: React.FC = () => {
  return (
    <WorkspaceProvider>
      <WorkspaceRoot />
    </WorkspaceProvider>
  );
};

export default App;
