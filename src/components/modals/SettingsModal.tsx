import React, { useState } from 'react';
import {
  X,
  Settings as SettingsIcon,
  Folder,
  Eye,
  Command,
  Mic,
  Cpu,
  Plug,
  Bell,
  Laptop,
  Shield,
  Users,
  User,
  Check,
  Volume2,
  VolumeX,
  Key,
  Download,
  Terminal,
  Activity,
  Zap,
  Lock,
  Radio,
  Sliders,
  AlertTriangle,
  RotateCcw,
  RefreshCw,
  FolderOpen,
  Sparkles,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';
import { THEMES, ThemeId } from '../../services/themeManager';
import { aiEngine, AIProviderId, AISettings } from '../../services/aiEngine';

type SettingsTab =
  | 'general'
  | 'appearance'
  | 'shortcuts'
  | 'voice'
  | 'models'
  | 'integrations'
  | 'notifications'
  | 'devices'
  | 'security'
  | 'permissions'
  | 'account';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    language,
    setLanguage,
    currentTheme,
    setCurrentTheme,
    isSoundMuted,
    toggleSound,
    projectDir,
    setProjectDir,
    selectProjectDirectory,
  } = useWorkspace();

  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  const [selectedThemeDraft, setSelectedThemeDraft] = useState<ThemeId>(currentTheme);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // AI & LLM Engine Settings State
  const [aiSettings, setAiSettings] = useState<AISettings>(() => aiEngine.getSettings());
  const [ollamaStatus, setOllamaStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');
  const [detectedOllamaModels, setDetectedOllamaModels] = useState<string[]>([]);
  const [ollamaErrorMsg, setOllamaErrorMsg] = useState<string>('');

  // Form states for all tabs
  const [workspaceName, setWorkspaceName] = useState('Shaz Vision AI Workspace');
  const [supervisorName, setSupervisorName] = useState('Berkay Şahin (BS)');
  const [speechRate, setSpeechRate] = useState('1.0');
  const [voiceStyle, setVoiceStyle] = useState('synth_8bit');
  const [safetyMode, setSafetyMode] = useState<'supervised' | 'autonomous' | 'strict'>('supervised');
  const [autoSandbox, setAutoSandbox] = useState(true);
  const [owaspScan, setOwaspScan] = useState(true);
  const [notifSound, setNotifSound] = useState(true);
  const [notifErrors, setNotifErrors] = useState(true);
  const [notifDesktop, setNotifDesktop] = useState(true);

  // Sync draft when opened
  React.useEffect(() => {
    if (isSettingsOpen) {
      setSelectedThemeDraft(currentTheme);
      setAiSettings(aiEngine.getSettings());
      setSavedSuccess(false);
    }
  }, [isSettingsOpen, currentTheme]);

  const handleTestOllama = async () => {
    sound.playClick();
    setOllamaStatus('checking');
    setOllamaErrorMsg('');
    const res = await aiEngine.testOllamaConnection(aiSettings.ollamaEndpoint);
    if (res.success) {
      sound.playSuccess();
      setOllamaStatus('connected');
      setDetectedOllamaModels(res.models);
      if (res.models.length > 0 && !res.models.includes(aiSettings.ollamaModel)) {
        setAiSettings((prev) => ({ ...prev, ollamaModel: res.models[0] }));
      }
    } else {
      setOllamaStatus('error');
      setOllamaErrorMsg(res.error || 'Connection failed');
    }
  };

  const handleSaveAISetting = (key: keyof AISettings, value: any) => {
    setAiSettings((prev) => {
      const updated = { ...prev, [key]: value };
      aiEngine.updateSettings(updated);
      return updated;
    });
  };

  if (!isSettingsOpen) return null;

  const handleSelectTheme = (themeId: ThemeId) => {
    sound.playClick();
    setSelectedThemeDraft(themeId);
    setCurrentTheme(themeId);
  };

  const handleSave = () => {
    sound.playSuccess();
    setCurrentTheme(selectedThemeDraft);
    setSavedSuccess(true);
    setTimeout(() => {
      setIsSettingsOpen(false);
    }, 400);
  };

  const handleClose = () => {
    sound.playClick();
    setIsSettingsOpen(false);
  };

  const handleExportConfig = () => {
    sound.playSuccess();
    const configData = {
      workspaceName,
      supervisorName,
      language,
      theme: currentTheme,
      safetyMode,
      exportedAt: new Date().toISOString(),
      version: '0.3.0-BETA',
      author: '@berkaysahin-dev',
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shaz-vision-workspace-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabLabelsTr: Record<SettingsTab, string> = {
    general: 'Genel',
    appearance: 'Görünüm',
    shortcuts: 'Kısayollar',
    voice: 'Ses & Agent X',
    models: 'AI Motorları',
    integrations: 'Entegrasyonlar',
    notifications: 'Bildirimler',
    devices: 'Cihazlar',
    security: 'Güven',
    permissions: 'Takım İzinleri',
    account: 'Hesap',
  };

  const tabLabelsEn: Record<SettingsTab, string> = {
    general: 'General',
    appearance: 'Appearance',
    shortcuts: 'Shortcuts',
    voice: 'Voice & Agent X',
    models: 'AI Models',
    integrations: 'Integrations',
    notifications: 'Notifications',
    devices: 'Devices',
    security: 'Security',
    permissions: 'Team Permissions',
    account: 'Account',
  };

  const currentTabName = language === 'tr' ? tabLabelsTr[activeTab] : tabLabelsEn[activeTab];
  const settingsTitle = language === 'tr' ? 'Ayarlar' : 'Settings';

  const themeList: ThemeId[] = [
    'night_shift',
    'deep',
    'charcoal',
    'phosphor',
    'espresso',
    'obsidian',
    'sonar',
    'forest',
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 select-none font-mono"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-4xl bg-[#111319] border border-[#222736] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[640px] max-h-[92vh] animate-in zoom-in-95 duration-150 text-slate-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Breadcrumb & Close */}
        <div className="h-12 bg-[#151923] border-b border-[#222838] px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold">
            <div className="p-1 rounded bg-[#1F2536] text-slate-300 border border-[#2E374D]">
              <SettingsIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-400">{settingsTitle}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-100">{currentTabName}</span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#202738] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Body: Left Sidebar + Right Content Area */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Left Sidebar Menu */}
          <div className="w-52 bg-[#0D0F15] border-r border-[#1F2433] p-3 flex flex-col justify-between overflow-y-auto space-y-4 shrink-0 text-[11px]">
            <div className="space-y-4">
              {/* Category 1: Çalışma Alanı */}
              <div className="space-y-1">
                <div className="text-[9px] font-bold text-slate-500 uppercase px-2 py-0.5 tracking-wider">
                  {language === 'tr' ? 'Çalışma alanı' : 'Workspace'}
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('general');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'general'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Genel' : 'General'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('appearance');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'appearance'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Görünüm' : 'Appearance'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('shortcuts');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'shortcuts'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <Command className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Kısayollar' : 'Shortcuts'}</span>
                </button>
              </div>

              {/* Category 2: Ajanlar */}
              <div className="space-y-1">
                <div className="text-[9px] font-bold text-slate-500 uppercase px-2 py-0.5 tracking-wider">
                  {language === 'tr' ? 'Ajanlar' : 'Agents'}
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('voice');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'voice'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Ses & Agent X' : 'Voice & Agent X'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('models');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'models'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'AI Motorları' : 'AI Models'}</span>
                </button>
              </div>

              {/* Category 3: Bağlantılar */}
              <div className="space-y-1">
                <div className="text-[9px] font-bold text-slate-500 uppercase px-2 py-0.5 tracking-wider">
                  {language === 'tr' ? 'Bağlantılar' : 'Connections'}
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('integrations');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'integrations'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <Plug className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Entegrasyonlar' : 'Integrations'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('notifications');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Bildirimler' : 'Notifications'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('devices');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'devices'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Cihazlar' : 'Devices'}</span>
                </button>
              </div>

              {/* Category 4: Güvenlik & Hesap */}
              <div className="space-y-1">
                <div className="text-[9px] font-bold text-slate-500 uppercase px-2 py-0.5 tracking-wider">
                  {language === 'tr' ? 'Güvenlik & hesap' : 'Security & Account'}
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('security');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'security'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Güven' : 'Trust'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('permissions');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'permissions'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Takım İzinleri' : 'Team Permissions'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('account');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeTab === 'account'
                      ? 'bg-[#2E1916] text-[#FFA494] font-bold border border-[#7A362E]'
                      : 'text-slate-400 hover:bg-[#161922] hover:text-slate-200'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Hesap' : 'Account'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Main Content Panel */}
          <div className="flex-1 bg-[#10121A] p-5 overflow-y-auto min-h-0">
            {/* =========================================================================
                TAB 1: GÖRÜNÜM (THEMES GRID)
               ========================================================================= */}
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {themeList.map((thId) => {
                    const th = THEMES[thId];
                    const isSelected = selectedThemeDraft === thId;

                    return (
                      <div
                        key={thId}
                        onClick={() => handleSelectTheme(thId)}
                        className={`rounded-xl p-3 bg-[#151722] border transition-all cursor-pointer space-y-2 relative group ${
                          isSelected
                            ? 'border-[#E0564C] shadow-[0_0_12px_rgba(224,86,76,0.35)] ring-1 ring-[#E0564C]'
                            : 'border-[#222736] hover:border-slate-600 hover:bg-[#181C28]'
                        }`}
                      >
                        <div
                          className="w-full h-16 rounded-lg p-2 flex flex-col justify-between border relative overflow-hidden font-mono text-[9px]"
                          style={{
                            backgroundColor: th.terminalBg,
                            borderColor: th.borderColor,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-2 h-2 rounded-xs shadow-xs"
                                style={{ backgroundColor: th.accentColor }}
                              />
                              <span className="text-slate-300 font-bold text-[8px]">
                                {language === 'tr' ? '> ajan çalışıyor..' : '> agent running..'}
                              </span>
                            </div>
                            <div className="flex flex-col gap-0.5 items-end">
                              <div className="w-3 h-0.5 bg-slate-500 rounded-full" />
                              <div className="w-2 h-0.5 bg-slate-600 rounded-full" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[8px]">
                            <span className="text-slate-400">
                              {language === 'tr' ? 'build ✓ temiz' : 'build ✓ clean'}
                            </span>
                            <span
                              className="w-1.5 h-1.5 rounded-xs"
                              style={{ backgroundColor: th.accentColor }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-100">
                              {language === 'tr' ? th.name : th.nameEn}
                            </span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-[#E0564C]" />
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                            {language === 'tr' ? th.description : th.descriptionEn}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 2: GENEL (GENERAL)
               ========================================================================= */}
            {activeTab === 'general' && (
              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#151722] border border-[#222736] space-y-3">
                  <div className="font-bold text-slate-100 text-sm">
                    {language === 'tr' ? 'Çalışma Alanı Kimliği' : 'Workspace Identity'}
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold">
                      {language === 'tr' ? 'Çalışma Alanı Adı' : 'Workspace Name'}
                    </label>
                    <input
                      type="text"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold">
                      {language === 'tr' ? 'Baş Süpervizör' : 'Lead Supervisor'}
                    </label>
                    <input
                      type="text"
                      value={supervisorName}
                      onChange={(e) => setSupervisorName(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-200 outline-none"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#151722] border border-[#222736] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100">
                      {language === 'tr' ? 'Arayüz Dili' : 'Interface Language'}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {language === 'tr'
                        ? 'Türkçe ve İngilizce arasında anlık geçiş yapın.'
                        : 'Switch instantly between Turkish and English.'}
                    </div>
                  </div>
                  <div className="flex gap-1.5 bg-[#0D0F15] p-1 rounded-lg border border-[#232838]">
                    <button
                      onClick={() => setLanguage('tr')}
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        language === 'tr' ? 'bg-[#E0564C] text-white' : 'text-slate-400'
                      }`}
                    >
                      Türkçe
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        language === 'en' ? 'bg-[#E0564C] text-white' : 'text-slate-400'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#151722] border border-[#222736] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100">
                      {language === 'tr' ? '8-Bit Retro Ses Motoru' : '8-Bit Retro Sound Engine'}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {language === 'tr'
                        ? 'Tuş vuruşları, konuşma ve işlem tamamlama melodileri.'
                        : 'Key clicks, speech synthesis, and task melodies.'}
                    </div>
                  </div>
                  <button
                    onClick={toggleSound}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 ${
                      !isSoundMuted
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                        : 'bg-[#181C26] text-slate-400 border-[#2A334A]'
                    }`}
                  >
                    {!isSoundMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span>{!isSoundMuted ? (language === 'tr' ? 'AÇIK' : 'ON') : (language === 'tr' ? 'KAPALI' : 'OFF')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 3: KISAYOLLAR (SHORTCUTS)
               ========================================================================= */}
            {activeTab === 'shortcuts' && (
              <div className="space-y-3 text-xs font-mono">
                <div className="font-bold text-slate-100 text-sm mb-2">
                  {language === 'tr' ? 'Klavye Kısayolları' : 'Keyboard Shortcuts'}
                </div>
                {[
                  { key: '⌘ + K / Ctrl + K', desc: language === 'tr' ? 'Hızlı Komut Paleti & Arama' : 'Global Command Palette & Search', tag: 'Global' },
                  { key: '⌘ / Ctrl (Basılı Tut)', desc: language === 'tr' ? 'Agent X Bas-Konuş Modu' : 'Agent X Push-to-Talk', tag: 'Voice' },
                  { key: 'Esc', desc: language === 'tr' ? 'Açık Modalı / Çekmeceyi Kapat' : 'Close Active Modal / Drawer', tag: 'UI' },
                  { key: '⌘ + 1 / 2 / 3', desc: language === 'tr' ? 'Departman Takımları Arasında Geçiş' : 'Switch Department Teams', tag: 'Teams' },
                  { key: '⌘ + S', desc: language === 'tr' ? 'Kod Çalışma Alanındaki Dosyayı Kaydet' : 'Save Active File in Workspace', tag: 'Code' },
                  { key: 'F5 / Ctrl + R', desc: language === 'tr' ? 'Tarayıcı DOM Önizlemesini Yenile' : 'Reload Browser Workspace', tag: 'Browser' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#151722] border border-[#222736] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1F2536] text-purple-300 font-bold">
                        {item.tag}
                      </span>
                      <span className="text-slate-300">{item.desc}</span>
                    </div>
                    <kbd className="px-2 py-0.5 rounded bg-[#0D0F15] border border-[#282F44] text-[10px] text-cyan-300 font-bold">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            )}

            {/* =========================================================================
                TAB 4: SES & AGENT X (VOICE)
               ========================================================================= */}
            {activeTab === 'voice' && (
              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#151722] border border-[#222736] space-y-3">
                  <div className="font-bold text-slate-100 text-sm">
                    {language === 'tr' ? 'Agent X Ses Motoru Ayarları' : 'Agent X Voice Synthesis'}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'synth_8bit', label: '8-Bit Retro Synth' },
                      { id: 'neural_pro', label: 'Neural Studio Pro' },
                      { id: 'echo_ai', label: 'Echo Cybernetic' },
                      { id: 'pulse_64', label: 'Commodore 64 Wave' },
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          sound.playAgentPing();
                          setVoiceStyle(v.id);
                        }}
                        className={`p-2 rounded-lg border text-left flex items-center justify-between transition-all ${
                          voiceStyle === v.id
                            ? 'bg-[#2E1916] text-[#FFA494] border-[#7A362E] font-bold'
                            : 'bg-[#0D0F15] border-[#222736] text-slate-400'
                        }`}
                      >
                        <span>{v.label}</span>
                        {voiceStyle === v.id && <Radio className="w-3 h-3 text-[#FFA494]" />}
                      </button>
                    ))}
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>{language === 'tr' ? 'Konuşma Hızı' : 'Speech Rate'}</span>
                      <span className="text-cyan-300 font-bold">{speechRate}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={speechRate}
                      onChange={(e) => setSpeechRate(e.target.value)}
                      className="w-full accent-[#E0564C]"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#151722] border border-[#222736] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100">
                      {language === 'tr' ? 'Bas-Konuş (Push-to-Talk) Kısayolu' : 'Push-to-Talk Hotkey'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {language === 'tr' ? 'Mikrofonu aktif etmek için tuşu basılı tutun.' : 'Hold key to broadcast voice prompt.'}
                    </div>
                  </div>
                  <kbd className="px-2.5 py-1 rounded bg-[#0D0F15] border border-purple-500/40 text-purple-300 text-xs font-bold">
                    ⌘ Command
                  </kbd>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 5: AI MOTORLARI (MODELS)
               ========================================================================= */}
            {activeTab === 'models' && (
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <div className="font-bold text-slate-100 text-sm mb-1 flex items-center justify-between">
                    <span>{language === 'tr' ? 'Aktif Yapay Zeka Motoru' : 'Active AI Engine Provider'}</span>
                    <span className="text-[10px] text-cyan-300 font-normal">
                      {aiSettings.activeProvider.toUpperCase()} ACTIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {language === 'tr'
                      ? 'Ajanların ve Agent X orkestrasyonunun kullandığı yapay zeka sağlayıcısını seçin.'
                      : 'Select the LLM provider used by all autonomous agents and Agent X.'}
                  </p>
                </div>

                {/* Provider Selector Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { id: 'ollama' as AIProviderId, name: 'Ollama', tag: 'Local & Free', color: 'text-emerald-400 border-emerald-500/40' },
                    { id: 'gemini' as AIProviderId, name: 'Google Gemini', tag: 'Cloud API', color: 'text-cyan-400 border-cyan-500/40' },
                    { id: 'anthropic' as AIProviderId, name: 'Claude', tag: 'Anthropic', color: 'text-purple-400 border-purple-500/40' },
                    { id: 'openai' as AIProviderId, name: 'OpenAI', tag: 'GPT-4o / Codex', color: 'text-green-400 border-green-500/40' },
                    { id: 'deepseek' as AIProviderId, name: 'DeepSeek', tag: 'V3 / Coder', color: 'text-blue-400 border-blue-500/40' },
                    { id: 'groq' as AIProviderId, name: 'Groq LPU', tag: 'Ultra Fast', color: 'text-orange-400 border-orange-500/40' },
                    { id: 'simulated' as AIProviderId, name: 'Simulated', tag: 'Offline Fallback', color: 'text-pink-400 border-pink-500/40' },
                  ].map((prov) => {
                    const isSelected = aiSettings.activeProvider === prov.id;
                    return (
                      <button
                        key={prov.id}
                        onClick={() => {
                          sound.playClick();
                          handleSaveAISetting('activeProvider', prov.id);
                        }}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? 'bg-[#1F2538] border-cyan-400 shadow-md ring-1 ring-cyan-400'
                            : 'bg-[#151722] border-[#222736] hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-100">{prov.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                        <span className={`text-[9px] mt-1 font-bold ${prov.color.split(' ')[0]}`}>
                          {prov.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* 1. Ollama Local Settings */}
                {aiSettings.activeProvider === 'ollama' && (
                  <div className="p-4 rounded-xl bg-[#151722] border border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-slate-100">Ollama Yerel Yapay Zeka Yapılandırması</span>
                      </div>
                      <button
                        onClick={handleTestOllama}
                        disabled={ollamaStatus === 'checking'}
                        className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw className={`w-3 h-3 ${ollamaStatus === 'checking' ? 'animate-spin' : ''}`} />
                        <span>{language === 'tr' ? 'Bağlantıyı Test Et & Modelleri Çek' : 'Test & Detect Models'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Ollama Endpoint URL</label>
                        <input
                          type="text"
                          value={aiSettings.ollamaEndpoint}
                          onChange={(e) => handleSaveAISetting('ollamaEndpoint', e.target.value)}
                          placeholder="http://localhost:11434"
                          className="w-full px-2.5 py-1.5 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-200 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Seçili Model</label>
                        {detectedOllamaModels.length > 0 ? (
                          <select
                            value={aiSettings.ollamaModel}
                            onChange={(e) => handleSaveAISetting('ollamaModel', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-200 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                          >
                            {detectedOllamaModels.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={aiSettings.ollamaModel}
                            onChange={(e) => handleSaveAISetting('ollamaModel', e.target.value)}
                            placeholder="llama3:latest"
                            className="w-full px-2.5 py-1.5 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-200 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                          />
                        )}
                      </div>
                    </div>

                    {ollamaStatus === 'connected' && (
                      <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-300 flex items-center justify-between">
                        <span>✓ Ollama bağlantısı başarılı! {detectedOllamaModels.length} model tespit edildi.</span>
                        <span className="font-bold">LIVE</span>
                      </div>
                    )}

                    {ollamaStatus === 'error' && (
                      <div className="p-2 rounded bg-red-950/60 border border-red-500/40 text-[10px] text-red-300">
                        ✕ Ollama bağlantı hatası: {ollamaErrorMsg}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Cloud API Keys Form */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    {language === 'tr' ? 'Bulut API Anahtarları' : 'Cloud API Credentials'}
                  </div>

                  {/* Gemini */}
                  <div className="p-3 rounded-xl bg-[#151722] border border-[#222736] space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-200">Google Gemini API Key</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                        {aiSettings.geminiKey ? 'Configured' : 'Optional'}
                      </span>
                    </div>
                    <input
                      type="password"
                      value={aiSettings.geminiKey}
                      onChange={(e) => handleSaveAISetting('geminiKey', e.target.value)}
                      placeholder="AIzaSy••••••••••••••••"
                      className="w-full px-2.5 py-1.5 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-300 text-xs outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* OpenAI */}
                  <div className="p-3 rounded-xl bg-[#151722] border border-[#222736] space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-200">OpenAI API Key</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-green-950 text-green-400 border border-green-500/30">
                        {aiSettings.openaiKey ? 'Configured' : 'Optional'}
                      </span>
                    </div>
                    <input
                      type="password"
                      value={aiSettings.openaiKey}
                      onChange={(e) => handleSaveAISetting('openaiKey', e.target.value)}
                      placeholder="sk-proj-••••••••••••••••"
                      className="w-full px-2.5 py-1.5 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-300 text-xs outline-none focus:border-green-500"
                    />
                  </div>

                  {/* Anthropic Claude */}
                  <div className="p-3 rounded-xl bg-[#151722] border border-[#222736] space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-200">Anthropic Claude API Key</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-400 border border-purple-500/30">
                        {aiSettings.anthropicKey ? 'Configured' : 'Optional'}
                      </span>
                    </div>
                    <input
                      type="password"
                      value={aiSettings.anthropicKey}
                      onChange={(e) => handleSaveAISetting('anthropicKey', e.target.value)}
                      placeholder="sk-ant-api03-••••••••••••••••"
                      className="w-full px-2.5 py-1.5 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-300 text-xs outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* DeepSeek */}
                  <div className="p-3 rounded-xl bg-[#151722] border border-[#222736] space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-200">DeepSeek API Key</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-950 text-blue-400 border border-blue-500/30">
                        {aiSettings.deepseekKey ? 'Configured' : 'Optional'}
                      </span>
                    </div>
                    <input
                      type="password"
                      value={aiSettings.deepseekKey}
                      onChange={(e) => handleSaveAISetting('deepseekKey', e.target.value)}
                      placeholder="sk-dpsk-••••••••••••••••"
                      className="w-full px-2.5 py-1.5 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-300 text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 6: ENTEGRASYONLAR (MCP & CONNECTORS)
               ========================================================================= */}
            {activeTab === 'integrations' && (
              <div className="space-y-3 text-xs font-mono">
                <div className="font-bold text-slate-100 text-sm mb-2">
                  {language === 'tr' ? 'Model Context Protocol (MCP) & Servisler' : 'MCP & Service Integrations'}
                </div>
                {[
                  { name: 'GitHub Integration (@berkaysahin-dev)', desc: 'PR review, commit signing, repository operations', status: 'Connected', active: true },
                  { name: 'PostgreSQL Database Adapter', desc: 'Query execution, schema reflection, migration inspection', status: 'Live on :5432', active: true },
                  { name: 'Headless Chromium Browser', desc: 'Autonomous DOM rendering, assertions, visual regression', status: 'Active', active: true },
                  { name: 'Local Filesystem & Ripgrep Sandbox', desc: 'Secure workspace file access and pattern search', status: 'Active', active: true },
                  { name: 'Slack & Discord Webhook Dispatcher', desc: 'Sprint completion and incident broadcasting', status: 'Standby', active: false },
                ].map((integ, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#151722] border border-[#222736] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">{integ.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{integ.desc}</div>
                    </div>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-bold border ${
                        integ.active
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-900 text-slate-500 border-slate-700'
                      }`}
                    >
                      {integ.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* =========================================================================
                TAB 7: BİLDİRİMLER (NOTIFICATIONS)
               ========================================================================= */}
            {activeTab === 'notifications' && (
              <div className="space-y-3 text-xs font-mono">
                <div className="font-bold text-slate-100 text-sm mb-2">
                  {language === 'tr' ? 'Bildirim ve Uyarı Tercihleri' : 'Notification Preferences'}
                </div>
                {[
                  { title: language === 'tr' ? 'Görev Tamamlandığında Ses Çal' : 'Play Sound on Task Completion', state: notifSound, set: setNotifSound },
                  { title: language === 'tr' ? 'Kritik Güvenlik / Hata Uyarıları' : 'Critical Security & Error Alarms', state: notifErrors, set: setNotifErrors },
                  { title: language === 'tr' ? 'Masaüstü Bildirim Bildirisi (Toast)' : 'Native Desktop Toast Notifications', state: notifDesktop, set: setNotifDesktop },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#151722] border border-[#222736] flex items-center justify-between">
                    <span className="font-bold text-slate-200">{item.title}</span>
                    <button
                      onClick={() => item.set(!item.state)}
                      className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${
                        item.state
                          ? 'bg-[#E0564C] text-white border-[#E0564C]'
                          : 'bg-[#0D0F15] text-slate-500 border-[#232838]'
                      }`}
                    >
                      {item.state ? (language === 'tr' ? 'AÇIK' : 'ON') : (language === 'tr' ? 'KAPALI' : 'OFF')}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* =========================================================================
                TAB 8: CİHAZLAR (DEVICES & RUNTIME)
               ========================================================================= */}
            {activeTab === 'devices' && (
              <div className="space-y-3 text-xs font-mono">
                <div className="font-bold text-slate-100 text-sm mb-2">
                  {language === 'tr' ? 'Masaüstü Çalışma Zamanı & Donanım' : 'Desktop Runtime & Hardware'}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-[#151722] border border-[#222736]">
                    <div className="text-[10px] text-slate-500 uppercase">SHELL RUNTIME</div>
                    <div className="font-bold text-slate-200 mt-1">Electron v33.4.11</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">● Native Desktop Host</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#151722] border border-[#222736]">
                    <div className="text-[10px] text-slate-500 uppercase">NODE.JS PROCESS</div>
                    <div className="font-bold text-slate-200 mt-1">Node v20.18.0</div>
                    <div className="text-[10px] text-cyan-300 mt-0.5">● RAM: 214 MB</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#151722] border border-[#222736]">
                    <div className="text-[10px] text-slate-500 uppercase">GRAPHICS ACCELERATION</div>
                    <div className="font-bold text-slate-200 mt-1">DirectX 12 (D3D11)</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">● 60 FPS Pixel Art Engine</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#151722] border border-[#222736]">
                    <div className="text-[10px] text-slate-500 uppercase">IPC LATENCY</div>
                    <div className="font-bold text-slate-200 mt-1">&lt; 1.0 ms</div>
                    <div className="text-[10px] text-cyan-300 mt-0.5">● Ultra Low Latency</div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 9: GÜVEN (SECURITY)
               ========================================================================= */}
            {activeTab === 'security' && (
              <div className="space-y-3 text-xs font-mono">
                <div className="font-bold text-slate-100 text-sm mb-2">
                  {language === 'tr' ? 'Otonom Çalıştırma Güvenlik Modu' : 'Autonomous Execution Safety Mode'}
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'supervised', title: language === 'tr' ? 'Denetimli Otopilot (Önerilen)' : 'Supervised Autopilot (Recommended)', desc: language === 'tr' ? 'Ajanlar kod yazar, tehlikeli komutlarda onay ister.' : 'Agents code autonomously, asks confirmation on dangerous actions.' },
                    { id: 'strict', title: language === 'tr' ? 'Sıkı Güvenlik Modu' : 'Strict Approval Mode', desc: language === 'tr' ? 'Her dosya yazma ve komut süpervizör onayı bekler.' : 'Every file write and CLI execution requires manual approval.' },
                    { id: 'autonomous', title: language === 'tr' ? 'Tam Otonom Çalışma' : 'Full Autonomous Mode', desc: language === 'tr' ? 'Ajanlar duraksamadan geliştirme yapar ve commit atar.' : 'Agents code and deploy non-stop with full shell access.' },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSafetyMode(m.id as any)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        safetyMode === m.id
                          ? 'bg-[#2E1916] text-[#FFA494] border-[#7A362E]'
                          : 'bg-[#151722] border-[#222736] text-slate-400'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{m.title}</span>
                        {safetyMode === m.id && <Check className="w-3.5 h-3.5 text-[#FFA494]" />}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{m.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-[#151722] border border-[#222736] flex items-center justify-between mt-2">
                  <div>
                    <div className="font-bold text-slate-200">{language === 'tr' ? 'OWASP Kod Güvenlik Taraması' : 'OWASP Code Security Scan'}</div>
                    <div className="text-[10px] text-slate-400">{language === 'tr' ? 'Tüm kod değişikliklerinde otomatik güvenlik denetimi.' : 'Automated vulnerability scanning on file edits.'}</div>
                  </div>
                  <button
                    onClick={() => setOwaspScan(!owaspScan)}
                    className={`px-3 py-1 rounded text-xs font-bold border ${
                      owaspScan ? 'bg-[#E0564C] text-white border-[#E0564C]' : 'bg-[#0D0F15] text-slate-500'
                    }`}
                  >
                    {owaspScan ? 'AÇIK' : 'KAPALI'}
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 10: TAKIM İZİNLERİ (PERMISSIONS)
               ========================================================================= */}
            {activeTab === 'permissions' && (
              <div className="space-y-3 text-xs font-mono">
                <div className="font-bold text-slate-100 text-sm mb-2">
                  {language === 'tr' ? 'Ajan Departman & Rol İzin Matrisi' : 'Department & Agent Permission Matrix'}
                </div>

                <div className="space-y-2">
                  {[
                    { role: 'Baş Süpervizör (Berkay Şahin)', desc: 'Tam Yetkili Sistem Sahibi', perms: 'Shell, Write, Deploy, API Keys' },
                    { role: 'Mimari & Tasarım (Ada, Rio)', desc: 'Şema Tasarımı & UI Token Modifikasyonu', perms: 'File Edit, Review, Figma Sync' },
                    { role: 'Backend & Fullstack (Nova, Emre)', desc: 'API Geliştirme & Veritabanı Migrasyonu', perms: 'Terminal Shell, Vitest, PostgreSQL' },
                    { role: 'QA & Güvenlik (Max, Kai)', desc: 'Penetrasyon Testi & Tarayıcı Otomasyonu', perms: 'Playwright, OWASP Scan, DOM Read' },
                  ].map((p, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#151722] border border-[#222736] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-200">{p.role}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-bold border border-purple-500/40">
                          {p.perms}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 11: HESAP (ACCOUNT)
               ========================================================================= */}
            {activeTab === 'account' && (
              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-[#151722] border border-[#222736] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#E0564C]/20 border border-[#E0564C] text-[#FFA494] font-bold text-base flex items-center justify-center">
                      BS
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-100">Berkay Şahin</div>
                      <div className="text-[11px] text-cyan-300">@berkaysahin-dev</div>
                      <div className="text-[9px] text-slate-500 mt-0.5">GitHub Connected · Developer License</div>
                    </div>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40">
                    BETA PRO
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#151722] border border-[#222736] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200">
                      {language === 'tr' ? 'Çalışma Alanı Yapılandırmasını İndir' : 'Export Workspace Configuration'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {language === 'tr' ? 'Ayarları, ajan promptlarını ve tema tercihlerini JSON olarak dışa aktar.' : 'Export preferences, theme and agent configs to JSON.'}
                    </div>
                  </div>
                  <button
                    onClick={handleExportConfig}
                    className="px-3 py-1.5 rounded-lg bg-[#222838] hover:bg-[#2C344A] text-slate-200 text-xs font-bold border border-[#333D56] flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON İndir</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Footer Bar Matching Muratify Screenshot */}
        <div className="h-14 bg-[#141723] border-t border-[#222838] px-5 flex items-center justify-between shrink-0">
          <div className="text-[10px] text-slate-500 font-mono">
            {language === 'tr'
              ? 'Görünüm, kısayol ve güven ayarları anında uygulanır.'
              : 'Appearance, shortcut, and security settings apply immediately.'}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-1.5 rounded-lg bg-[#1D212E] hover:bg-[#282E40] text-slate-300 text-xs font-bold transition-colors border border-[#2F364B]"
            >
              {language === 'tr' ? 'Kapat' : 'Close'}
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-1.5 rounded-lg bg-[#E0564C] hover:bg-[#CD443A] text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              {savedSuccess && <Check className="w-3.5 h-3.5" />}
              <span>{language === 'tr' ? 'Kaydet' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
