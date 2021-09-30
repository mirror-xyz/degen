import { parseCookies, setCookie } from 'nookies'

import { Accent, Mode } from '~/tokens'

export const accentKey = 'accent'
export const modeKey = 'mode'

export const setThemeAccent = (accent: string) =>
  setCookie({}, accentKey, accent)

export const setThemeMode = (mode: string) => setCookie({}, modeKey, mode)

export const getThemeAccent = (): Accent | 'foreground' | undefined =>
  parseCookies({})?.[accentKey] as Accent | 'foreground' | undefined

export const getThemeMode = (): Mode | undefined =>
  parseCookies({})?.[modeKey] as Mode | undefined
