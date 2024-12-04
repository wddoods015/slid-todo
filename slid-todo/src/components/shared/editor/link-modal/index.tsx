import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LinkModalHeader from "./link-modal-header";
import { FormData, useFormModal } from "@/stores/use-form-modal-store";
import toast from "react-hot-toast";

interface LinkModalProps {
  onSubmit?: (data: FormData) => void;
}

const LinkModal = ({ onSubmit }: LinkModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onClose } = useFormModal();

  const handleSubmit = () => {
    if (inputRef.current && onSubmit) {
      const inputValue = inputRef.current.value;
      onSubmit({ id: 0, title: "", linkUrl: inputValue });
      onClose();
      toast.success("링크가 추가되었습니다.");
    }
  };

  return (
    <>
      <LinkModalHeader />
      <div className="p-4">
        <div className="text-base text-slate-800">링크</div>
        <div>
          <Input ref={inputRef} className="bg-slate-50" placeholder="링크를 기입해주세요." />
        </div>
      </div>
      <div className="p-4">
        <Button className="w-full" onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </>
  );
};

export default LinkModal;
