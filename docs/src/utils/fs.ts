import { glob } from 'glob'

import path from 'path'

export const getComponentPaths = () => {
  const components = glob.sync('../components/src/components/**/*.docs.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })

  const tokens = glob.sync('../components/src/tokens/**/*.docs.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })

  return components.concat(tokens)
}

export const getComponentName = (pathname: string) => {
  const componentName = path.basename(pathname, '.mdx')
  return componentName.replace(path.extname(componentName), '')
}

export const getGuidePaths = () => {
  return glob.sync('./src/guides/**/*.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })
}

export const getGuideName = (pathname: string) => {
  const guideName = path.basename(pathname, '.mdx')
  return guideName.replace(path.extname(guideName), '')
}
