import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintImport from 'eslint-plugin-import'
import eslintReact from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintPluginPrettierRecommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: eslintImport,
      'simple-import-sort': eslintSimpleImportSort,
      react: eslintReact
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-console': ['warn', { allow: ['info', 'error'] }],
      'sort-imports': 'off',
      'import/order': 'off',
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/first': 'error',
      'import/no-internal-modules': ['off'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^@(([\\/.]?\\w)|assets|test-utils)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$']
          ]
        }
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'react/no-array-index-key': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-indent': 'off',
      'react/no-children-prop': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unused-prop-types': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: false
        }
      ],

      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['arrow-function'],
          unnamedComponents: 'arrow-function'
        }
      ],
      'arrow-parens': ['error', 'always'],
      'no-underscore-dangle': 'warn',
      'import/no-cycle': 'error'
    }
  }
)
