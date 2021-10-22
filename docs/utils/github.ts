export const createGitHubLink = (path = '') => {
  const repo = `${process.env.VERCEL_GIT_REPO_OWNER ?? 'mirror-xyz'}/${
    process.env.VERCEL_GIT_REPO_SLUG ?? 'degen'
  }`
  console.log({
    VERCEL_GIT_REPO_SLUG: process.env.VERCEL_GIT_REPO_SLUG,
    VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF,
    branch: process.env.VERCEL_GIT_COMMIT_REF?.replace('/vercel/path0', ''),
    path,
  })
  const branch = process.env.VERCEL_GIT_COMMIT_REF ?? 'main'
  return `https://github.com/${repo}/tree/${branch}${path?.replace(
    '/vercel/path0',
    '',
  )}`
}
