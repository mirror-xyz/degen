import { glob } from 'glob'

import path from 'path'

export const getComponentPaths = () => {
  const paths = glob.sync('../components/src/components/**/*.docs.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })
  return paths
}

export const getComponentName = (pathname: string) => {
  const componentName = path.basename(pathname, '.mdx')
  return componentName.replace(path.extname(componentName), '')
}
