import { Button } from "@/components/ui/button";

interface NoteCreateHeaderProps {
  onClickPreSaveBtn?: () => void;
  onClickUpdateBtn?: () => void;
}

const NoteCreateHeader = ({ onClickPreSaveBtn, onClickUpdateBtn }: NoteCreateHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg text-slate-900">노트 작성</div>

      <div className="flex justify-between w-[20%]">
        <Button
          className="bg-slate-100 text-blue-500 hover:bg-slate-200"
          onClick={onClickPreSaveBtn}
        >
          임시저장
        </Button>
        {/* TODO: 작성완료 모든 필요 칸이 작성되기전까지 disabled처리 */}
        <Button className="bg-blue-500 text-white hover:bg-blue-300" onClick={onClickUpdateBtn}>
          작성완료
        </Button>
      </div>
    </div>
  );
};

export default NoteCreateHeader;
