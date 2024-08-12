module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "next/core-web-vitals",
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  rules: {
    'react/prop-types': 'off'
  },
}
