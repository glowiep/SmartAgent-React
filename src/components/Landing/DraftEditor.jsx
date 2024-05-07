// Packages required for HTML text editor
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

// Import constants
import { modules, formats } from "../../constants/draft-editor-format";

function DraftEditor({ value, onChange }) {
  return (
    <div>
      <div className="pb-10 dark:text-white">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          onChange={onChange}
          style={{ height: "17em", width: "100%" }}
        ></ReactQuill>
      </div>
    </div>
  );
}

export default DraftEditor;
