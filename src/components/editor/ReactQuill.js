import { useEffect, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
const QuillEditor = ({ setBody,body }) => {
  toast.configure();
  const quillRef = useRef(null);
  const modules = { toolbar: { container } };
  const handleChange = (e) => {
    setBody(e);
  };
  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = async () => {
      const files = input.files;
      if (!files) {
        return toast.error("không tìm thấy file", {
          osition: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
      const file = files[0];
      const check = checkImage(file);
      if (check) {
        return toast.error(check, {
          osition: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
      const image = await imageUpload(file);
      const quill = quillRef.current;
      const range = quill.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, "image", `${image.url}`);
      }
    };
  }, []);
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);
  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Viết nội dung..."
        onChange={handleChange}
        value={body}
        ref={quillRef}
      />
    </div>
  );
};
let container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];

export default QuillEditor;
