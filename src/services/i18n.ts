export type Language = 'tr' | 'en';

export const translations = {
  tr: {
    appTitle: 'Shaz Vision AI Workspace',
    beta: 'BETA',
    
    // Header & Teams
    teamProduct: 'ÜRÜN',
    teamMarketing: 'PAZARLAMA',
    teamSupport: 'DESTEK',
    addTeam: '+ Takım',
    searchPlaceholder: 'Hızlı Arama (⌘K)...',
    
    // Left Office
    office: 'Ofis',
    active: 'aktif',
    manage: 'Yönet',
    totalTokens: 'Harcanan Token',
    totalCost: 'Maliyet',
    dragHint: 'Sürüklemek için tıkla & kaydır',
    resetMap: 'Harita Konumunu Sıfırla',
    
    // Rooms
    roomArch: 'MİMARİ LAB',
    roomBackend: 'BACKEND LAB',
    roomFullstack: 'FULLSTACK STÜDYO',
    roomDesign: 'TASARIM & UI',
    roomSecurity: 'GÜVENLİK LAB',
    roomBreakroom: 'DİNLENME & MUTFAK',
    roomDevops: 'DEVOPS MATRİS',
    
    // Telemetry & Speaking
    agentX: 'Ajan X',
    speaking: 'KONUŞUYOR',
    listening: 'DİNLİYOR',
    lastAction: 'son işlem',
    talk: 'Konuş',
    pushToTalk: 'Bas-Konuş',
    pushToTalkHint: 'bas-konuş: sağ ⌘ Command tuşunu basılı tutun → göndermek için bırakın',
    liveHQ: 'Product HQ Canlı — Shaz Vision AI Workspace',
    speechDefault: 'görev panoya eklendi ve ekibe dağıtıldı.',
    
    // Center Pane & Terminals
    terminals: 'Terminaller',
    terminalSub: '3 ajanlı kabuk',
    codeWorkspace: 'Kod Çalışma Alanı',
    newShell: 'Yeni Kabuk',
    reading: 'okunuyor',
    saved: 'Kaydedildi',
    saveFile: 'Dosyayı Kaydet',
    typeCommandHint: 'test, build, scan, clear yazın...',
    
    // Right Pane Tabs
    tabTasks: 'Görevler',
    tabReports: 'Raporlar',
    tabBrowser: 'Tarayıcı',
    tabTools: 'Araçlar / MCP',
    
    // Kanban
    kanbanTitle: 'KANBAN İŞ YÜKÜ',
    newTask: 'Yeni Görev',
    inProgress: 'SÜRÜYOR',
    todo: 'YAPILACAK',
    done: 'TAMAMLANDI',
    backlog: 'BEKLEMEDE',
    clickToMove: 'İlerletmek için tıkla →',
    
    // Browser
    liveDom: 'Canlı DOM',
    toolCalls: 'Araç Çağrıları',
    devtools: 'DevTools Konsolu',
    status: 'Durum',
    viewport: 'Görünüm',
    browserSubtitle: 'Otonom başsız DOM doğrulandı',
    
    // Inspector
    inspectorTitle: 'Ajan Denetçisi',
    activeMission: 'AKTİF GÖREV',
    usedTokens: 'HARCANAN TOKEN',
    cost: 'TOPLAM MALİYET',
    runtime: 'ÇALIŞMA SÜRESİ',
    filesAccessed: 'ERİŞİLEN PROJE DOSYALARI',
    liveCli: 'CANLI AJAN CLI AKIŞI',
    streaming: 'Canlı Akış',
    pauseAgent: 'Ajanı Duraklat',
    resumeAgent: 'Ajanı Devam Ettir',
    messagePlaceholder: 'Ajana doğrudan talimat yazın...',
    inspect: 'İncele',
    
    // Bottom Command Bar
    globalPromptPlaceholder: 'AI şirketiniz için talimat yazın (örn. OAuth doğrulamasını yaz, vitest testlerini koştur ve sayfayı önizle)...',
    scenarioStopped: 'senaryo hazır — kontrol sizde',
    playAgain: 'yeniden oynat',
    guidedTour: 'rehberli tur',
    agentsSynchronized: '8 Ajan Senkronize',
    
    // Settings & Modals
    settings: 'Çalışma Alanı Ayarları',
    notifications: 'Bildirimler',
    search: 'Hızlı Arama & Komut Paleti',
    markRead: 'Tümünü okundu say',
    savePrefs: 'Tercihleri Kaydet',
    exportConfig: 'Yapılandırmayı İndir',
    language: 'Dil',
    turkish: 'Türkçe',
    english: 'English',
    supervisorAuthority: 'Süpervizör Yetkisi',
    authorityLevel: 'Baş Süpervizör / Sistem Sahibi',
    soundEngine: '8-Bit Retro Ses Sentezleyici',
    soundDesc: 'Tuş vuruşları, konuşma sesleri ve görev tamamlama melodileri.',
    testChime: 'Sesi Sına',
    enabled: 'AÇIK',
    muted: 'KAPALI',
    apiKeys: 'AI Sağlayıcı API Anahtarları',
    
    // Task Modal
    createTaskTitle: 'Yeni AI Mühendislik Görevi Oluştur',
    createTaskDesc: 'Otonom departman ekibine görev dağıtın',
    taskTitleLabel: 'GÖREV BAŞLIĞI',
    taskSpecLabel: 'ŞARTNAME & KISITLAMALAR',
    assignedAgentLabel: 'ATANAN AJAN',
    priorityLabel: 'ÖNCELİK SEVİYESİ',
    subtasksLabel: 'ALT GÖREVLER & KABUL KRİTERLERİ',
    dispatchTaskBtn: 'Görevi Dağıt',
    cancel: 'İptal',
  },
  en: {
    appTitle: 'Shaz Vision AI Workspace',
    beta: 'BETA',
    
    // Header & Teams
    teamProduct: 'PRODUCT',
    teamMarketing: 'MARKETING',
    teamSupport: 'SUPPORT',
    addTeam: '+ Team',
    searchPlaceholder: 'Quick Search (⌘K)...',
    
    // Left Office
    office: 'Office',
    active: 'active',
    manage: 'Manage',
    totalTokens: 'Used Tokens',
    totalCost: 'Cost',
    dragHint: 'Click & drag to pan map',
    resetMap: 'Reset Map Position',
    
    // Rooms
    roomArch: 'ARCH LAB',
    roomBackend: 'BACKEND LAB',
    roomFullstack: 'FULLSTACK STUDIO',
    roomDesign: 'DESIGN & UI',
    roomSecurity: 'SECURITY LAB',
    roomBreakroom: 'BREAKROOM & LOUNGE',
    roomDevops: 'DEVOPS MATRIX',
    
    // Telemetry & Speaking
    agentX: 'Agent X',
    speaking: 'SPEAKING',
    listening: 'LISTENING',
    lastAction: 'last action',
    talk: 'Talk',
    pushToTalk: 'Push-to-talk',
    pushToTalkHint: 'push-to-talk: hold the ⌘ Command key (the button above) → release to send',
    liveHQ: 'Product HQ live — Shaz Vision AI Workspace',
    speechDefault: 'the task is on the board and assigned to the crew.',
    
    // Center Pane & Terminals
    terminals: 'Terminals',
    terminalSub: '3 paneagent shell',
    codeWorkspace: 'Code Workspace',
    newShell: 'New Shell',
    reading: 'reading',
    saved: 'Saved',
    saveFile: 'Save File',
    typeCommandHint: 'type test, build, scan, clear...',
    
    // Right Pane Tabs
    tabTasks: 'Tasks',
    tabReports: 'Reports',
    tabBrowser: 'Browser',
    tabTools: 'Tools / MCP',
    
    // Kanban
    kanbanTitle: 'KANBAN WORKLOAD',
    newTask: 'New Task',
    inProgress: 'IN PROGRESS',
    todo: 'TODO',
    done: 'DONE',
    backlog: 'BACKLOG',
    clickToMove: 'Click to move →',
    
    // Browser
    liveDom: 'Live DOM',
    toolCalls: 'Tool Calls',
    devtools: 'DevTools Console',
    status: 'Status',
    viewport: 'Viewport',
    browserSubtitle: 'Autonomous headless DOM verified',
    
    // Inspector
    inspectorTitle: 'Agent Inspector',
    activeMission: 'ACTIVE MISSION',
    usedTokens: 'USED TOKENS',
    cost: 'TOTAL COST',
    runtime: 'RUNTIME',
    filesAccessed: 'WORKSPACE FILES ACCESSED',
    liveCli: 'LIVE AGENT CLI STREAM',
    streaming: 'Streaming',
    pauseAgent: 'Pause Agent Execution',
    resumeAgent: 'Resume Agent Execution',
    messagePlaceholder: 'Direct message to agent...',
    inspect: 'Inspect',
    
    // Bottom Command Bar
    globalPromptPlaceholder: 'Type instructions for your AI company (e.g. build OAuth authentication, run vitest pack and preview landing)...',
    scenarioStopped: "scenario stopped - you're in control",
    playAgain: 'play again',
    guidedTour: 'guided tour',
    agentsSynchronized: '8 Agents Synchronized',
    
    // Settings & Modals
    settings: 'Workspace Settings',
    notifications: 'Notifications',
    search: 'Quick Search & Command Palette',
    markRead: 'Mark all as read',
    savePrefs: 'Save Preferences',
    exportConfig: 'Export Workspace Config',
    language: 'Language',
    turkish: 'Türkçe',
    english: 'English',
    supervisorAuthority: 'Supervisor Authority',
    authorityLevel: 'Principal Supervisor / Owner',
    soundEngine: '8-Bit Retro Audio Synthesizer',
    soundDesc: 'Keyclick bleeps, speaking chimes, and completion fanfares.',
    testChime: 'Test Chime',
    enabled: 'ENABLED',
    muted: 'MUTED',
    apiKeys: 'AI Provider API Keys',
    
    // Task Modal
    createTaskTitle: 'Create AI Engineering Task',
    createTaskDesc: 'Dispatch to autonomous department crew',
    taskTitleLabel: 'TASK TITLE',
    taskSpecLabel: 'SPECIFICATION & CONSTRAINTS',
    assignedAgentLabel: 'ASSIGNED AGENT',
    priorityLabel: 'PRIORITY LEVEL',
    subtasksLabel: 'SUBTASKS & ACCEPTANCE CRITERIA',
    dispatchTaskBtn: 'Dispatch Task',
    cancel: 'Cancel',
  },
};
