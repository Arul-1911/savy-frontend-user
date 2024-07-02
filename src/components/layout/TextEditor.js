import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import { Container } from 'react-bootstrap';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const handleCut = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const newContentState = Modifier.removeRange(
        editorState.getCurrentContent(),
        selection,
        'forward'
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        'remove-range'
      );
      setEditorState(newEditorState);
    }
  };

  const handleCopy = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const copiedText = editorState.getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getText()
        .slice(selection.getStartOffset(), selection.getEndOffset());
      navigator.clipboard.writeText(copiedText);
    }
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    const newContentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    setEditorState(newEditorState);
  };

  return (
    <Container>
      <button onClick={onBoldClick}>Bold</button>
      <button onClick={onItalicClick}>Italic</button>
      <button onClick={handleCut}>Cut</button>
      <button onClick={handleCopy}>Copy</button>
      <button onClick={handlePaste}>Paste</button>
      <div style={{ border: '1px solid black', minHeight: '100px', padding: '10px' }}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
      </div>
    </Container>
  );
};

export default TextEditor;
