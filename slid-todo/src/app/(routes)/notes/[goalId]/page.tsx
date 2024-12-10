"use client";
import { useParams } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { useGoal } from "@/hooks/goals/use-goal";
import NoteGoalTitle from "./components/note-goal-title";
import dynamic from "next/dynamic";
const NoteListContent = dynamic(() => import("./components/note-list"), {
  ssr: false,
});
const NotePage = () => {
  const { goalId } = useParams();
  const { data: goal, isLoading: goalLoading, error: goalError } = useGoal(Number(goalId));

  if (goalLoading || !goal) return <Loading />;
  if (goalError) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <div className="h-screen  px-36 py-10">
        <div className="flex flex-col w-1/2 h-full">
          <div className="text-lg text-slate-900 mb-5 dark:text-white">노트 모아보기</div>
          <NoteGoalTitle goalTitle={goal.title} />
          <NoteListContent goalId={goal.id} />
        </div>
      </div>
    </>
  );
};

export default NotePage;
