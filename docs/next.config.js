/** @type {import('next').NextConfig} */

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const config = {
  experimental: {
    externalDir: true,
  },
  pageExtensions: ['md', 'mdx', 'tsx'],
  reactStrictMode: true,
}

module.exports = withVanillaExtract(withMDX(config))
