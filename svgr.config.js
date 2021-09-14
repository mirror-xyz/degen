const componentTemplate = ({ template }, opts, { componentName, jsx }) => {
  const code = `
    import React from 'react';
    NEWLINE
    import type { SVGProps } from '../SVGTypes';
    NEWLINE
    export const COMPONENT_NAME = ({ title, titleId, ...props }: SVGProps) => COMPONENT_JSX;
  `

  const reactTemplate = template.smart(code, {
    plugins: ['react', 'typescript'],
  })

  return reactTemplate({
    COMPONENT_NAME: componentName,
    COMPONENT_JSX: jsx,
    NEWLINE: '\n',
  })
}

module.exports = {
  prettier: true,
  ref: true,
  replaceAttrValues: { '#000': 'currentColor' },
  template: componentTemplate,
  typescript: true,
}
