import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

const LinkModalHeader = () => {
  return (
    <DialogHeader className="p-4 space-y-0">
      <DialogTitle>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium">링크 업로드</h2>
        </div>
      </DialogTitle>
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogHeader>
  );
};

export default LinkModalHeader;
