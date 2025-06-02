import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  initalValue?: string;
  change: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initalValue,
  change,
}) => {
  interface HandleChangeProps {
    (content: string): void;
  }

  const handleChange: HandleChangeProps = (content) => {
    change(content);
  };
  return (
    <ReactQuill
      value={initalValue}
      onChange={handleChange}
      placeholder="Write something amazing..."
      modules={{
        toolbar: [
          [{ font: [] }],
          ["bold", "italic", "underline"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, false] }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["direction", { align: [] }],
          ["link", "image", "video"],
          ["clean"],
        ],
      }}
    />
  );
};

export default RichTextEditor;
