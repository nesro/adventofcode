module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'unicorn'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:unicorn/all'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        // '@typescript-eslint/interface-name-prefix': 'off',
        // '@typescript-eslint/explicit-module-boundary-types': 'off',
        'unicorn/prefer-top-level-await': 'off',

        'unicorn/number-literal-case': 'off',
        'unicorn/numeric-separators-style': 'off',
        'unicorn/prefer-event-target': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-nested-ternary': 'off',
        'unicorn/prefer-spread': 'off',
    },
};
