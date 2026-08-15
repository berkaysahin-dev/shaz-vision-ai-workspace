export type ThemeId =
  | 'night_shift'
  | 'deep'
  | 'charcoal'
  | 'phosphor'
  | 'espresso'
  | 'obsidian'
  | 'sonar'
  | 'forest';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  bgDark: string;
  bgPanel: string;
  bgSurface: string;
  borderColor: string;
  accentColor: string;
  accentHover: string;
  accentGlow: string;
  textAccent: string;
  badgeBg: string;
  badgeText: string;
  terminalBg: string;
  terminalHeader: string;
}

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  night_shift: {
    id: 'night_shift',
    name: 'Gece Vardiyası',
    nameEn: 'Night Shift',
    description: 'Nötr koyu, menekşe vurgu',
    descriptionEn: 'Neutral dark, violet accent',
    bgDark: '#0A0C13',
    bgPanel: '#0E111A',
    bgSurface: '#141824',
    borderColor: '#232A3E',
    accentColor: '#8B5CF6',
    accentHover: '#7C3AED',
    accentGlow: 'rgba(139, 92, 246, 0.4)',
    textAccent: '#C4B5FD',
    badgeBg: '#2E1065',
    badgeText: '#DDD6FE',
    terminalBg: '#06080F',
    terminalHeader: '#0F131E',
  },
  deep: {
    id: 'deep',
    name: 'Derin',
    nameEn: 'Deep',
    description: 'OLED siyahına yakın derinlik, buz mavisi vurgu',
    descriptionEn: 'Near OLED black depth, ice blue accent',
    bgDark: '#05070C',
    bgPanel: '#0A0F1A',
    bgSurface: '#101726',
    borderColor: '#1C2942',
    accentColor: '#38BDF8',
    accentHover: '#0EA5E9',
    accentGlow: 'rgba(56, 189, 248, 0.4)',
    textAccent: '#BAE6FD',
    badgeBg: '#082F49',
    badgeText: '#7DD3FC',
    terminalBg: '#030508',
    terminalHeader: '#09101C',
  },
  charcoal: {
    id: 'charcoal',
    name: 'Kömür',
    nameEn: 'Charcoal',
    description: 'Sıcak nötr koyu, bakır vurgu',
    descriptionEn: 'Warm neutral dark, copper accent',
    bgDark: '#121110',
    bgPanel: '#1A1816',
    bgSurface: '#24211D',
    borderColor: '#38332D',
    accentColor: '#F97316',
    accentHover: '#EA580C',
    accentGlow: 'rgba(249, 115, 22, 0.4)',
    textAccent: '#FED7AA',
    badgeBg: '#431407',
    badgeText: '#FDBA74',
    terminalBg: '#0C0B0A',
    terminalHeader: '#1A1715',
  },
  phosphor: {
    id: 'phosphor',
    name: 'Fosfor',
    nameEn: 'Phosphor',
    description: 'Terminal mirası — yeşil yalnız vurguda ve terminalde',
    descriptionEn: 'Terminal heritage — green accent and terminal',
    bgDark: '#050F0A',
    bgPanel: '#0A1710',
    bgSurface: '#10241A',
    borderColor: '#1B3B2B',
    accentColor: '#10B981',
    accentHover: '#059669',
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    textAccent: '#A7F3D0',
    badgeBg: '#022C22',
    badgeText: '#6EE7B7',
    terminalBg: '#020805',
    terminalHeader: '#08170F',
  },
  espresso: {
    id: 'espresso',
    name: 'Espresso',
    nameEn: 'Espresso',
    description: 'Derin kavrulmuş kahve, mercan vurgu',
    descriptionEn: 'Deep roasted coffee, coral accent',
    bgDark: '#140E0C',
    bgPanel: '#1C1512',
    bgSurface: '#291F1A',
    borderColor: '#42322B',
    accentColor: '#F43F5E',
    accentHover: '#E11D48',
    accentGlow: 'rgba(244, 63, 94, 0.45)',
    textAccent: '#FECDD3',
    badgeBg: '#4C0519',
    badgeText: '#FDA4AF',
    terminalBg: '#0C0807',
    terminalHeader: '#1A120F',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidyen',
    nameEn: 'Obsidian',
    description: 'Gerçek OLED siyahı, buz-camgöbeği vurgu',
    descriptionEn: 'True OLED black, ice cyan accent',
    bgDark: '#000000',
    bgPanel: '#080808',
    bgSurface: '#121212',
    borderColor: '#222222',
    accentColor: '#00E5FF',
    accentHover: '#00B4D8',
    accentGlow: 'rgba(0, 229, 255, 0.4)',
    textAccent: '#A5F3FC',
    badgeBg: '#083344',
    badgeText: '#67E8F9',
    terminalBg: '#000000',
    terminalHeader: '#0D0D0D',
  },
  sonar: {
    id: 'sonar',
    name: 'Sonar',
    nameEn: 'Sonar',
    description: 'Derin denizaltı laciverti, akuamarin vurgu',
    descriptionEn: 'Deep submarine navy, aquamarine accent',
    bgDark: '#070C18',
    bgPanel: '#0C1527',
    bgSurface: '#14223E',
    borderColor: '#1F345E',
    accentColor: '#06B6D4',
    accentHover: '#0891B2',
    accentGlow: 'rgba(6, 182, 212, 0.4)',
    textAccent: '#A5F3FC',
    badgeBg: '#164E63',
    badgeText: '#67E8F9',
    terminalBg: '#040810',
    terminalHeader: '#0A1222',
  },
  forest: {
    id: 'forest',
    name: 'Orman',
    nameEn: 'Forest',
    description: 'Koyu yosun yeşili, zümrüt ve altın vurgu',
    descriptionEn: 'Dark moss green, emerald & gold accent',
    bgDark: '#0A120E',
    bgPanel: '#101C17',
    bgSurface: '#182B23',
    borderColor: '#254438',
    accentColor: '#84CC16',
    accentHover: '#65A30D',
    accentGlow: 'rgba(132, 204, 22, 0.4)',
    textAccent: '#D9F99D',
    badgeBg: '#1A2E05',
    badgeText: '#BEF264',
    terminalBg: '#060B08',
    terminalHeader: '#0D1712',
  },
};

export function applyThemeToDOM(themeId: ThemeId) {
  const th = THEMES[themeId] || THEMES.espresso;
  const root = document.documentElement;

  root.style.setProperty('--app-bg-dark', th.bgDark);
  root.style.setProperty('--app-bg-panel', th.bgPanel);
  root.style.setProperty('--app-bg-surface', th.bgSurface);
  root.style.setProperty('--app-border', th.borderColor);
  root.style.setProperty('--app-accent', th.accentColor);
  root.style.setProperty('--app-accent-hover', th.accentHover);
  root.style.setProperty('--app-accent-glow', th.accentGlow);
  root.style.setProperty('--app-text-accent', th.textAccent);
  root.style.setProperty('--app-badge-bg', th.badgeBg);
  root.style.setProperty('--app-badge-text', th.badgeText);
  root.style.setProperty('--app-terminal-bg', th.terminalBg);
  root.style.setProperty('--app-terminal-header', th.terminalHeader);

  // Set data-theme on root for CSS targeting
  root.setAttribute('data-theme', themeId);
}
