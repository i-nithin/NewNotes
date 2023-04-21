import { createContext, useContext, useEffect } from "react";
import { useAuth } from "../auth-context/auth-context";
import axios from "axios";
import { useState } from "react";

const NoteContext = createContext();

function NoteProvider({ children }) {
  const { isAuthorized } = useAuth();

  const [notesData, setNotesData] = useState([]);

  async function createNote(note) {
    try {
      const response = await axios.post(
        "/api/notes",
        { note },
        {
          headers: {
            authorization: isAuthorized.authtoken,
          },
        }
      );
      setNotesData(response.data.notes);
    } catch (error) {
      console.error(error, "err in note provider");
    }
  }

  useEffect(() => {
    if (isAuthorized.status) {
      (async function getNotes() {
        try {
          const res = await axios.get("/api/notes", {
            headers: {
              authorization: isAuthorized.authtoken,
            },
          });
          setNotesData(res.data.notes);
        } catch (error) {
          console.error(error, "err in getnotes");
        }
      })();
    } else {
      setNotesData([]);
    }
  }, [isAuthorized]);

  return (
    <NoteContext.Provider value={{ createNote, notesData, setNotesData }}>
      {children}
    </NoteContext.Provider>
  );
}

const useNotes = () => useContext(NoteContext);

export { NoteProvider, useNotes };
