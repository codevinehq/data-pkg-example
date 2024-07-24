import { Suspense } from "react";

const Loader = () => {
	return (
		<div className="flex items-center justify-center p-12">
			<div className="w-20 h-20 border-8 border-gray-300 rounded-full animate-spin border-t-amber-400" />
		</div>
	);
};

export const SuspenseLoader = ({ children }: { children: React.ReactNode }) => {
	return <Suspense fallback={<Loader />}>{children}</Suspense>;
};
