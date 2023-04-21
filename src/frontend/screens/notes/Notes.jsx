import { NoteCard, Sidebar, TextEditor } from "../../components";
import { useNotes } from "../../context";
import "./Notes.css";

function Notes() {
  const { notesData } = useNotes();

  return (
    <div className="main-container">
      <Sidebar />
      <div className="main-screen">
        <TextEditor />
        <div className="note-card-container">
          {notesData &&
            notesData.map((note) => {
              return !note.isInTrash && <NoteCard key={note._id} note={note} />;
            })}
        </div>
      </div>
    </div>
  );
}

export { Notes };
