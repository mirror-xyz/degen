import { CreateUrlOptions, createUrl } from 'playroom'

export const createPlayroomLink = (options: CreateUrlOptions = {}) => {
  return createUrl({
    baseUrl: process.env.NEXT_PUBLIC_PLAYROOM_URL,
    widths: [640],
    ...options,
  })
}
