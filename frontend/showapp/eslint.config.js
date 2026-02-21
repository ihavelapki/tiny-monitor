import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import boundaries from 'eslint-plugin-boundaries'
import unusedImports from 'eslint-plugin-unused-imports'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        projectService: true,
      },
    },
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      boundaries,
      'unused-imports': unusedImports,
    },

    rules: {
      /* ---------- Clean imports ---------- */
      'unused-imports/no-unused-imports': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'import/no-duplicates': 'error',

      /* ---------- Hooks ---------- */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* ---------- TS ---------- */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      /* ---------- FSD boundaries ---------- */
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: 'Импорт нарушает архитектуру FSD',
          rules: [
            { from: ['shared'], allow: ['shared'] },
            { from: ['entities'], allow: ['shared', 'entities'] },
            { from: ['features'], allow: ['shared', 'entities', 'features'] },
            { from: ['widgets'], allow: ['shared', 'entities', 'features', 'widgets'] },
            { from: ['pages'], allow: ['shared', 'entities', 'features', 'widgets', 'pages'] },
            { from: ['processes'], allow: ['shared', 'entities', 'features', 'widgets', 'pages', 'processes'] },
            { from: ['app'], allow: ['shared', 'entities', 'features', 'widgets', 'pages', 'processes', 'app'] },
          ],
        },
      ],
    },

    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app' },
        { type: 'processes', pattern: 'src/processes' },
        { type: 'pages', pattern: 'src/pages' },
        { type: 'widgets', pattern: 'src/widgets' },
        { type: 'features', pattern: 'src/features' },
        { type: 'entities', pattern: 'src/entities' },
        { type: 'shared', pattern: 'src/shared' },
      ],
    },
  },
])
