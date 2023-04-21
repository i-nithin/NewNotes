import "./Modal.css";
import { useState } from "react";
import { QuillEditor } from "../QuillEditor/QuillEditor";
import { TextEditorFooterAction } from "../TextEditorFooterAction/TextEditorFooterAction";

function Modal({ note, editNote, setNoteModal }) {
  const [newNote, setNewNote] = useState({ ...note });

  return (
    <>
      <div className="modal-background" onClick={() => setNoteModal(false)}>
        <div
          className="main-textEditor modal-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="text-editor-container d-flex gap-1 flex-column">
            <div>
              <input
                type="text"
                placeholder="Title"
                className="text-editor-title font-size-md"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
              />
            </div>

            <QuillEditor note={newNote} setNote={setNewNote} />

            <div className="d-flex justify-between p-relative">
              <TextEditorFooterAction note={newNote} setNote={setNewNote} />
              <div>
                <button
                  className="notesy-btn notesy-primary-btn margin-right-10"
                  onClick={() => {
                    setNoteModal(false);
                    return editNote(newNote);
                  }}
                >
                  Edit
                </button>
                <button
                  className="notsy-btn notesy-btn notesy-secondary-btn "
                  onClick={() => setNoteModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Modal };
