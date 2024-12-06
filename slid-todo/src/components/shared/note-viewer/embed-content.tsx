import { createPortal } from "react-dom";

interface EmbedContentProps {
  url: string;
  isVisible: boolean;
}

const EmbedContent = ({ url, isVisible }: EmbedContentProps) => {
  if (!isVisible) return null;

  return createPortal(
    <div className="w-full h-full z-[100]">
      <iframe src={url} className="w-full h-full" />
    </div>,
    document.body,
  );
};

export default EmbedContent;
