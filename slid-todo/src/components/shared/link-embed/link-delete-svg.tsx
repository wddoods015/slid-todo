import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { useTheme } from "next-themes";

interface LinkDeleteSVGProps {
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const LinkDeleteSVG = ({ onClick, className }: LinkDeleteSVGProps) => {
  const { theme } = useTheme();
  const fillColor = theme === "dark" ? "white" : "black";
  const strokeColor = theme === "dark" ? "black" : "white";
  return (
    <Button
      className="p-0 w-[24px] h-[24px] bg-transparent hover:bg-transparent"
      onClick={(event) => onClick(event)}
    >
      <svg
        className={cn(className)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" fill={fillColor} />
        <path d="M8 8L16 16" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 8L8 16" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </Button>
  );
};

export default LinkDeleteSVG;
