export const brand = {
  name: 'profit.exe',
  descriptor: 'AI-powered business intelligence for small merchants.',
  tagline: 'Your business is running. Is it profitable?',
  merchantName: 'Sri Krishna Kirana & General Store',
  merchantLocation: 'Indiranagar, Bengaluru',
  merchantGST: '29ABCDE1234F1Z5',
  version: '2.5.0-prod',
};

export const colors = {
  // Brand Foundation - Neutral, Calm, Restrained
  canvas: '#F8FAFC',        // Slate 50 background
  surface: '#FFFFFF',       // Pure White cards
  surfaceSubtle: '#F1F5F9', // Slate 100
  surfaceHover: '#F8FAFC',  // Hover background
  surfaceActive: '#F1F5F9', // Active item
  
  // Contrast / Dark accents
  dark: '#0F172A',          // Slate 900
  darkCard: '#1E293B',      // Slate 800
  darkSubtle: '#334155',    // Slate 700

  // Typography
  text: '#0F172A',          // Slate 900 primary
  textSecondary: '#475569', // Slate 600
  textMuted: '#64748B',     // Slate 500
  textLight: '#94A3B8',     // Slate 400
  textWhite: '#FFFFFF',
  
  // Borders & Dividers
  border: '#E2E8F0',        // Slate 200 crisp border
  borderLight: '#F1F5F9',   // Slate 100 subtle divider
  borderDark: '#CBD5E1',    // Slate 300 focused border

  // Primary Accent (Fintech Indigo/Royal Blue)
  primary: '#2563EB',       // Blue 600
  primaryHover: '#1D4ED8',  // Blue 700
  primaryLight: '#EFF6FF',  // Blue 50 background
  primaryBorder: '#BFDBFE', // Blue 200

  // Semantic Signals (meaningful data colors only)
  opportunity: '#10B981',   // Emerald 500
  opportunityLight: '#ECFDF5',
  opportunityBorder: '#A7F3D0',
  opportunityDark: '#047857',

  attention: '#F59E0B',     // Amber 500
  attentionLight: '#FFFBEB',
  attentionBorder: '#FDE68A',
  attentionDark: '#B45309',

  risk: '#EF4444',          // Red 500
  riskLight: '#FEF2F2',
  riskBorder: '#FECACA',
  riskDark: '#B91C1C',

  info: '#3B82F6',          // Sky 500
  infoLight: '#EFF6FF',
  infoBorder: '#BFDBFE',
  infoDark: '#1D4ED8',

  // Backwards compatibility keys
  bg: '#F8FAFC',
  card: '#FFFFFF',
  accent: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  purple: '#6366F1',
  textSub: '#64748B',
  navBg: '#0F172A',
};

export const fonts = {
  heading: 'System',
  body: 'System',
  mono: 'monospace',
};

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  elevated: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
};
