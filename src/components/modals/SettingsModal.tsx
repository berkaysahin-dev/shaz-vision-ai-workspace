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
  Globe,
  Key,
  Download,
  Terminal,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';
import { THEMES, ThemeId } from '../../services/themeManager';

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
    t,
  } = useWorkspace();

  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  const [selectedThemeDraft, setSelectedThemeDraft] = useState<ThemeId>(currentTheme);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync draft when opened
  React.useEffect(() => {
    if (isSettingsOpen) {
      setSelectedThemeDraft(currentTheme);
      setSavedSuccess(false);
    }
  }, [isSettingsOpen, currentTheme]);

  if (!isSettingsOpen) return null;

  const handleSelectTheme = (themeId: ThemeId) => {
    sound.playClick();
    setSelectedThemeDraft(themeId);
    setCurrentTheme(themeId); // Apply immediately as stated in bottom helper text!
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
        className="w-full max-w-4xl bg-[#111319] border border-[#222736] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[620px] max-h-[90vh] animate-in zoom-in-95 duration-150 text-slate-300"
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
                      ? 'bg-[#261E1A] text-amber-200 font-bold border border-amber-800/40'
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
                      ? 'bg-[#261E1A] text-amber-200 font-bold border border-amber-800/40'
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
                      ? 'bg-[#261E1A] text-amber-200 font-bold border border-amber-800/40'
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
                      ? 'bg-[#261E1A] text-amber-200 font-bold border border-amber-800/40'
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
                      ? 'bg-[#261E1A] text-amber-200 font-bold border border-amber-800/40'
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
                      ? 'bg-[#261E1A] text-amber-200 font-bold border border-amber-800/40'
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
                      ? 'bg-[#261E1A] text-amber-200 font-bold border border-amber-800/40'
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
                      ? 'bg-[#261E1A] text-amber-200 font-bold border border-amber-800/40'
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
                      ? 'bg-[#261E1A] text-amber-200 font-bold border border-amber-800/40'
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
                      ? 'bg-[#261E1A] text-amber-200 font-bold border border-amber-800/40'
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
                TAB 1: GÖRÜNÜM (THEME PALETTES GRID MATCHING MURATIFY SCREENSHOT)
               ========================================================================= */}
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                {/* 2-Column Grid of Theme Cards */}
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
                            ? 'border-[#E0564C] shadow-[0_0_12px_rgba(224,86,76,0.3)] ring-1 ring-[#E0564C]'
                            : 'border-[#222736] hover:border-slate-600 hover:bg-[#181C28]'
                        }`}
                      >
                        {/* Mini Terminal Preview Frame */}
                        <div
                          className="w-full h-16 rounded-lg p-2 flex flex-col justify-between border relative overflow-hidden font-mono text-[9px]"
                          style={{
                            backgroundColor: th.terminalBg,
                            borderColor: th.borderColor,
                          }}
                        >
                          {/* Mini Window Controls & Header */}
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

                          {/* Mini Terminal Code Line */}
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

                        {/* Theme Name & Description */}
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
                TAB 2: GENEL (GENERAL WORKSPACE PREFERENCES)
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
                      defaultValue="Shaz Vision AI Workspace"
                      className="w-full mt-1 px-3 py-1.5 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold">
                      {language === 'tr' ? 'Baş Süpervizör' : 'Lead Supervisor'}
                    </label>
                    <input
                      type="text"
                      defaultValue="Berkay Şahin (BS)"
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
                        language === 'tr' ? 'bg-[#7C3AED] text-white' : 'text-slate-400'
                      }`}
                    >
                      Türkçe
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        language === 'en' ? 'bg-[#7C3AED] text-white' : 'text-slate-400'
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
                  { key: '⌘ + K / Ctrl + K', desc: language === 'tr' ? 'Hızlı Komut Paleti & Arama' : 'Global Command Palette & Search' },
                  { key: '⌘ / Ctrl (Basılı Tut)', desc: language === 'tr' ? 'Agent X Bas-Konuş Modu' : 'Agent X Push-to-Talk' },
                  { key: 'Esc', desc: language === 'tr' ? 'Açık Modalı / Çekmeceyi Kapat' : 'Close Active Modal / Drawer' },
                  { key: '⌘ + 1 / 2 / 3', desc: language === 'tr' ? 'Departman Takımları Arasında Geçiş' : 'Switch Department Teams' },
                  { key: '⌘ + S', desc: language === 'tr' ? 'Kod Çalışma Alanındaki Dosyayı Kaydet' : 'Save Active File in Workspace' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#151722] border border-[#222736] flex items-center justify-between"
                  >
                    <span className="text-slate-300">{item.desc}</span>
                    <kbd className="px-2 py-0.5 rounded bg-[#0D0F15] border border-[#282F44] text-[10px] text-cyan-300 font-bold">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            )}

            {/* =========================================================================
                TAB 4: AI MOTORLARI (API KEYS & PROVIDERS)
               ========================================================================= */}
            {activeTab === 'models' && (
              <div className="space-y-3 text-xs font-mono">
                <div className="font-bold text-slate-100 text-sm mb-2">
                  {language === 'tr' ? 'AI Sağlayıcı API Anahtarları' : 'AI Provider API Keys'}
                </div>
                {[
                  { name: 'Anthropic Claude (3.5 Sonnet / Opus)', env: 'ANTHROPIC_API_KEY', val: 'sk-ant-api03-••••••••••••••••' },
                  { name: 'OpenAI (GPT-4o / GPT-5-Codex)', env: 'OPENAI_API_KEY', val: 'sk-proj-••••••••••••••••' },
                  { name: 'Google Gemini (1.5 Pro / Flash)', env: 'GEMINI_API_KEY', val: 'AIzaSy••••••••••••••••' },
                  { name: 'DeepSeek (V3 / R1)', env: 'DEEPSEEK_API_KEY', val: 'sk-dpsk-••••••••••••••••' },
                ].map((prov, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#151722] border border-[#222736] space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-200">{prov.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                        Connected
                      </span>
                    </div>
                    <input
                      type="password"
                      defaultValue={prov.val}
                      className="w-full px-2.5 py-1 bg-[#0D0F15] border border-[#232838] rounded-lg text-slate-300 outline-none text-[11px]"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* =========================================================================
                OTHER TABS PLACEHOLDER (SES, ENTEGRASYONLAR, GÜVENLİK VB.)
               ========================================================================= */}
            {activeTab !== 'appearance' && activeTab !== 'general' && activeTab !== 'shortcuts' && activeTab !== 'models' && (
              <div className="p-6 rounded-2xl bg-[#151722] border border-[#222736] text-center space-y-2">
                <div className="font-bold text-slate-100 text-sm">{currentTabName}</div>
                <div className="text-xs text-slate-400">
                  {language === 'tr'
                    ? 'Bu ayar kategorisi geçerli Shaz Vision AI Workspace çalışma alanınız için etkinleştirildi.'
                    : 'This settings category is active for your current Shaz Vision AI Workspace.'}
                </div>
                <div className="text-[10px] text-emerald-400 font-bold">
                  ✓ {language === 'tr' ? 'Tüm servisler ve protokoller bağlı.' : 'All services and protocols connected.'}
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
