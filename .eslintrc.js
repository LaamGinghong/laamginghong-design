const { resolve } = require

module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:eslint-comments/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.json'],
            },
            typescript: {
                directory: [resolve('./tsconfig.json')],
            },
        },
    },
    parser: '@typescript-eslint/parser',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/member-naming': [
            'error',
            {
                private: '^_',
                protected: '^__',
            },
        ],
        'import/extensions': [
            2,
            'ignorePackages',
            { ts: 'never', tsx: 'never', json: 'never', js: 'never' },
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'react/state-in-constructor': [2, 'never'],
        '@typescript-eslint/no-empty-interface': 'warn',
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react/destructuring-assignment': [
            1,
            'always',
            { ignoreClassFields: true },
        ],
        'no-underscore-dangle': [
            2,
            { allowAfterThis: true, allowAfterSuper: true },
        ],
        'react/jsx-props-no-spreading': 0,
        'react-hooks/exhaustive-deps': 1,
        'react/static-property-placement': 0,
        'no-unused-expressions': [
            2,
            {
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        'consistent-return': 0,
        'no-param-reassign': 0,
        'no-nested-ternary': 1,
        'react/button-has-type': 0,
    },
    overrides: [
        {
            files: ['**/*.d.ts'],
            rules: {
                'import/no-duplicate': 'off',
            },
        },
        {
            files: ['**/*.tsx'],
            rules: {
                'react/prop-types': 'off',
            },
        },
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                'no-undef': 0,
            },
        },
    ],
}
