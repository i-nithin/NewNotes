import { NoteCard, Sidebar } from "../../components";
import { useNotes } from "../../context";
import "../notes/Notes.css";

function Trash() {
  const { notesData } = useNotes();
  const trashedNotes = notesData?.filter((note) => note.isInTrash);
  return (
    <div className="main-container">
      <Sidebar />
      <div className="main-screen">
        <div className="note-card-container">
          {trashedNotes?.length > 0 ? (
            trashedNotes.map((note) => <NoteCard key={note._id} note={note} />)
          ) : (
            <div className="d-flex gap-1">
              <div className="material-icons-outlined">delete</div>
              <div> No notes is trash</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Trash };
