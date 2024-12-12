import AppSidebar from "@/components/shared/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-full ">{children}</div>
    </SidebarProvider>
  );
}
