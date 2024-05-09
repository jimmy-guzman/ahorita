import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const queryCache = new QueryCache({
  onError: (error) => toast.error(error.message),
});

const mutationCache = new MutationCache({
  onError: (error) => toast.error(error.message),
});

export default new QueryClient({
  queryCache,
  mutationCache,
});
