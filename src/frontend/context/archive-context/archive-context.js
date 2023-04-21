import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth-context/auth-context";
import { useNotes } from "../note-context/note-context";

const ArchiveContext = createContext();

function ArchiveProvider({ children }) {
  const [archiveData, setArchiveData] = useState([]);
  const { setNotesData } = useNotes();
  const { isAuthorized } = useAuth();

  const postArchive = async (id, note) => {
    try {
      const { data } = await axios.post(
        `/api/notes/archives/${id}`,
        { note },
        {
          headers: {
            authorization: isAuthorized.authtoken,
          },
        }
      );
      setArchiveData(data.archives);
      setNotesData(data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteArchive = async (id) => {
    try {
      const { data } = await axios.delete(`/api/archives/delete/${id}`, {
        headers: {
          authorization: isAuthorized.authtoken,
        },
      });
      setArchiveData(data.archives);
    } catch (error) {
      console.error(error);
    }
  };

  const restoreArchive = async (id, note) => {
    try {
      const { data } = await axios.post(
        `/api/archives/restore/${id}`,
        { note },
        {
          headers: {
            authorization: isAuthorized.authtoken,
          },
        }
      );
      setArchiveData(data.archives);
      setNotesData(data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthorized.status) {
      (async function getArchive() {
        try {
          const res = await axios.get("/api/notes", {
            headers: {
              authorization: isAuthorized.authtoken,
            },
          });
          setArchiveData(res.data.archives);
        } catch (error) {
          console.error(error, "err in get archive");
        }
      })();
    } else {
      setArchiveData([]);
    }
  }, [isAuthorized]);

  return (
    <ArchiveContext.Provider
      value={{
        postArchive,
        archiveData,
        restoreArchive,
        setArchiveData,
        deleteArchive,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
}

const useArchive = () => useContext(ArchiveContext);

export { ArchiveProvider, useArchive };
