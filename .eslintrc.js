module.exports = {
    parser: '@typescript-eslint/parser', // Парсер TS
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        es2022: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended' // << добавлено
    ],
    plugins: ['react', '@typescript-eslint'],
    rules: {
        // свои правила
        'react/prop-types': 'off', // если не используешь prop-types
        '@typescript-eslint/no-explicit-any': 'warn',
        // и т.д.
    },
    settings: {
        react: {
            version: 'detect' // автоматически подхватывать версию React
        }
    }
}
