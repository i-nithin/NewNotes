import { NoteCard, Sidebar } from "../../components";
import { useFilter, useNotes } from "../../context";
import "../notes/Notes.css";
import "./FilterScreen.css";

function Filter() {
  function filterByPriority(state, data) {
    if (state.FilterByPriority && state.FilterByPriority === "high") {
      return data.filter((note) => note.priority === "High");
    }
    if (state.FilterByPriority && state.FilterByPriority === "medium") {
      return data.filter((note) => note.priority === "Medium");
    }
    if (state.FilterByPriority && state.FilterByPriority === "low") {
      return data.filter((note) => note.priority === "Low");
    }
    return data;
  }

  function sortByDate(state, data) {
    if (state.SortByDate && state.SortByDate === "oldest") {
      return [...data].sort(
        (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
      );
    }
    if (state.SortByDate && state.SortByDate === "newest") {
      return [...data].sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
    }
    return data;
  }

  const { notesData } = useNotes();
  const { filterState } = useFilter();
  const filteredData = filterByPriority(filterState, notesData);
  const finalData = sortByDate(filterState, filteredData);

  return (
    <div className="main-container">
      <Sidebar />
      <div className="main-screen">
        <div className="note-card-container">
          {finalData &&
            finalData.map((note, index) => {
              return <NoteCard note={note} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}

export { Filter };
