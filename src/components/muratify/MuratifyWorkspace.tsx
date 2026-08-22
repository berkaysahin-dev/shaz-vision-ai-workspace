import React from 'react';
import { CustomizableWorkspace } from '../layout/CustomizableWorkspace';
import { BottomCommandBar } from './BottomCommandBar';

export const MuratifyWorkspace: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#0A0C13]">
      {/* Draggable and Customizable Multi-Pane Workspace */}
      <CustomizableWorkspace />

      {/* Persistent Global Command Bar */}
      <BottomCommandBar />
    </div>
  );
};

