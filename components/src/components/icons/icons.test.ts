import { glob } from 'glob'
import { readFile } from 'fs-extra'

import path from 'path'

const svgComponentPaths = glob.sync('Icon*/*Svg.tsx', {
  cwd: __dirname,
  absolute: true,
})

svgComponentPaths.forEach((svgComponentPath) => {
  const componentName = path.basename(svgComponentPath, '.tsx')

  describe(componentName, () => {
    it('should match snapshot', async () => {
      const source = await readFile(svgComponentPath, 'utf-8')
      expect(source).toMatchSnapshot()
    })
  })
})
