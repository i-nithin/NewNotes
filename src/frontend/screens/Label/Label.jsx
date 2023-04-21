import { useState } from "react";
import { NoteCard, Sidebar } from "../../components";
import { useNotes } from "../../context";
import "../notes/Notes.css";
import "./Label.css";

function Label() {
  const { notesData } = useNotes();

  const newTags = notesData.reduce((acc, curr) => {
    return [...acc, ...curr.tags];
  }, []);

  const [newdata, setNewData] = useState([]);

  function filterUsingTag(tag) {
    return notesData.filter((note) => note.tags.includes(tag));
  }

  return (
    <div className="main-container">
      <Sidebar />
      <div className="main-screen">
        <div className="tag-btn-container">
          {newTags.map((tag, index) => (
            <button
              key={index}
              className="notesy-btn notesy-primary-btn"
              onClick={() => setNewData(filterUsingTag(tag))}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="note-card-container">
          {newdata?.length > 0 ? (
            newdata.map((note) => {
              return <NoteCard key={note._id} note={note} />;
            })
          ) : (
            <div className="d-flex gap-1">
              <div className="material-icons-outlined">label</div>
              <div> No labels yet </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Label };
