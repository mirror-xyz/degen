import { cleanup } from '@/test'
import { createVariants } from '../create-variants'

describe('createVariants', () => {
  afterEach(cleanup)

  it('creates variant', () => {
    const variants = createVariants({
      base: {
        color: 'foreground',
      },
      description: {
        color: 'textTertiary',
      },
    })
    expect(variants.base.color).toEqual('foreground')
    expect(variants.description.color).toEqual('textTertiary')
  })

  it('creates responsive variant', () => {
    const variants = createVariants({
      title: {
        fontSize: { sm: '3xl', md: '4xl', lg: '5xl' },
        fontWeight: 'semibold',
      },
    })
    expect(variants.title.fontSize).toEqual({ sm: '3xl', md: '4xl', lg: '5xl' })
  })
})
