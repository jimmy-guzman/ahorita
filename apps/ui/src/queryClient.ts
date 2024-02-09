import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const queryCache = new QueryCache({
	onError: (error) => toast.error(`Something went wrong: ${error.message}`),
});

const mutationCache = new MutationCache({
	onError: (error) => toast.error(`Something went wrong: ${error.message}`),
});

export const queryClient = new QueryClient({
	queryCache,
	mutationCache,
});
