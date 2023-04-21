import { useState } from "react";
import "./TextEditorFooterAction.css";

function TextEditorFooterAction({ note, setNote }) {
  const colorList = [
    "color-default",
    "color-note-first",
    "color-note-second",
    "color-note-third",
  ];

  const priorityList = ["High", "Medium", "Low"];

  const [isTrue, setIsTrue] = useState({
    palette: false,
    label: false,
    priority: false,
  });

  const { tags } = note;
  const [newTag, setNewTag] = useState("");

  return (
    <>
      <button
        className="icon-btn material-icons-outlined p-relative"
        title="Select colors"
        onClick={() => setIsTrue({ ...isTrue, palette: !isTrue.palette })}
      >
        palette
      </button>
      {isTrue.palette ? (
        <div className="color-tooltip">
          {colorList.map((bgColor, index) => {
            return (
              <button
                key={index}
                className={`${bgColor} ${
                  note.color === bgColor ? "active-color-btn" : "color-btn"
                }`}
                onClick={() => setNote({ ...note, color: bgColor })}
              ></button>
            );
          })}
        </div>
      ) : null}

      <button
        className="icon-btn material-icons-outlined"
        title="Select Label"
        onClick={() => setIsTrue({ ...isTrue, label: !isTrue.label })}
      >
        label
      </button>
      {isTrue.label ? (
        <div className="label-tooltip p-relative">
          <input
            type="text"
            className="label-input"
            placeholder="label name"
            onChange={(e) => setNewTag(e.target.value)}
          />
          <div className="d-flex">
            <button
              className="notesy-btn notesy-primary-btn font-size-sm"
              onClick={() => {
                setIsTrue({ ...isTrue, label: !isTrue.label });
                return setNote({ ...note, tags: [...tags, newTag] });
              }}
            >
              Add
            </button>

            <button
              className="icon-btn material-icons-outlined font-size-sm"
              title="Remove"
              onClick={() => setIsTrue({ ...isTrue, label: !isTrue.label })}
            >
              clear
            </button>
          </div>
        </div>
      ) : null}

      <div>
        <button
          className="icon-btn material-icons-outlined"
          title="Set Priority"
          onClick={() => setIsTrue({ ...isTrue, priority: !isTrue.priority })}
        >
          swap_vertical_circle
        </button>

        {isTrue.priority ? (
          <div className="priority-tooltip">
            {priorityList.map((item) => {
              return (
                <label htmlFor={item} key={item} name="priority">
                  <input
                    type="radio"
                    id={item}
                    name="priority"
                    onChange={() => setNote({ ...note, priority: item })}
                  />
                  {item}
                </label>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}
export { TextEditorFooterAction };
