module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "next/core-web-vitals",
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off'
  },
}
