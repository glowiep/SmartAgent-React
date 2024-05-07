// Packages required for HTML text editor
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'
import DOMPurify from 'dompurify';

// Import constants
import { modules, formats } from '../../../constants/draft-editor-format';

function DraftEditor({ customer_name, setEditorState }) {
  const handleProcedureContentChange = (content) => {
    console.log("content---->", content);
    const sanitizedContent = DOMPurify.sanitize(content)
    setEditorState(sanitizedContent);    
  };

  const defaultValue = `<p>Hi ${customer_name}, </p><p><br></p><br><p><br></p><p>Regards,</p><p><br></p><p><strong>SmartAgent</strong></p><p>Customer Support</p><a href="mailto:smartagents3@gmail.com">smartagents3@gmail.com</a>`

  return (
    <div>
      <div className="pb-10 dark:text-white">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="..."
          defaultValue={defaultValue}
          onChange={handleProcedureContentChange}
          style={{ height: "17em", width: "100%"}}
        >
        </ReactQuill>
      </div>
    </div>
  );
};

export default DraftEditor;