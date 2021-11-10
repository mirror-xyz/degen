import { validateAccept } from './utils'

describe.each`
  fileType        | accept                                                                              | expected
  ${'image/jpeg'} | ${'image/jpeg'}                                                                     | ${true}
  ${'image/jpeg'} | ${'image/gif'}                                                                      | ${false}
  ${'image/png'}  | ${'image/jpeg, image/png, image/webp'}                                              | ${true}
  ${'image/gif'}  | ${'image/jpeg, image/png, image/webp'}                                              | ${false}
  ${'image/gif'}  | ${'image/gif, video/mp4, video/ogg, video/webm'}                                    | ${true}
  ${'video/mp4'}  | ${'image/gif, video/mp4, video/ogg, video/webm'}                                    | ${true}
  ${'image/jpeg'} | ${'image/jpeg, image/png, image/webp, image/gif, video/mp4, video/ogg, video/webm'} | ${true}
`('validateAccept($fileType, $accept)', ({ fileType, accept, expected }) => {
  it(`returns ${expected}`, () => {
    expect(validateAccept(fileType, accept)).toEqual(expected)
  })
})
