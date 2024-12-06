import { cn } from "@/utils/cn";
import { useTheme } from "next-themes";

interface LinkSVGProps {
  className?: string;
}

const LinkSVG = ({ className }: LinkSVGProps) => {
  const { theme } = useTheme();
  const fillColor = theme === "dark" ? "white" : "#3B82F6";
  const strokeColor = theme === "dark" ? "black" : "white";

  return (
    <svg
      className={cn(className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3738_6844)">
        <circle cx="12" cy="12" r="12" fill={fillColor} />
        <rect
          x="4.75"
          y="7.75"
          width="14.2143"
          height="9.5"
          rx="0.821429"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        <rect x="6.25" y="9" width="3.5" height="7" rx="0.785714" fill={strokeColor} />
        <path
          d="M11.0713 14.4642V10.9285M11.0713 10.9285H14.607M11.0713 10.9285L14.9999 14.857"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3738_6844">
          <rect width="24" height="24" fill={strokeColor} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LinkSVG;
