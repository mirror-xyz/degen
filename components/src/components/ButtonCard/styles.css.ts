import { atoms } from '../../css'

export const card = atoms({
  backgroundColor: 'backgroundSecondary',
  borderBottomRadius: 'none',
  borderTopRadius: 'large',
  padding: '4',
  display: 'flex',
  flexDirection: 'row',
  color: 'textSecondary',
  letterSpacing: '-0.01',
  lineHeight: '1.5',
  fontSize: 'small',
  fontWeight: 'normal',
  justifyContent: 'center',
})

export const button = atoms({
  backgroundColor: { hover: 'accentSecondaryHover', base: 'accent' },
  borderBottomRadius: 'large',
  color: 'accentText',
  cursor: 'pointer',
  fontSize: 'small',
  fontWeight: 'semiBold',
  height: '12',
  paddingX: '4',
  transitionDuration: '150',
  transitionProperty: 'colors',
  width: 'full',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
})
