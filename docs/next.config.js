const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const config = {
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
  pageExtensions: ['md', 'mdx', 'tsx'],
  reactStrictMode: true,
}

/** @type {import('next').NextConfig} */
module.exports = withVanillaExtract(withMDX(config))
