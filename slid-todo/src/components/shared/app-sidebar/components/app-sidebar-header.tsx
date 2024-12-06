import Link from "next/link";
import { CollapseButton } from "./collapse-button";
import Skeleton from "@/components/shared/skeleton";
import { useUserQuery } from "@/stores/use-user-store";
import { LogoText, LogoTextDark, LogoIcon } from "@/public/svgs";

export const AppSidebarHeader = () => {
  const { isLoading } = useUserQuery();

  if (isLoading) {
    return (
      <div className="flex justify-between items-center px-2 py-2">
        <Link href="/dashboard">
          <Skeleton className="w-[132px] h-[43px] rounded-xl" />
        </Link>
        <CollapseButton />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center px-2 py-2">
      <Link href="/dashboard" aria-label="Go to dashboard">
        <div className="dark:hidden flex items-center gap-2">
          <LogoIcon aria-hidden="true" />
          <LogoText aria-hidden="true" />
          <span className="sr-only">Dashboard home</span>
        </div>
        <div className="hidden dark:flex items-center gap-2">
          <LogoIcon aria-hidden="true" />
          <LogoTextDark aria-hidden="true" />
          <span className="sr-only">Dashboard home</span>
        </div>
      </Link>
      <CollapseButton />
    </div>
  );
};
