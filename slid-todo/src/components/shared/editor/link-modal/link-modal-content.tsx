import { Input } from "@/components/ui/input";

const LinkModalContent = () => {
  return (
    <div className="p-4">
      <div className="text-base text-slate-800">링크</div>
      <div>
        <Input className="bg-slate-50" placeholder="링크를 기입해주세요." />
      </div>
    </div>
  );
};

export default LinkModalContent;
