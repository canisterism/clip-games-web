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
  config: {
    scalars: {
      ISO8601DateTime: "string",
      JSON: "object",
    },
  },
};

export default config;
