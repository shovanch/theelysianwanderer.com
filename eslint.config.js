import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginUnicorn from 'eslint-plugin-unicorn';
import configPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import pluginOxlint from 'eslint-plugin-oxlint';

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/.next/**', 'src/content/**'],
  },
  js.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      unicorn: pluginUnicorn,
      import: pluginImport,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReact.configs.flat['jsx-runtime'].rules,

      // Unicorn rules
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
      'unicorn/prevent-abbreviations': [
        'warn',
        {
          allowList: {
            props: true,
            Props: true,
            params: true,
            Params: true,
          },
        },
      ],

      // Import rules - simplified to avoid conflicts
      'import/no-unresolved': 'off', // TypeScript handles this
      'import/named': 'off',
      'import/default': 'off',
      'import/namespace': 'off',
      'import/export': 'off',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            { pattern: '~/**', group: 'internal', position: 'after' },
          ],
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // react rules
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],

      // TypeScript-specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  pluginOxlint.configs['flat/recommended'], // oxlint should be the last one
  configPrettier,
);
