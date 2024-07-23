import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Notes } from "./pages/Notes/Notes";
import { Note } from "./pages/Note/Note";
import { CreateNote } from "./pages/CreateNote/CreateNote";
import { Toaster } from "react-hot-toast";
import { DefaultLayout } from "./layouts/Default";
import { routes } from "./lib/routes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index path={routes.notes()} element={<Notes />}></Route>
            <Route path={routes.create()} element={<CreateNote />}></Route>
            <Route path={routes.note(":id")} element={<Note />}></Route>
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
