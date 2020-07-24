module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-react-jsx-source',
  ],
  env: {
    production: {
      plugins: ['babel-plugin-styled-components'],
    },
    development: {
      plugins: [['babel-plugin-styled-components', { sourceMap: true }]],
    },
  },
};
