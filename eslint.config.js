// @ts-nocheck
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const typescriptParser = require('@typescript-eslint/parser')
const globals = require('globals')
const prettierConfig = require('eslint-config-prettier')
const importPlugin = require('eslint-plugin-import')

module.exports = (async () => {
  const { clientConfig } = await import('./packages/client/eslint.client.config.js')

  return [
    {
      files: ['packages/**/*.{js,mjs,cjs,ts,tsx}'],
      ignores: ['**/dist/**', '**/*.config.{js,ts,cjs,mjs}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: typescriptParser,
        parserOptions: {
          tsconfigRootDir: __dirname,
          project: './packages/*/tsconfig.json',
        },
        globals: {
          ...globals.browser,
        },
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: ['packages/*/tsconfig.json', 'tsconfig.json'],
          },
        },
      },
      plugins: {
        import: importPlugin,
        '@typescript-eslint': typescriptEslint,
      },
      rules: {
        ...importPlugin.configs.recommended.rules,
        ...importPlugin.configs.typescript.rules,
        ...typescriptEslint.configs['eslint-recommended'].rules,
        ...typescriptEslint.configs['recommended-type-checked'].rules,
        ...typescriptEslint.configs['stylistic-type-checked'].rules,
        'arrow-body-style': ['error', 'as-needed'],
        'no-use-before-define': 'error',
        '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
        'import/no-anonymous-default-export': 'error',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'import/no-named-default': 'error',
        'import/no-named-export': 'off',
        'import/no-useless-path-segments': 'error',
        'import/newline-after-import': 'error',
        'import/no-cycle': ['error', { maxDepth: 3, ignoreExternal: true }],
        'import/no-duplicates': ['error', { 'prefer-inline': true }],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            'newlines-between': 'never',
            pathGroups: [
              {
                pattern: '@\\w/*',
                group: 'internal',
              },
              {
                pattern: '@assets/**/*',
                group: 'object',
              },
              {
                pattern: './*.module.scss',
                group: 'object',
                position: 'after',
              },
            ],
          },
        ],
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            peerDependencies: true,
            optionalDependencies: false,
          },
        ],
        'import/no-unresolved': [2, { caseSensitive: true }],
      },
    },
    clientConfig,
    prettierConfig,
  ]
})()
