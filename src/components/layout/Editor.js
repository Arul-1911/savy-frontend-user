import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from './CustomEditor';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Underline } from "@ckeditor/ckeditor5-basic-styles";
// import { Underline } from "@ckeditor/ckeditor5-basic-styles";
// import { UnderlineUI } from '@ckeditor/ckeditor5-basic-styles';
// import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

const Editor = ({ description, setDescription, name, setForm, form }) => {
  // const [editorData, setEditorData] = useState('<p>Start typing...</p>');

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={description}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        config={{
          // plugins: [Underline], // Add the Underline plugin here
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "bulletedList",
            "numberedList",
            "insertTable",
            "undo",
            "redo",
          ],
          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
          },
          // plugins: [Underline],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          setDescription && setDescription(data);
          setForm && setForm({ ...form, [name]: data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default Editor;
