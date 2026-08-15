import React from 'react';
import { LeftOfficePane } from './LeftOfficePane';
import { CenterTerminalPane } from './CenterTerminalPane';
import { RightToolPane } from './RightToolPane';
import { BottomCommandBar } from './BottomCommandBar';

export const MuratifyWorkspace: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#0A0C13]">
      {/* 3-Column Split Workspace */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <LeftOfficePane />
        <CenterTerminalPane />
        <RightToolPane />
      </div>

      {/* Persistent Global Command Bar */}
      <BottomCommandBar />
    </div>
  );
};
