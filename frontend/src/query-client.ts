import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryCache = new QueryCache();

export default new QueryClient({
  queryCache,
});
