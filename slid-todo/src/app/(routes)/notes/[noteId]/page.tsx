"use client";
import { useParams } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { useNoteById } from "@/hooks/note/use-note";
import NoteGoalTitle from "./components/note-goal-title";
import NoteList from "./components/note-list";

const NotePage = () => {
  const { noteId } = useParams();
  const { data: note, isLoading: noteLoading, error: noteError } = useNoteById(Number(noteId));

  if (noteLoading) return <Loading />;
  if (noteError) return <div>에러가 발생했습니다.</div>;
  if (!note) return <div>노트를 찾을 수 없습니다.</div>;

  return (
    <>
      <div className="w-screen h-screen bg-[#F1F5F9] px-36 py-10">
        <div className="text-lg text-slate-900 mb-5">노트 모아보기</div>
        <NoteGoalTitle goalTitle={note.goal.title} />
        <NoteList goalId={note.goal.id} />
      </div>
    </>
  );
};

export default NotePage;
