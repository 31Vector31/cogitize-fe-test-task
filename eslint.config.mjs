import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([{
    extends: [...nextCoreWebVitals, ...nextTypescript],

    rules: {
        "@typescript-eslint/no-explicit-any": "off",

        "import/no-internal-modules": ["error", {
            allow: [
                "**/index.ts",
                "next/server",
                "next/navigation",
                "@reduxjs/toolkit/query/react",
                "@reduxjs/toolkit/query",
                "next-intl/middleware",
                "next-intl/routing",
                "next-intl/server",
                "next-intl/navigation",
                "next/font/google",
                "next/image",
                "/styles/globals.css",
                "next-intl/plugin",
                "next/constants.js",
                "next/jest",
                "eslint/config",
                "eslint-config-next/core-web-vitals",
                "eslint-config-next/typescript",
            ],
        }],
    },
}, {
    files: ["**/index.ts", "**/index.tsx"],

    rules: {
        "import/no-internal-modules": "off",
    },
}]);