const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const { glob } = require('glob')

const path = require('path')

const componentPaths = glob
  .sync('../components/src/components/**/*.docs.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })
  .map((x) => {
    const name = path.basename(x, '.docs.mdx')
    const route = `/components/${name}`
    return { name, route }
  })

const config = {
  env: {
    navLinks: [
      {
        name: 'Components',
        links: componentPaths,
      },
    ],
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
