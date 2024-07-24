import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/Default";
import { routes } from "./lib/routes";
import { CreateNote } from "./pages/CreateNote/CreateNote";
import { Note } from "./pages/Note/Note";
import { Notes } from "./pages/Notes/Notes";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route element={<DefaultLayout />}>
						<Route index path={routes.notes()} element={<Notes />} />
						<Route path={routes.create()} element={<CreateNote />} />
						<Route path={routes.note(":id")} element={<Note />} />
					</Route>
				</Routes>
			</Router>
			<Toaster />
		</>
	);
}

export default App;
