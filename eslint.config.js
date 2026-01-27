import { defineConfig } from 'eslint/config'
import js from '@eslint/js'

export default defineConfig([
    {
        ignores: ['src/generated/prisma/**'],
    },
    {
        files: ['**/*.js'],
        plugins: {
            js,
        },
        extends: ['js/recommended'],
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'off',
        },
    },
])
