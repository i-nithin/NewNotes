import { NoteCard, Sidebar } from "../../components";
import { useArchive } from "../../context";
import "../notes/Notes.css";
import "./Archive.css";

function Archive() {
  const { archiveData } = useArchive();

  return (
    <div className="main-container">
      <Sidebar />
      <div className="main-screen">
        <div className="note-card-container">
          {archiveData?.length > 0 ? (
            archiveData.map((note, index) => {
              return <NoteCard note={note} key={index} />;
            })
          ) : (
            <div className="d-flex gap-1">
              <div className="material-icons-outlined">archive</div>
              <div> Your archived notes will appear here </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Archive };