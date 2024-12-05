import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";
import PaintBucketInput from "./paint-bucket-input";
import { useFormModal } from "@/stores/use-form-modal-store";
import { useFormContext } from "react-hook-form";

interface ToolBarProps {
  editor: Editor | null;
}
const NoteWriteToolbar = ({ editor }: ToolBarProps) => {
  const { onOpen: onOpenLinkModal } = useFormModal();
  const { setValue } = useFormContext();

  if (!editor) return null;

  const onClickLinkBtn = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onOpenLinkModal({
      type: "link",
      mode: "add",
      onSubmit: (data) => {
        setValue("linkUrl", data.linkUrl || "");
      },
    });
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 px-[16px] py-[10px] border-[1px] sm:gap-8 text-slate-700 rounded-full border-slate-200">
      <div className="w-1/2 flex items-center justify-between">
        <div className="flex items-center justify-center gap-5 ">
          <Bold
            className="hover:cursor-pointer hover:bg-slate-200 rounded-full"
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <Italic
            className="hover:cursor-pointer hover:bg-slate-200 rounded-full"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <Underline
            className="hover:cursor-pointer hover:bg-slate-200 rounded-full"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
        </div>
        <div className="flex items-center justify-center gap-5">
          <AlignLeft
            className="hover:cursor-pointer hover:bg-slate-200 rounded-full"
            onClick={() => editor.commands.setTextAlign("left")}
          />
          <AlignCenter
            className="hover:cursor-pointer hover:bg-slate-200 rounded-full"
            onClick={() => editor.commands.setTextAlign("center")}
          />
          <AlignRight
            className="hover:cursor-pointer hover:bg-slate-200 rounded-full"
            onClick={() => editor.commands.setTextAlign("right")}
          />
        </div>
        <div className="flex items-center justify-center gap-5">
          <List
            className="hover:cursor-pointer hover:bg-slate-200 rounded-full"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <ListOrdered
            className="hover:cursor-pointer hover:bg-slate-200 rounded-full"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          {/* <PaintBucket className="hover:cursor-pointer hover:bg-slate-200 rounded-full" /> */}
          <PaintBucketInput editor={editor} />
        </div>
      </div>

      <div
        className="w-[24px] h-[24px]   hover:cursor-pointer bg-slate-200 hover:bg-slate-500 rounded-full"
        onClick={(event) => onClickLinkBtn(event)}
      >
        <Link className="p-1" />
      </div>
    </div>
  );
};

export default NoteWriteToolbar;
