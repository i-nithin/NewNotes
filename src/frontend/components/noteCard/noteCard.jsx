import "./noteCard.css";

import axios from "axios";
import { TextEditorFooterAction } from "../TextEditorFooterAction/TextEditorFooterAction";
import { useArchive, useAuth, useNotes } from "../../context";
import { Modal } from "../modal/Modal";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function NoteCard({ note }) {
  const { isAuthorized } = useAuth();
  const { setNotesData } = useNotes();
  const { postArchive, restoreArchive } = useArchive();
  const { _id, title, desc, color, priority, tags, createdAt } = note;
  const [noteModal, setNoteModal] = useState(false);

  const { pathname } = useLocation();
  const foreverDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/notes/${id}`, {
        headers: {
          authorization: isAuthorized.authtoken,
        },
      });
      setNotesData(data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (note) => {
    try {
      const { data } = await axios.post(
        `/api/notes/${note._id}`,
        { note },
        {
          headers: {
            authorization: isAuthorized.authtoken,
          },
        }
      );
      setNotesData(data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="height-fit-content">
      {noteModal ? (
        <Modal
          noteModal={noteModal}
          note={note}
          editNote={(note) => updateNote(note)}
          setNoteModal={setNoteModal}
        />
      ) : null}

      <div className={`note-card ${color}`}>
        {priority && <div className="badge-priority">{priority}</div>}
        <div className="note-card-header">
          <div className="note-title"> {title} </div>
          {/* <button className="icon-btn material-icons-outlined"> push_pin </button> */}
        </div>

        <div
          className="note-card-desc p-1"
          dangerouslySetInnerHTML={{ __html: desc }}
        />

        <div>
          <div className="tag-container">
            {tags &&
              tags.map((tag, index) => (
                <div className="badge-text  d-flex align-center" key={index}>
                  {tag}
                  <span
                    className="material-icons icon-btn cursor-pointer font-size-regular"
                    onClick={() =>
                      updateNote({
                        ...note,
                        tags: tags.filter((newtag) => newtag !== tag),
                      })
                    }
                  >
                    clear
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div>{createdAt}</div>
        <div className="note-card-footer">
          <div className="btn-container p-relative">
            {pathname === "/archive" || pathname === "/trash" ? null : (
              <TextEditorFooterAction
                note={note}
                setNote={(note) => updateNote(note)}
              />
            )}

            <button
              className="icon-btn material-icons-outlined"
              title="Edit Note"
              onClick={() => setNoteModal(!noteModal)}
            >
              edit
            </button>
            {pathname === "/archive" ? (
              <button
                className="icon-btn material-icons-outlined"
                title="Un-Archive"
                onClick={() => restoreArchive(_id, note)}
              >
                unarchive
              </button>
            ) : pathname !== "/trash" ? (
              <button
                className="icon-btn material-icons-outlined"
                title="Archive"
                onClick={() => postArchive(_id, note)}
              >
                archive
              </button>
            ) : null}

            {note.isInTrash ? (
              <button
                className="icon-btn material-icons-outlined"
                title="Restore"
                onClick={() => updateNote({ ...note, isInTrash: false })}
              >
                restore_from_trash
              </button>
            ) : (
              <button
                className="icon-btn material-icons-outlined"
                title="Trash"
                onClick={() => updateNote({ ...note, isInTrash: true })}
              >
                {" "}
                delete{" "}
              </button>
            )}

            {pathname === "/trash" && (
              <button
                className="icon-btn material-icons-outlined"
                title="Delete"
                onClick={() => foreverDelete(_id, note)}
              >
                delete_forever
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { NoteCard };
