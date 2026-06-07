import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: { globalError?: boolean; errorMessage?: string };
  }
}

const extractMessage = (error: unknown): string | undefined => {
  if (error && typeof error === "object") {
    const value = (error as { value?: unknown }).value;
    if (value && typeof value === "object" && "message" in value) {
      return String((value as { message: unknown }).message);
    }
    if ("message" in error && (error as { message?: unknown }).message) {
      return String((error as { message: unknown }).message);
    }
  }

  return undefined;
};

const queryCache = new QueryCache();

const mutationCache = new MutationCache({
  onError: (error, _variables, _context, mutation) => {
    if (!mutation.meta?.globalError) {
      return;
    }

    toast.error(
      mutation.meta.errorMessage ??
        extractMessage(error) ??
        "Something went wrong. Please try again.",
    );
  },
});

export default new QueryClient({
  queryCache,
  mutationCache,
});
