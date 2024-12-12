import AppSidebar from "@/components/shared/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full rounded-lg bg-[#F1F5F9] dark:bg-black">{children}</div>
    </SidebarProvider>
  );
}
