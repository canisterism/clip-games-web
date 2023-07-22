import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks-web";

const searchClient = algoliasearch(
  "ARQKR6LI32",
  "0a0fcaec0b67c57e920f515c98da855c"
);

const indexName =
  process.env.NODE_ENV == "development"
    ? "development_games"
    : "production_games";

export const AlgoliaContext = ({ children }: { children: React.ReactNode }) => (
  <InstantSearch searchClient={searchClient} indexName={indexName} insights>
    {children}
  </InstantSearch>
);
