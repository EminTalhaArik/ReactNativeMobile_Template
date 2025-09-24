module.exports = {
  root: true,
  extends: ['@react-native/eslint-config', 'plugin:import/typescript', 'plugin:import/recommended', 'prettier'],
  plugins: ['import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/no-default-export': 'off',
    'import/no-cycle': ['warn', {maxDepth: 1}],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@app/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@features/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@shared/**',
            group: 'internal',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always'
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      }
    }
  }
};
