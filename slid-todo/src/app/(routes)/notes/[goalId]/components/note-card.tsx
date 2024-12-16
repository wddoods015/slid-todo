import { Note } from "@/types/note";
import NoteList from "@/public/svgs/note-list";
import { Separator } from "@/components/ui/separator";
import NoteMeatballBtn from "./note-meatball-btn";
import { useNoteActions } from "@/hooks/note/use-note-actions";
import { TodoBadge } from "@/components/shared/badges/todo-badge";

interface NoteCardProps {
  note: Note;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const NoteCard = ({ note, onClick }: NoteCardProps) => {
  const { deleteNote } = useNoteActions(note);

  return (
    <div
      role="article"
      onClick={onClick}
      className="grid gap-2.5 grid-cols-1 bg-white p-[24px] border-[1px] border-slate-100 rounded-xl cursor-pointer transform transition-transform duration-200 hover:scale-[1.01] hover:bg-slate-50 dark:bg-gray-900 dark:border-gray-950"
    >
      <div className="flex justify-between">
        <NoteList />
        <NoteMeatballBtn
          noteId={note.id}
          onDelete={{
            title: "노트를 삭제하시겠어요?",
            description: "삭제한 노트는 복구할 수 없습니다.",
            action: async () => {
              await deleteNote();
            },
          }}
        />
      </div>
      <div className="text-slate-800 text-lg dark:text-white">{note.title}</div>
      <Separator className="border-[1px]" />
      <div className="flex text-xs text-slate-700 items-center">
        <TodoBadge />
        <div className="dark:text-slate-300">{note.todo.title}</div>
      </div>
    </div>
  );
};

export default NoteCard;
