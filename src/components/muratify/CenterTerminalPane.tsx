import React, { useState } from 'react';
import { Minus, Square, ExternalLink, Columns, Terminal, FileCode, Plus, Trash2, Save, Check } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';

export const CenterTerminalPane: React.FC = () => {
  const {
    terminalPanes,
    addTerminalPane,
    closeTerminalPane,
    clearTerminalPane,
    addTerminalLine,
    centerTab,
    setCenterTab,
    codeFiles,
    selectedFileId,
    setSelectedFileId,
    updateFileContent,
    t,
  } = useWorkspace();

  const [inputCommands, setInputCommands] = useState<Record<string, string>>({});
  const [editorText, setEditorText] = useState<string>(
    codeFiles.find((f) => f.id === selectedFileId)?.content || ''
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSelectFile = (fileId: string) => {
    sound.playClick();
    setSelectedFileId(fileId);
    const file = codeFiles.find((f) => f.id === fileId);
    if (file) setEditorText(file.content);
    setIsSaved(false);
  };

  const handleSaveFile = () => {
    sound.playSuccess();
    updateFileContent(selectedFileId, editorText);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleRunCommandInPane = (e: React.FormEvent, paneId: string) => {
    e.preventDefault();
    const cmd = inputCommands[paneId];
    if (!cmd || !cmd.trim()) return;

    sound.playTerminalTick();
    addTerminalLine(paneId, `$ ${cmd}`);
    setInputCommands((prev) => ({ ...prev, [paneId]: '' }));

    setTimeout(() => {
      const clean = cmd.trim().toLowerCase();
      if (clean === 'test') {
        addTerminalLine(paneId, '✓ 14/14 tests passed in 0.84s (Vitest)');
      } else if (clean === 'build') {
        addTerminalLine(paneId, '✓ Next.js 15 SSR bundle compiled (93.1 kB)');
      } else if (clean === 'scan') {
        addTerminalLine(paneId, '🛡 OWASP Security Audit: 0 vulnerabilities found');
      } else if (clean === 'clear') {
        clearTerminalPane(paneId);
      } else {
        addTerminalLine(paneId, `+ process executed: ${cmd}`);
      }
    }, 400);
  };

  return (
    <div
      className="w-full h-full flex-1 flex flex-col overflow-hidden select-none min-w-0 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--app-bg-dark, #0A0C13)',
      }}
    >
      {/* Center Sub-Header Tabs */}
      <div
        className="h-8 border-b px-3 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0 transition-colors duration-300"
        style={{
          backgroundColor: 'var(--app-bg-panel, #141824)',
          borderColor: 'var(--app-border, #1E2333)',
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              sound.playClick();
              setCenterTab('terminal');
            }}
            className="flex items-center gap-2 font-bold transition-colors"
            style={{
              color: centerTab === 'terminal' ? 'var(--app-text-accent, #FECDD3)' : '#64748B',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--app-accent, #E0564C)' }}
            />
            <span>{t.terminals}</span>
            <span className="text-[10px] text-slate-500 font-normal">
              {terminalPanes.length} {t.terminalSub}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setCenterTab('code');
            }}
            className="flex items-center gap-1.5 transition-colors"
            style={{
              color: centerTab === 'code' ? 'var(--app-text-accent, #FECDD3)' : '#64748B',
            }}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{t.codeWorkspace}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <button
            onClick={addTerminalPane}
            title={t.newShell}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] border transition-colors"
            style={{
              backgroundColor: 'var(--app-bg-surface, #1A2133)',
              borderColor: 'var(--app-border, #2E3C5C)',
              color: 'var(--app-text-accent, #FECDD3)',
            }}
          >
            <Plus className="w-3 h-3" />
            <span>{t.newShell}</span>
          </button>
        </div>
      </div>

      {/* Main View Area: Either Multi-Terminal Tiled Grid OR Code Explorer */}
      {centerTab === 'terminal' ? (
        <div className="flex-1 p-2 gap-2 flex flex-col min-h-0 overflow-y-auto">
          {/* Top Row: 2 Split Terminals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 min-h-[220px]">
            {terminalPanes.slice(0, 2).map((pane) => (
              <div
                key={pane.id}
                className="border rounded-lg flex flex-col justify-between overflow-hidden shadow-lg transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--app-terminal-bg, #06080F)',
                  borderColor: 'var(--app-border, #1C2234)',
                }}
              >
                {/* Title Bar */}
                <div
                  className="h-7 border-b px-2.5 flex items-center justify-between text-[11px] font-mono transition-colors duration-300"
                  style={{
                    backgroundColor: 'var(--app-terminal-header, #0F131E)',
                    borderColor: 'var(--app-border, #1A2030)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-xs bg-emerald-400" />
                    <span className="font-bold text-slate-200">{pane.taskId}</span>
                    <span
                      className="text-[9px] px-1.5 py-0.2 rounded font-bold border"
                      style={{
                        backgroundColor: 'var(--app-badge-bg, rgba(224, 86, 76, 0.2))',
                        borderColor: 'var(--app-border, #E0564C)',
                        color: 'var(--app-text-accent, #FECDD3)',
                      }}
                    >
                      {pane.model}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <button
                      onClick={() => clearTerminalPane(pane.id)}
                      title="Clear"
                      className="hover:text-slate-300"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={() => closeTerminalPane(pane.id)}
                      title="Close pane"
                      className="hover:text-red-400"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>

                {/* Logs Stream */}
                <div className="flex-1 p-2.5 overflow-y-auto space-y-1 text-xs font-mono leading-relaxed text-slate-300 scanline-effect">
                  {pane.lines.map((line, idx) => (
                    <div key={idx} className="whitespace-pre-wrap">
                      {line.startsWith('$') ? (
                        <span className="text-slate-200 font-bold">{line}</span>
                      ) : line.startsWith('▸') ? (
                        <span style={{ color: 'var(--app-accent, #E0564C)' }} className="font-semibold">{line}</span>
                      ) : line.startsWith('●') ? (
                        <span className="text-cyan-400 font-bold">{line}</span>
                      ) : line.startsWith('+') ? (
                        <span className="text-emerald-400">{line}</span>
                      ) : (
                        <span className="text-slate-400">{line}</span>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center gap-1 font-bold" style={{ color: 'var(--app-text-accent, #FECDD3)' }}>
                    <span>{t.reading} {pane.currentFile}</span>
                    <span
                      className="w-1.5 h-3 animate-pulse inline-block"
                      style={{ backgroundColor: 'var(--app-accent, #E0564C)' }}
                    />
                  </div>
                </div>

                {/* CLI Input Prompt */}
                <form
                  onSubmit={(e) => handleRunCommandInPane(e, pane.id)}
                  className="h-7 border-t px-2 flex items-center gap-1.5 transition-colors duration-300"
                  style={{
                    backgroundColor: 'var(--app-bg-dark, #0C0F17)',
                    borderColor: 'var(--app-border, #181E2E)',
                  }}
                >
                  <span style={{ color: 'var(--app-accent, #E0564C)' }} className="font-bold text-[11px]">$</span>
                  <input
                    type="text"
                    value={inputCommands[pane.id] || ''}
                    onChange={(e) =>
                      setInputCommands((prev) => ({ ...prev, [pane.id]: e.target.value }))
                    }
                    placeholder={t.typeCommandHint}
                    className="flex-1 bg-transparent text-[11px] font-mono text-slate-200 outline-none placeholder-slate-600"
                  />
                </form>
              </div>
            ))}
          </div>

          {/* Bottom Wide Terminal: 3rd Terminal */}
          {terminalPanes[2] && (
            <div
              className="border rounded-lg flex flex-col justify-between overflow-hidden shadow-lg h-44 transition-colors duration-300"
              style={{
                backgroundColor: 'var(--app-terminal-bg, #06080F)',
                borderColor: 'var(--app-border, #1C2234)',
              }}
            >
              <div
                className="h-7 border-b px-2.5 flex items-center justify-between text-[11px] font-mono transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--app-terminal-header, #0F131E)',
                  borderColor: 'var(--app-border, #1A2030)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-xs bg-emerald-400" />
                  <span className="font-bold text-slate-200">{terminalPanes[2].agentName}</span>
                  <span
                    className="text-[9px] px-1.5 py-0.2 rounded font-bold border"
                    style={{
                      backgroundColor: 'var(--app-badge-bg, rgba(224, 86, 76, 0.2))',
                      borderColor: 'var(--app-border, #E0564C)',
                      color: 'var(--app-text-accent, #FECDD3)',
                    }}
                  >
                    {terminalPanes[2].model}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <button
                    onClick={() => clearTerminalPane(terminalPanes[2].id)}
                    className="hover:text-slate-300"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                  <button
                    onClick={() => closeTerminalPane(terminalPanes[2].id)}
                    className="hover:text-red-400"
                  >
                    <Minus className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-2.5 overflow-y-auto space-y-1 text-xs font-mono leading-relaxed text-slate-300 scanline-effect">
                {terminalPanes[2].lines.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">
                    {line.startsWith('$') ? (
                      <span className="text-slate-200 font-bold">{line}</span>
                    ) : line.startsWith('▸') ? (
                      <span style={{ color: 'var(--app-accent, #E0564C)' }} className="font-semibold">{line}</span>
                    ) : line.startsWith('●') ? (
                      <span className="text-cyan-400 font-bold">{line}</span>
                    ) : line.startsWith('+') ? (
                      <span className="text-emerald-400">{line}</span>
                    ) : (
                      <span className="text-slate-400">{line}</span>
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  <span>+ await page.click('#submit-order')</span>
                  <span className="w-1.5 h-3 bg-emerald-400 animate-pulse inline-block" />
                </div>
              </div>

              <form
                onSubmit={(e) => handleRunCommandInPane(e, terminalPanes[2].id)}
                className="h-7 border-t px-2 flex items-center gap-1.5 transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--app-bg-dark, #0C0F17)',
                  borderColor: 'var(--app-border, #181E2E)',
                }}
              >
                <span style={{ color: 'var(--app-accent, #E0564C)' }} className="font-bold text-[11px]">$</span>
                <input
                  type="text"
                  value={inputCommands[terminalPanes[2].id] || ''}
                  onChange={(e) =>
                    setInputCommands((prev) => ({ ...prev, [terminalPanes[2].id]: e.target.value }))
                  }
                  placeholder={t.typeCommandHint}
                  className="flex-1 bg-transparent text-[11px] font-mono text-slate-200 outline-none placeholder-slate-600"
                />
              </form>
            </div>
          )}
        </div>
      ) : (
        /* Code Workspace Mode */
        <div
          className="flex-1 flex flex-col min-h-0 transition-colors duration-300"
          style={{ backgroundColor: 'var(--app-bg-dark, #070910)' }}
        >
          {/* File Tabs */}
          <div
            className="h-8 border-b px-2 flex items-center justify-between text-xs font-mono transition-colors duration-300"
            style={{
              backgroundColor: 'var(--app-bg-panel, #0E111A)',
              borderColor: 'var(--app-border, #1E2436)',
            }}
          >
            <div className="flex items-center gap-1 overflow-x-auto">
              {codeFiles.map((file) => {
                const isSelected = selectedFileId === file.id;
                return (
                  <button
                    key={file.id}
                    onClick={() => handleSelectFile(file.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-t-md text-xs font-mono transition-all"
                    style={{
                      backgroundColor: isSelected ? 'var(--app-bg-surface, #151926)' : 'transparent',
                      color: isSelected ? 'var(--app-text-accent, #FECDD3)' : '#94A3B8',
                      borderTop: isSelected ? '2px solid var(--app-accent, #E0564C)' : 'none',
                      fontWeight: isSelected ? 'bold' : 'normal',
                    }}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{file.name}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSaveFile}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold border transition-colors"
              style={{
                backgroundColor: 'var(--app-badge-bg, rgba(224, 86, 76, 0.2))',
                borderColor: 'var(--app-accent, #E0564C)',
                color: 'var(--app-text-accent, #FECDD3)',
              }}
            >
              {isSaved ? <Check className="w-3 h-3 text-emerald-400" /> : <Save className="w-3 h-3" />}
              <span>{isSaved ? t.saved : t.saveFile}</span>
            </button>
          </div>

          {/* Editor Body */}
          <div className="flex-1 flex overflow-hidden">
            <div
              className="w-10 border-r py-2 pr-2 select-none text-right text-[11px] font-mono text-slate-600 space-y-0.5"
              style={{
                backgroundColor: 'var(--app-bg-dark, #0A0C13)',
                borderColor: 'var(--app-border, #1C2234)',
              }}
            >
              {editorText.split('\n').map((_, idx) => (
                <div key={idx} className="h-5 leading-5">
                  {idx + 1}
                </div>
              ))}
            </div>

            <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              className="flex-1 bg-transparent p-2 text-xs font-mono text-slate-200 outline-none resize-none leading-5 overflow-y-auto whitespace-pre font-normal"
              spellCheck={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};
