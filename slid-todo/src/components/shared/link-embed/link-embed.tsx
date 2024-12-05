import Link from "next/link";
import LinkDeleteSVG from "./link-delete-svg";
import LinkSVG from "./link-svg";

import { useFormContext } from "react-hook-form";
import { ensureHttps } from "@/utils/url";

interface LinkEmbedProps {
  value: string | null;
  onChange: (value: string) => void;
}

const LinkEmbed = ({ value, onChange }: LinkEmbedProps) => {
  const { setValue } = useFormContext();
  if (value === "" || !value) return;
  const url = ensureHttps(value);

  const onClickDeleteBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setValue("linkUrl", "");
  };

  return (
    <div className="flex justify-between items-center bg-slate-200 rounded-full p-2">
      <Link href={url} target="_blank" className="flex justify-between items-center ">
        <LinkSVG className="mr-3" />
        <div className="text-base text-slate-800 hover:text-blue-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-blue-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-full before:bottom-0 before:left-0">
          {url}
        </div>
      </Link>

      <LinkDeleteSVG
        onClick={onClickDeleteBtn}
        className="hover:scale-125 transition-transform duration-150 hover:cursor-pointer"
      />
    </div>
  );
};

export default LinkEmbed;
