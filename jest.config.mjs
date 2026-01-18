/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'node',

    transformIgnorePatterns: ['/node_modules/(?!(@faker-js/faker)/)'],

    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    collectCoverageFrom: ['src/**/*.js'],

    watchPathIgnorePatterns: ['<rootDir>/.postgres_data'],

    modulePathIgnorePatterns: ['<rootDir>/.postgres_data'],
    globalSetup: '<rootDir>/jest.global-setup.mjs',
}

export default config
