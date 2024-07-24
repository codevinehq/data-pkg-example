import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import type React from "react";
import { type ReactElement, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<ErrorBoundary
			FallbackComponent={() => null}
			onError={(e) => {
				console.error(e);
			}}
		>
			<QueryClientProvider client={queryClient}>
				<Suspense>{children}</Suspense>
			</QueryClientProvider>
		</ErrorBoundary>
	);
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> & { user: UserEvent } => {
	const user = userEvent.setup();

	return {
		user,
		...render(ui, { wrapper: AllTheProviders, ...options }),
	};
};
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
