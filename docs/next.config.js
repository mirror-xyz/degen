const { glob } = require('glob')
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: 'short',
})
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const path = require('path')

const componentPaths = glob
  .sync('../components/src/components/!(Icons)**/*.docs.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })
  .map((x) => {
    const name = path.basename(x, '.docs.mdx')
    const route = `/components/${name}`
    return { name, route }
  })

const config = {
  images: {
    domains: ['images.mirror-media.xyz'],
  },
  env: {
    navLinks: [
      {
        name: 'components',
        links: componentPaths,
      },
    ],
  },
  experimental: {
    externalDir: true,
  },
  async rewrites() {
    // Rewrite playroom urls for production
    if (process.env.NODE_ENV === 'production')
      return [
        {
          source: '/playroom/preview',
          destination: '/playroom/preview/index.html',
        },
        {
          source: '/playroom/frame.html',
          destination: '/playroom/frame.html',
        },
        {
          source: '/playroom',
          destination: '/playroom/index.html',
        },
      ]
    return []
  },
  async redirects() {
    if (process.env.NODE_ENV === 'production') return []
    // Redirect playroom to local dev server in development
    return [
      {
        source: '/playroom',
        destination: 'http://localhost:8082',
        permanent: false,
      },
    ]
  },
  pageExtensions: ['mdx', 'tsx'],
  reactStrictMode: true,
}

/** @type {import('next').NextConfig} */
module.exports = withVanillaExtract(withMDX(config))
