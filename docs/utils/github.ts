export const createGitHubLink = (path = '') => {
  const repo = `${process.env.VERCEL_GIT_REPO_OWNER ?? 'mirror-xyz'}/${
    process.env.VERCEL_GIT_REPO_SLUG ?? 'degen'
  }`
  const branch = process.env.VERCEL_GIT_COMMIT_REF ?? 'main'
  return `https://github.com/${repo}/tree/${branch}${path?.replace(
    '/vercel/path0',
    '',
  )}`
}
