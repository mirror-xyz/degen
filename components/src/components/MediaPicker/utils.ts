import { Accept } from './MediaPicker'

export const validateAccept = (fileType: string, accept: Accept) => {
  const allowedTypes = accept?.split(', ')
  if (!allowedTypes) return true
  const mime = getMimeType(fileType)
  return allowedTypes.some((x) => {
    const allowedMime = getMimeType(x)
    return (
      allowedMime.type === mime.type && allowedMime.subtype === mime.subtype
    )
  })
}

const getMimeType = (type: string) => {
  const parts = type.split('/')
  return {
    type: parts[0],
    subtype: parts[1],
  }
}
