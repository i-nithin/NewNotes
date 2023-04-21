import "./TextEditor.css";
import "../navbar/navbar.css";

import { useState } from "react";
import { useNotes } from "../../context";
import { QuillEditor } from "../QuillEditor/QuillEditor";
import { TextEditorFooterAction } from "../TextEditorFooterAction/TextEditorFooterAction";

function TextEditor() {
  const [note, setNote] = useState({
    title: "",
    desc: "",
    color: "",
    priority: "",
    tags: [],
    isInTrash: false,
  });

  const { createNote } = useNotes();

  function filterbadges(tags, tag) {
    return tags.filter((newtag) => newtag !== tag);
  }

  return (
    <div className="main-textEditor">
      <div className="text-editor-container d-flex gap-1 flex-column">
        <div>
          <input
            type="text"
            placeholder="Title"
            className="text-editor-title font-size-md"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>

        <QuillEditor note={note} setNote={setNote} />
        <div className="badge-text-container">
          {note.tags &&
            note.tags.map((tag, index) => (
              <div className="badge-text" key={index}>
                {tag}
                <span
                  className="material-icons icon-btn cursor-pointer font-size-regular"
                  onClick={() =>
                    setNote({ ...note, tags: filterbadges(note.tags, tag) })
                  }
                >
                  clear
                </span>
              </div>
            ))}
        </div>

        <div className="d-flex justify-between p-relative">
          <TextEditorFooterAction note={note} setNote={setNote} />
          <div>
            <button
              className="notesy-btn notesy-primary-btn"
              onClick={() => createNote(note)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TextEditor };
