export type Mode = 'light' | 'dark'

export type Accent =
  | 'blue'
  | 'green'
  | 'indigo'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow'

const accents: { [key in Mode]: { [key in Accent]: string } } = {
  light: {
    blue: '0, 122, 255',
    green: '52, 199, 89',
    indigo: '88, 84, 214',
    orange: '255, 149, 0',
    pink: '255, 45, 85',
    purple: '175, 82, 222',
    red: '255, 59, 48',
    teal: '90, 200, 250',
    yellow: '255, 204, 0',
  },
  dark: {
    blue: '10, 132, 255',
    green: '48, 209, 88',
    indigo: '94, 92, 230',
    orange: '255, 159, 10',
    pink: '255, 55, 95',
    purple: '191, 90, 242',
    red: '255, 69, 58',
    teal: '100, 210, 255',
    yellow: '255, 214, 10',
  },
}

export const colors = {
  base: {
    black: 'rgb(0, 0, 0)',
    white: 'rgb(255, 255, 255)',
    current: 'currentColor',
    inherit: 'inherit',
    transparent: 'transparent',
  },
  light: {
    background: '255, 255, 255',
    backgroundSecondary: '247, 247, 247',
    backgroundTertiary: '247, 247, 247',
    foreground: '0, 0, 0',
    groupBackground: '255, 255, 255',
    groupBorder: '0, 0, 0',
    ...accents.light,
  },
  dark: {
    background: '20, 20, 20',
    backgroundSecondary: '10, 10, 10',
    backgroundTertiary: '20, 20, 20',
    foreground: '255, 255, 255',
    groupBackground: '10, 10, 10',
    groupBorder: '255, 255, 255',
    ...accents.dark,
  },
}

export const shades = {
  light: {
    accent: '0.7',
    accentSecondary: '0.15',
    accentSecondaryHover: '0.2',
    foregroundSecondary: '0.075',
    foregroundSecondaryHover: '0.125',
    foregroundTertiary: '0.033',
    groupBorder: '0.075',
    text: '0.8',
    textSecondary: '0.6',
    textSecondaryHover: '0.7',
    textTertiary: '0.4',
    textTertiaryHover: '0.5',
  },
  dark: {
    accent: '0.66',
    accentSecondary: '0.2',
    accentSecondaryHover: '0.25',
    foregroundSecondary: '0.1',
    foregroundSecondaryHover: '0.15',
    foregroundTertiary: '0.04',
    groupBorder: '0',
    text: '0.7',
    textSecondary: '0.5',
    textSecondaryHover: '0.6',
    textTertiary: '0.35',
    textTertiaryHover: '0.4',
  },
}
