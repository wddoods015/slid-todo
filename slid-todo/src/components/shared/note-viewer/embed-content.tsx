import { SheetContent, SheetPortal } from "@/components/ui/sheet";
import { ensureHttps } from "@/utils/url";
import { useState } from "react";

interface EmbedContentProps {
  url: string;
  isVisible: boolean;
}

const EmbedContent = ({ url, isVisible }: EmbedContentProps) => {
  const [error, setError] = useState(false);

  if (!isVisible) return null;

  const handleError = () => {
    setError(true);
  };

  return (
    <SheetPortal>
      <div className="absolute lg:top-0 lg:right-[800px] lg:-mr-4 lg:w-[1000px] lg:h-full bg-blue-50 dark:bg-gray-900 z-[51]">
        <div className="relative w-full h-full flex justify-center items-center">
          {error ? (
            <div className="text-white">이 사이트는 임베드할 수 없습니다.</div>
          ) : (
            <iframe
              src={ensureHttps(url)}
              className="
            lg:w-screen
            lg:h-screen
            scale-[0.5]
            lg:aspect-video
            pointer-events-auto
          "
              onError={handleError}
            ></iframe>
          )}
        </div>
      </div>
    </SheetPortal>
  );
};

export default EmbedContent;
