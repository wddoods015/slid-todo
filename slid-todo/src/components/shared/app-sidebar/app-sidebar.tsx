"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import { AppSidebarTrigger } from "./components/app-sidebar-trigger";
import { AppSidebarFooter } from "./components/app-sidebar-footer";
import { AppSidebarHeader } from "./components/app-sidebar-header";
import AppSidebarUserInfo from "./components/app-sidebar-user-info";
import { Separator } from "@/components/ui/separator";
import AppSidebarDashBoard from "./components/app-sidebar-dashboard";
import AppSidebarGoal from "./components/app-sidebar-goal";

const AppSidebar = () => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      {/* open이 true일 때 백그라운드 덮기 */}
      {/* 사이드바는 z-index로 백그라운드 위에 위치하도록 설정 */}
      <Sidebar className="bg-white">
        <SidebarHeader>
          <AppSidebarHeader />
        </SidebarHeader>
        <SidebarContent className="w-full h-1/2">
          <AppSidebarUserInfo />
          <Separator className="border-[1px]" />
          <AppSidebarDashBoard />
          <Separator className="border-[1px]" />
          <AppSidebarGoal />
        </SidebarContent>
        <SidebarFooter>
          <AppSidebarFooter />
        </SidebarFooter>
      </Sidebar>
      {/* {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
        />
      )} */}

      {!open && <AppSidebarTrigger />}
    </>
  );
};

export default AppSidebar;
