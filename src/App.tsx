import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Notes } from "./pages/Notes/Notes";
import { Note } from "./pages/Note/Note";
import { CreateNote } from "./pages/CreateNote/CreateNote";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Notes />}></Route>
          <Route path="/create" element={<CreateNote />}></Route>
          <Route path="/:id" element={<Note />}></Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
