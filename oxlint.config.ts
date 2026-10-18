import jestDom from 'eslint-plugin-jest-dom';
import playwright from 'eslint-plugin-playwright';
import regexp from 'eslint-plugin-regexp';
import tailwindcss from 'eslint-plugin-tailwindcss';
import { defineConfig } from 'oxlint';

type ExternalConfig = { rules?: Record<string, unknown> };

const rulesFrom = (...configs: Array<ExternalConfig | ExternalConfig[]>) =>
  Object.assign({}, ...configs.flat().map((config) => config.rules ?? {}));
const disabledRulesFrom = (...configs: Array<ExternalConfig | ExternalConfig[]>) =>
  Object.fromEntries(Object.keys(rulesFrom(...configs)).map((rule) => [rule, 'off']));

export default defineConfig({
  categories: {
    correctness: 'error',
  },
  env: {
    builtin: true,
    browser: true,
    es2026: true,
    node: true,
  },
  ignorePatterns: [
    '**/.next/**',
    '**/__fixtures__/**',
    '**/build/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/out/**',
    '**/storybook-static/**',
  ],
  // Testing Library rules were not active in the former flat config: its
  // config was overwritten by the following jest-dom spread. Version 6.3
  // also relies on an ESLint scope API that Oxlint's JS bridge does not expose.
  jsPlugins: [
    'eslint-plugin-jest-dom',
    'eslint-plugin-playwright',
    'eslint-plugin-regexp',
    'eslint-plugin-simple-import-sort',
    'eslint-plugin-tailwindcss',
  ],
  options: {
    denyWarnings: true,
    reportUnusedDisableDirectives: 'deny',
    respectEslintDisableDirectives: false,
    typeAware: true,
  },
  plugins: [
    'eslint',
    'import',
    'jsdoc',
    'jsx-a11y',
    'nextjs',
    'node',
    'oxc',
    'react',
    'typescript',
    'unicorn',
    'vitest',
  ],
  rules: {
    ...rulesFrom(regexp.configs['flat/recommended']),
    curly: 'error',
    eqeqeq: ['error', 'smart'],
    'import/first': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'jsdoc/check-access': 'warn',
    'jsdoc/check-property-names': 'warn',
    'jsdoc/check-tag-names': 'off',
    'jsdoc/empty-tags': 'warn',
    'jsdoc/implements-on-classes': 'warn',
    'jsdoc/no-defaults': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-property': 'warn',
    'jsdoc/require-property-description': 'warn',
    'jsdoc/require-property-name': 'warn',
    'jsdoc/require-returns-description': 'warn',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/autocomplete-valid': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/interactive-supports-focus': [
      'error',
      {
        tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox'],
      },
    ],
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/media-has-caption': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': [
      'error',
      {
        canvas: ['img'],
        tr: ['none', 'presentation'],
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        alert: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
        body: ['onError', 'onLoad'],
        dialog: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
        handlers: ['onClick', 'onError', 'onLoad', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
        iframe: ['onError', 'onLoad'],
        img: ['onError', 'onLoad'],
      },
    ],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        fieldset: ['radiogroup', 'presentation'],
        li: ['menuitem', 'menuitemradio', 'menuitemcheckbox', 'option', 'row', 'tab', 'treeitem'],
        ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        table: ['grid'],
        td: ['gridcell'],
        ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
      },
    ],
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        allowExpressionValues: true,
        roles: ['tabpanel'],
        tags: [],
      },
    ],
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/no-static-element-interactions': [
      'error',
      {
        allowExpressionValues: true,
        handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
      },
    ],
    'jsx-a11y/prefer-tag-over-role': 'off',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    'node/handle-callback-err': ['error', '^(err|error)$'],
    'node/no-exports-assign': 'error',
    'node/no-new-require': 'error',
    'no-alert': 'error',
    'no-console': 'error',
    'no-eval': 'error',
    'no-new-func': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'react/rules-of-hooks': 'error',
    'react/incompatible-library': 'off',
    'react/set-state-in-effect': 'off',
    'react/static-components': 'off',
    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/no-instanceof-array': 'error',
    'unicorn/no-new-array': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/throw-new-error': 'error',
    'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
    'vitest/no-identical-title': 'error',
    'vitest/no-import-node-test': 'error',
    'vitest/prefer-hooks-in-order': 'error',
    'vitest/require-mock-type-parameters': 'off',
    'vitest/require-to-throw-message': 'off',
  },
  settings: {
    next: {
      rootDir: ['.'],
    },
    tailwindcss: {
      config: { content: [] },
      whitelist: ['storybook-decorator', 'storybook-decorator__.*'],
    },
  },
  overrides: [
    {
      files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
      rules: {
        ...rulesFrom(tailwindcss.configs['flat/recommended']),
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
      },
    },
    {
      files: ['src/**/*.test.{js,jsx,ts,tsx}'],
      rules: rulesFrom(jestDom.configs['flat/recommended']),
    },
    {
      files: ['src/**/*.{spec,e2e}.{js,jsx,ts,tsx}'],
      rules: rulesFrom(playwright.configs['flat/recommended']),
    },
    {
      files: ['**/*.stories.{js,jsx,ts,tsx}'],
      rules: {
        'nextjs/no-img-element': 'off',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: disabledRulesFrom(regexp.configs['flat/recommended'], tailwindcss.configs['flat/recommended']),
    },
  ],
});
