/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'node',

    coverageDirectory: 'coverage',
    coverageProvider: 'v8',

    watchPathIgnorePatterns: ['<rootDir>/.postgres_data'],

    modulePathIgnorePatterns: ['<rootDir>/.postgres_data'],
}

export default config
