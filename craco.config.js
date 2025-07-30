const path = require("path");

module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /.m?js$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
    },
  },

  jest: {
    configure: {
      moduleNameMapper: {
        "^@refinedev/(.*)$": "<rootDir>/node_modules/@refinedev/$1",
        "^components/(.*)$": "<rootDir>/src/components/$1",
        "^src/(.*)$": "<rootDir>/src/$1"
      },
      transformIgnorePatterns: ["/node_modules/(?!@refinedev)"],
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
    },
  },
};
