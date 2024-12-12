import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronsRightIcon } from "lucide-react";

export const ExpandButton = () => {
  const { setOpen, setOpenMobile } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="p-[12px] w-[24px] h-[24px] 
      border-2 border-gray-500 hover:bg-gray-100 rounded-[8px] transition-transform duration-200 hover:scale-105"
      onClick={() => {
        setOpen(true);
        setOpenMobile(true);
      }}
      aria-label="expand sidebar menu"
    >
      <ChevronsRightIcon
        className="w-[24px] h-[24px] text-gray-700"
        data-cy="expand-button"
        aria-hidden="true"
      />
    </Button>
  );
};
