import NoteForm from "./note-form";
import { NoteProps } from "../type";

const EditNote = ({ onSubmit, onAddTag, availableTags }: NoteProps) => {
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
export default EditNote;
