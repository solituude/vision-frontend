module.exports = {
    preset: 'ts-jest',
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        '^.+\\.css$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
