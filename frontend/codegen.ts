import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../schema.graphql",
  documents: "graphql/**/*.ts",
  generates: {
    "./graphql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  config: {
    scalars: {
      ISO8601DateTime: "string",
      JSON: "object",
    },
  },
};

export default config;
