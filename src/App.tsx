import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import NewNotes from "./components/new-notes";
import useLocalStorage from "./data-hook/useLocalStorage";
import { NoteData, RawNote, Tag } from "./type";
import { v4 as uuidV4 } from "uuid";
import { useMemo } from "react";
import NoteList from "./components/note-list";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: note.tagsIds.map(
          (tagId) => tags.find((tag) => tag.id === tagId)!
        ),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={notesWithTags} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNotes
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
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
