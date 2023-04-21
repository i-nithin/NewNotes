import "./QuillEditor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

function QuillEditor({ setNote, note }) {
  return (
    <ReactQuill
      modules={modules}
      onChange={(value) => setNote({ ...note, desc: value })}
      value={note.desc}
      theme="snow"
      placeholder="Take a note..."
    />
  );
}

export { QuillEditor };
