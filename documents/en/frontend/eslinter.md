# ESLINTER setup

I would like to add **ESLint-config file for SPA (React+TS+Vite) with Feature-Sliced Design (FSD) architecture**

## Lets' check current libs in my project:

```sh
npm list --depth=0
showapp@0.0.0 /Users/.../tiny-monitor/frontend/showapp
├── @eslint/js@9.36.0
├── @types/react-dom@19.1.9
├── @types/react@19.1.15
├── @vitejs/plugin-react@5.0.4
├── eslint-plugin-react-hooks@5.2.0
├── eslint-plugin-react-refresh@0.4.22
├── eslint@9.36.0
├── globals@16.4.0
├── react-dom@19.1.1
├── react@19.1.1
├── typescript-eslint@8.45.0
├── typescript@5.8.3
└── vite@7.1.7

showapp % npm list -g --depth=0
/Users/.../.nvm/versions/node/v22.20.0/lib
├── corepack@0.34.0
└── npm@10.9.3
```

I've already had a linter file (`frontend/showapp/eslint.config.js`):
```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
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
    },
  },
])
```

## Instruction how install and setup ESLinter:





## ⚙️ **1. Setup new dependencies:**

```sh
npm i -D eslint-plugin-import eslint-plugin-simple-import-sort eslint-plugin-boundaries eslint-plugin-unused-imports
```

💡 Эти плагины нужны для:

* **TypeScript-lint** — `@typescript-eslint/*`
* **React-best-practices** — `eslint-plugin-react`, `eslint-plugin-react-hooks`
* **Импорты и сортировка** — `eslint-plugin-import`, `eslint-plugin-simple-import-sort`
* **FSD-границы** — `eslint-plugin-boundaries`
* **Удаление мусора** — `eslint-plugin-unused-imports`

---

## 🧩 **2. Changes in eslint.config.js:**

- Add new imports:
```js
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import boundaries from 'eslint-plugin-boundaries'
import unusedImports from 'eslint-plugin-unused-imports'
```

- Add `node_modules` to globalIgnores
```js
  globalIgnores(['dist', 'node_modules']),
```

- Add some languageOptions:
```js
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        projectService: true,
      },
```

- Add plugins and rules:
```js
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
```


## How to run ESLint:

```sh
npm run lint
```

```sh
npx eslint . --fix
```



