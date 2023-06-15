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

const tokenPaths = glob
  .sync('../components/src/tokens/**/*.docs.mdx', {
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
        name: 'tokens',
        links: tokenPaths,
      },
      {
        name: 'components',
        links: componentPaths,
      },
    ],
  },
  experimental: {
    externalDir: true,
  },
  pageExtensions: ['mdx', 'tsx'],
  reactStrictMode: true,
}

/** @type {import('next').NextConfig} */
module.exports = withVanillaExtract(withMDX(config))
