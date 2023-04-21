import { NoteCard, Sidebar } from "../../components";
import { useFilter, useNotes } from "../../context";
import "./Search.css";

function Search() {
  const { notesData } = useNotes();
  const { searchQuery } = useFilter();

  const finalData = notesData.filter((note) =>
    note.title.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container">
      <Sidebar />
      <div className="main-screen">
        <div className="note-card-container">
          {finalData?.length > 0 ? (
            finalData.map((note) => {
              return !note.isInTrash && <NoteCard key={note._id} note={note} />;
            })
          ) : (
            <div className="d-flex gap-1">
              <div className="material-icons-outlined">block</div>
              <div> No matching result </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Search };
