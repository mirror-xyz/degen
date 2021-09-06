export type Accent = 'blue' | 'green'
export type Theme = 'light' | 'dark'

export const color = {
  base: {
    black: 'rgb(0, 0, 0)',
    current: 'currentColor',
    transparent: 'transparent',
  },
  light: {
    background: '255, 255, 255',
    backgroundSecondary: '247, 247, 247',
    backgroundTertiary: '247, 247, 247',
    foreground: '0, 0, 0',
    groupBackground: '255, 255, 255',
    groupBorder: '0, 0, 0',
    // accents
    blue: '0, 122, 255',
    green: '52, 199, 89',
  },
  dark: {
    background: '20, 20, 20',
    backgroundSecondary: '10, 10, 10',
    backgroundTertiary: '20, 20, 20',
    foreground: '255, 255, 255',
    groupBackground: '10, 10, 10',
    groupBorder: '255, 255, 255',
    // accents
    blue: '10, 132, 255',
    green: '48, 209, 88',
  },
}

export const shade = {
  light: {
    accent: '0.7',
    accentSecondary: '0.15',
    foregroundSecondary: '0.075',
    groupBorder: '0.075',
    text: '0.8',
    textSecondary: '0.4',
  },
  dark: {
    accent: '0.66',
    accentSecondary: '0.2',
    foregroundSecondary: '0.1',
    groupBorder: '0',
    text: '0.7',
    textSecondary: '0.35',
  },
}
