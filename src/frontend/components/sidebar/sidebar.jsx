import { Link } from "react-router-dom";
import { useTheme } from "../../context";
import "./sidebar.css";

const sidebarList = [
  { title: "Notes", path: "notes", iconName: "sticky_note_2" },
  { title: "Archives", path: "archive", iconName: "archive" },
  { title: "Labels", path: "label", iconName: "label" },
  { title: "Trash", path: "trash", iconName: "delete" },
];

function Sidebar() {
  const { menu } = useTheme();

  return (
    <>
      <div className="sidebar-container sidebarDisplay">
        {sidebarList.map((item, index) => {
          return (
            <Link key={index} className="sidebar-link" to={`/${item.path}`}>
              <span className="material-icons-outlined">{item.iconName}</span>
              <h4> {item.title} </h4>
            </Link>
          );
        })}
      </div>

      {menu ? (
        <div className="sidebar-container">
          {sidebarList.map((item, index) => {
            return (
              <Link key={index} className="sidebar-link" to={`/${item.path}`}>
                <span className="material-icons-outlined">{item.iconName}</span>
                <h4> {item.title} </h4>
              </Link>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export { Sidebar };
