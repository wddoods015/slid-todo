import { Button } from "@/components/ui/button";

interface NoteEditHeaderProps {
  onClickPreSaveBtn?: () => void;
  onClickUpdateBtn?: () => void;
}

const NoteEditHeader = ({ onClickPreSaveBtn, onClickUpdateBtn }: NoteEditHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg text-slate-900 dark:text-white">노트 작성</div>

      <div className="flex justify-between w-[20%]">
        <Button
          className="bg-slate-100 text-blue-500 hover:bg-slate-200 dark:bg-slate-500 dark:text-white dark:hover:bg-slate-600"
          onClick={onClickPreSaveBtn}
        >
          임시저장
        </Button>
        <Button
          className="bg-blue-500 text-white hover:bg-blue-300 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600"
          onClick={onClickUpdateBtn}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default NoteEditHeader;
