const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const { glob } = require('glob')

const path = require('path')

const pagePaths = glob
  .sync('./pages/!(components)/*.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })
  .map((x) => {
    const name = path.basename(x, '.mdx')
    const dir = path.dirname(x).split('/pages')[1]
    const group = dir.split('/')[1]
    const route = `${dir}/${name}`
    return { name, route, group }
  })

const groupedPagePaths = {}
for (const pagePath of pagePaths) {
  const { group, ...rest } = pagePath
  if (group in groupedPagePaths) groupedPagePaths[group].push(rest)
  else groupedPagePaths[group] = [rest]
}

const componentPaths = glob
  .sync('../components/src/components/!(icons)**/*.docs.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })
  .map((x) => {
    const name = path.basename(x, '.docs.mdx')
    const route = `/components/${name}`
    return { name, route }
  })

const navLinks = [
  ...Object.entries(groupedPagePaths).map(([k, v]) => ({
    name: k,
    links: v,
  })),
  {
    name: 'components',
    links: componentPaths,
  },
]

const config = {
  env: {
    navLinks,
  },
  experimental: {
    externalDir: true,
  },
  async redirects() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/playroom',
            destination: 'http://localhost:8082',
            permanent: true,
          },
        ]
      : []
  },
  pageExtensions: ['mdx', 'tsx'],
  reactStrictMode: true,
}

/** @type {import('next').NextConfig} */
module.exports = withVanillaExtract(withMDX(config))
