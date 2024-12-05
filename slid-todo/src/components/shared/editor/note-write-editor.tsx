import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import NoteWriteToolbar from "./note-write-toolbar";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import ListKeymap from "@tiptap/extension-list-keymap";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";

import { cn } from "@/utils/cn";
import { Color } from "@tiptap/extension-color";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface NoteWriteEditorProps {
  content: string | null;
  onContentChange: (value: string) => void;
}

const NoteWriteEditor = ({ content, onContentChange }: NoteWriteEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Heading,
      Document,
      Paragraph,
      Text,
      Paragraph,
      ListKeymap,
      ListItem,
      BulletList,
      OrderedList,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "이곳에 노트를 기록해주세요. ",
        emptyNodeClass:
          "first:before:text-gray-400 first:before:h-0 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none ",
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: cn(
          "[&>div:first-child>div:first-child]:min-h-[500px] prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc min-h-[500px] p-2 outline-1 [&_p]:m-0 [&_p]:leading-normal",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      let html = editor.getHTML();
      if (html === "<p></p>") html = "";
      onContentChange(html);
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  return (
    <div>
      <EditorContent className="max-h-[500px] overflow-auto mb-2" editor={editor} />
      <NoteWriteToolbar editor={editor} />
    </div>
  );
};

export default NoteWriteEditor;
