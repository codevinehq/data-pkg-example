import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Notes } from "./pages/Notes/Notes";
import { Note } from "./pages/Note/Note";
import { CreateNote } from "./pages/CreateNote/CreateNote";
import { Toaster } from "react-hot-toast";
import { DefaultLayout } from "./layouts/Default";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index path="/" element={<Notes />}></Route>
            <Route path="/create" element={<CreateNote />}></Route>
            <Route path="/:id" element={<Note />}></Route>
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
