module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import', 'unicorn'],
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

        'unicorn/prevent-abbreviations': [
            'error',
            {
                allowList: {
                    i: true,
                    args: true,
                    'app.e2e-spec': true,
                },
                ignore: ['\\.e2e$', /^ignore/i],
            },
        ],
    },
};
