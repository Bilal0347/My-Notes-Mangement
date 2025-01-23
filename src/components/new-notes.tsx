import NoteForm from "./note-form";
import { NewNoteProps } from "../type";

const NewNotes = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <div>
      <h1 className="mb-4">New Notes</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};
export default NewNotes;
