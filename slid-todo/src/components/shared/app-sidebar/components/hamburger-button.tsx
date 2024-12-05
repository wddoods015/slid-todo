// 반응형 모바일 사이즈에서 사용될 사이드 Expand 햄버거 버튼입니다.
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { cn } from "@/utils/cn";

export const HamburgerButton = () => {
  const { open, setOpen } = useSidebar();

  return (
    <Button
      variant="ghost"
      className={cn("p-[12px] w-[40px] h-[40px]")}
      data-cy="expand-button"
      onClick={() => setOpen(!open)}
    >
      <Menu className={cn("w-full h-full")} /> {/* lucide-react의 햄버거 아이콘 */}
    </Button>
  );
};
