import type { StorybookConfig } from "@storybook/nextjs";
const TsconfogPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

const config: StorybookConfig = {
  staticDirs: ["public"],
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  babel: async (options) => ({
    ...options,
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
      "@babel/plugin-proposal-private-property-in-object",
    ],
  }),
  webpackFinal: async (config) => {
    config.resolve = {}; // Initialize config.resolve as an empty object
    config.resolve.plugins = [
      new TsconfogPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ];

    return config;
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
