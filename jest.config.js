module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios|@refinedev).*", // ✅ Transpile axios and refinedev
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
