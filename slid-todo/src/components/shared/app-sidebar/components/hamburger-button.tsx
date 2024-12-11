import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export const HamburgerButton = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="w-[24px] h-[24px] 
       dark:hover:bg-slate-400 rounded-[8px] transition-transform duration-200 hover:scale-105"
      onClick={() => setOpenMobile(true)}
      aria-label="expand sidebar menu"
    >
      <Menu
        className="w-[24px] h-[24px] text-gray-700 dark:text-white "
        data-cy="expand-button"
        aria-hidden="true"
      />
    </Button>
  );
};
