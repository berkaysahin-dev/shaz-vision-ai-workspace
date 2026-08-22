import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { PaneId, LayoutPreset, ColumnLayout, WorkspaceLayoutConfig } from '../../types/layout';
import { LeftOfficePane } from '../muratify/LeftOfficePane';
import { CenterTerminalPane } from '../muratify/CenterTerminalPane';
import { RightToolPane } from '../muratify/RightToolPane';
import { LargePixelOffice } from '../office/LargePixelOffice';
import { sound } from '../../services/soundEngine';
import { 
  GripVertical, 
  Maximize2, 
  Minimize2, 
  EyeOff, 
  RotateCcw, 
  LayoutGrid, 
  Columns3, 
  Columns2, 
  Sparkles, 
  Plus, 
  Check,
  Move
} from 'lucide-react';

const PRESET_CONFIGS: Record<LayoutPreset, ColumnLayout[]> = {
  'default-3col': [
    { id: 'col-left', title: 'Virtual Pixel Office', widthPercent: 32, paneIds: ['office'] },
    { id: 'col-center', title: 'Tiled Terminals & Code', widthPercent: 40, paneIds: ['terminals'] },
    { id: 'col-right', title: 'Tasks, Browser & Tools', widthPercent: 28, paneIds: ['tasks'] },
  ],
  'office-focus': [
    { id: 'col-1', title: 'Grand AI Office Floor', widthPercent: 60, paneIds: ['office'] },
    { id: 'col-2', title: 'Terminals & Tasks Hub', widthPercent: 40, paneIds: ['terminals', 'tasks'] },
  ],
  'terminal-focus': [
    { id: 'col-1', title: 'Concurrent Terminal Grid', widthPercent: 70, paneIds: ['terminals'] },
    { id: 'col-2', title: 'Office & Tasks', widthPercent: 30, paneIds: ['office', 'tasks'] },
  ],
  'devops-browser': [
    { id: 'col-1', title: 'Code & Terminals', widthPercent: 50, paneIds: ['terminals'] },
    { id: 'col-2', title: 'Live Browser & Tools', widthPercent: 50, paneIds: ['tasks', 'office'] },
  ],
  'compact-duo': [
    { id: 'col-1', title: 'Office & Tasks', widthPercent: 50, paneIds: ['office', 'tasks'] },
    { id: 'col-2', title: 'Terminals & Tools', widthPercent: 50, paneIds: ['terminals'] },
  ],
  'custom': [],
};

