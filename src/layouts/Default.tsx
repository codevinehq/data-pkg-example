import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Link, Outlet, useLocation } from "react-router-dom";
import { api } from "../api";
import type { Notes } from "../api/note/schema";
import { ErrorFallback } from "../components/ErrorFallback";
import { SuspenseLoader } from "../components/SuspenseLoader";

const getNotesCount = (notes: Notes) => notes.length;

export const DefaultLayout = () => {
	const location = useLocation();
	const { data: notesCount } = useQuery({
		...api.notes.getAll.query({}),
		select: getNotesCount,
	});
	return (
		<div className="space-y-8">
			<div className="bg-slate-900">
				<ul className="container flex items-center gap-6 p-4 m-auto text-white">
					<li>
						<Link className="hover:underline underline-offset-2" to="/">
							Notes ({notesCount})
						</Link>
					</li>
					<li>
						<Link className="hover:underline underline-offset-2" to="/create">
							New Note
						</Link>
					</li>
				</ul>
			</div>
			<div className="container p-4 m-auto ">
				<ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.pathname]}>
					<SuspenseLoader>
						<Outlet />
					</SuspenseLoader>
				</ErrorBoundary>
			</div>
		</div>
	);
};
