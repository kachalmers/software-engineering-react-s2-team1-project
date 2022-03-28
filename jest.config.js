module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.(css|sass)$": "identity-obj-proxy",
    }
};