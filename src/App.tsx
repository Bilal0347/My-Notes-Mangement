import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import NewNotes from "./components/new-notes";
import { RawNote, Tag } from "./type";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNotes />} />
        <Route path="/:id">
          <Route index element={<h1>Show note</h1>} />
          <Route path="edit" element={<h1>edit note</h1>} />
        </Route>
        <Route path="*" element={<h1>Home</h1>} />
      </Routes>
    </Container>
  );
}

export default App;