export const CustomizableWorkspace: React.FC = () => {
  const [layout, setLayout] = useState<WorkspaceLayoutConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('shaz_workspace_layout_v1');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      preset: 'default-3col',
      columns: PRESET_CONFIGS['default-3col'],
    };
  });

  const [draggedPane, setDraggedPane] = useState<{ paneId: PaneId; fromColId: string } | null>(null);
  const [maximizedPaneId, setMaximizedPaneId] = useState<PaneId | null>(null);
  const [hiddenPanes, setHiddenPanes] = useState<PaneId[]>([]);
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);

  // Persist layout changes
  useEffect(() => {
    try {
      localStorage.setItem('shaz_workspace_layout_v1', JSON.stringify(layout));
    } catch (e) {}
  }, [layout]);

  const handleApplyPreset = (preset: LayoutPreset) => {
    sound.playClick();
    setLayout({
      preset,
      columns: PRESET_CONFIGS[preset] || PRESET_CONFIGS['default-3col'],
    });
    setMaximizedPaneId(null);
    setHiddenPanes([]);
    setShowLayoutMenu(false);
  };

  const handleResetLayout = () => {
    handleApplyPreset('default-3col');
  };

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, paneId: PaneId, fromColId: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ paneId, fromColId }));
    setDraggedPane({ paneId, fromColId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnColumn = (e: React.DragEvent, toColId: string) => {
    e.preventDefault();
    if (!draggedPane) return;

    const { paneId, fromColId } = draggedPane;
    if (fromColId === toColId) return;

    sound.playClick();

    setLayout((prev) => {
      const newCols = prev.columns.map((col) => {
        if (col.id === fromColId) {
          return { ...col, paneIds: col.paneIds.filter((p) => p !== paneId) };
        }
        if (col.id === toColId) {
          return { ...col, paneIds: [...col.paneIds, paneId] };
        }
        return col;
      });

      return {
        preset: 'custom',
        columns: newCols,
      };
    });

    setDraggedPane(null);
  };

  const handleToggleHidePane = (paneId: PaneId) => {
    sound.playClick();
    if (hiddenPanes.includes(paneId)) {
      setHiddenPanes(hiddenPanes.filter((p) => p !== paneId));
    } else {
      setHiddenPanes([...hiddenPanes, paneId]);
    }
  };

  // Render specific pane contents
  const renderPaneContent = (paneId: PaneId) => {
    switch (paneId) {
      case 'office':
        return <LeftOfficePane />;
      case 'terminals':
        return <CenterTerminalPane />;
      case 'tasks':
      case 'browser':
      case 'mcp':
      case 'reports':
        return <RightToolPane />;
      case 'code':
        return <CenterTerminalPane />;
      default:
        return <LeftOfficePane />;
    }
  };

  // If a pane is maximized to full screen
  if (maximizedPaneId) {
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-[#0A0C13] overflow-hidden relative">
        <div className="h-9 bg-[#111624] border-b border-[#1E273A] px-3 flex items-center justify-between z-30 shrink-0">
          <span className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            MAXIMIZED: {maximizedPaneId}
          </span>
          <button
            onClick={() => { sound.playClick(); setMaximizedPaneId(null); }}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-white rounded-lg flex items-center gap-1 border border-slate-700"
          >
            <Minimize2 className="w-3 h-3" />
            Restore Layout
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden flex">
          {renderPaneContent(maximizedPaneId)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#0A0C13]">
      {/* Workspace Quick Layout Control Bar */}
      <div className="h-7 bg-[#0D1019] border-b border-[#1A2234] px-3 flex items-center justify-between text-[11px] text-slate-400 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-slate-300 font-bold">
            <Move className="w-3 h-3 text-cyan-400" />
            <span>DRAG & DROP WORKSPACE:</span>
          </div>

          <div className="flex items-center gap-1">
            {[
              { id: 'default-3col', label: '3-Column Grid' },
              { id: 'office-focus', label: 'Office Focus' },
              { id: 'terminal-focus', label: 'Terminal Focus' },
              { id: 'devops-browser', label: 'Browser & DevOps' },
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id as LayoutPreset)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  layout.preset === preset.id
                    ? 'bg-purple-600 text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hiddenPanes.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-amber-400 font-bold">Hidden:</span>
              {hiddenPanes.map((p) => (
                <button
                  key={p}
                  onClick={() => handleToggleHidePane(p)}
                  className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-slate-300 hover:text-white border border-slate-700"
                >
                  +{p}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleResetLayout}
            title="Reset to default 3 columns"
            className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Customizable Multi-Column Layout Body */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {layout.columns.map((column) => {
          const visiblePaneIds = column.paneIds.filter((p) => !hiddenPanes.includes(p));

          return (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropOnColumn(e, column.id)}
              className="flex-1 flex flex-col min-h-0 min-w-0 border-r border-[#1E273A] last:border-r-0 relative group/col transition-all"
              style={{ flexBasis: `${column.widthPercent}%` }}
            >
              {visiblePaneIds.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-[#1E2538] m-2 rounded-2xl bg-[#090C14]/40">
                  <LayoutGrid className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-xs text-slate-400 font-bold">Drop any panel here</p>
                  <p className="text-[10px] text-slate-600">Drag a header tab to dock in this column</p>
                </div>
              ) : (
                visiblePaneIds.map((paneId) => (
                  <div
                    key={paneId}
                    className="flex-1 flex flex-col min-h-0 overflow-hidden relative"
                  >
                    {/* Draggable Pane Header Grip Bar */}
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, paneId, column.id)}
                      className="h-6 bg-[#0E121D] border-b border-[#1A2234] px-2.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none text-[10px] text-slate-400 hover:bg-[#141A29] transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <GripVertical className="w-3 h-3 text-slate-500 hover:text-slate-300" />
                        <span className="font-bold uppercase tracking-wider text-slate-300">
                          {paneId}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { sound.playClick(); setMaximizedPaneId(paneId); }}
                          title="Maximize pane"
                          className="p-0.5 hover:text-white"
                        >
                          <Maximize2 className="w-2.5 h-2.5" />
                        </button>
                        <button
                          onClick={() => handleToggleHidePane(paneId)}
                          title="Hide pane"
                          className="p-0.5 hover:text-white"
                        >
                          <EyeOff className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>

                    {/* Pane Content */}
                    <div className="flex-1 flex min-h-0 overflow-hidden">
                      {renderPaneContent(paneId)}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
