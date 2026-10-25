// Design tokens : reprise exacte de la maquette (design/screens).
export const colors = {
  bg: '#000000',
  card: '#1C1C1E',
  cardPressed: '#2C2C2E',
  separator: '#38383A',
  text: '#FFFFFF',
  textSecondary: 'rgba(235,235,245,0.6)',
  textTertiary: 'rgba(235,235,245,0.3)',
  accent: '#FF3B47',
  accentStrong: '#D7263D', // derrière du texte blanc
  success: '#30D158',
  successStrong: '#248A3D',
  warning: '#FF9F0A',
  ringTechniques: '#FF3B47',
  ringTrainings: '#FF9F0A',
} as const;

export const belt = {
  white: '#F2F2F2',
  orange: '#F28C28',
  blue: '#2F6FDE',
  yellow: '#F2C230',
  green: '#2E9E5B',
  brown: '#7A4A2A',
  black: '#111111',
} as const;

// Grille d'activité façon GitHub (intensité 0 → 3)
export const activity = {
  empty: '#2C2C2E',
  dojo: ['#0E4429', '#26A641', '#39D353'],
  outside: ['#0C2D6B', '#1F6FEB', '#58A6FF'],
} as const;

export const radius = { sm: 10, md: 14, lg: 22, xl: 28, pill: 999 } as const;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 } as const;

export const type = {
  largeTitle: { fontSize: 34, fontWeight: '700' as const, letterSpacing: 0.3 },
  title: { fontSize: 28, fontWeight: '700' as const },
  title2: { fontSize: 22, fontWeight: '700' as const },
  headline: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 17, fontWeight: '400' as const },
  callout: { fontSize: 16, fontWeight: '400' as const },
  subhead: { fontSize: 15, fontWeight: '400' as const },
  footnote: { fontSize: 13, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '500' as const },
  overline: { fontSize: 13, fontWeight: '600' as const, letterSpacing: 0.8, textTransform: 'uppercase' as const },
  number: { fontSize: 28, fontWeight: '700' as const, fontVariant: ['tabular-nums' as const] },
} as const;
