import { CreateUrlOptions, createUrl } from 'playroom'

export const createPlayroomLink = (options: CreateUrlOptions = {}) => {
  return createUrl({
    baseUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8082'
        : '/playroom',
    widths: [640],
    ...options,
  })
}
