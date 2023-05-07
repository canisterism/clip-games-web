import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../schema.graphql",
  documents: "graphql/**/*.ts",
  generates: {
    "./graphql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
