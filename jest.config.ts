import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

const ESM_MODULES = [
  "framer-motion",
  "next-intl",
  "use-intl",
  "@formatjs",
  "intl-messageformat",
];

const config = async (): Promise<Config> => {
  const nextJestConfig = await createJestConfig(customJestConfig)();

  return {
    ...nextJestConfig,
    transformIgnorePatterns: [
      `[/\\\\]node_modules[/\\\\](?!(${ESM_MODULES.join("|")})[/\\\\])`,
      "^.+\\.module\\.(css|sass|scss)$",
    ],
  };
};

module.exports = config;
