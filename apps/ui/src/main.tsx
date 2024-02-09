import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { queryClient } from "./queryClient";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	defaultPreloadStaleTime: 0,
	defaultPreload: "intent",
	context: {
		queryClient,
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const root = document.getElementById("root");

if (root) {
	createRoot(root).render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</StrictMode>,
	);
}
