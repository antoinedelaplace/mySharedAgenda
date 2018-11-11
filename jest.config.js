/**
 * Jest Config File
 * @type {{verbose: boolean, preset: string, transform: {"^.+\\.(js)$": string}}}
 */
module.exports = {
  verbose: true,
  preset: "react-native",
  transform: {
    "^.+\\.(js)$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
  },
  setupFiles: [
    "./__mocks__/RNGoogleSigninMock.js",
    "./__mocks__/RNFirebaseMock.js",
  ],
  automock: false,
};