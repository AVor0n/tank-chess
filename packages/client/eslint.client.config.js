import react from 'eslint-plugin-react'
import hooks from 'eslint-plugin-react-hooks'

export const clientConfig = {
  files: ['packages/client/src/**/*.{js,mjs,cjs,ts,tsx}'],
  plugins: {
    react,
    'react-hooks': hooks,
  },
  languageOptions: {
    parserOptions: {
      jsxPragma: null,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    ...hooks.configs.recommended.rules,
    'no-console': 'error',
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/self-closing-comp': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/no-multi-comp': ['warn', { ignoreStateless: true }],
    'react/no-array-index-key': 'warn',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    // 'react/jsx-no-leaked-render': 'error', //TODO: issue Y-56
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-curly-brace-presence': 'error',
    'react/no-unused-prop-types': 'error',
    'react/display-name': 'off',
  },
}
