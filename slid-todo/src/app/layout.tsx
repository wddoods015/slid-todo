import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/react-query";
import { ToastProvider } from "@/providers/toast-provider";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import { FormModal } from "@/components/shared/form-modal/index";
import { Providers as ThemeProvider } from "@/providers/theme-provider";
export const metadata: Metadata = {
  title: "Slid todo",
  description: "Slid todo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-pretendard-medium font-medium antialiased">
        <ThemeProvider>
          <Providers>
            <ToastProvider />
            {children}
            <ConfirmModal />
            <FormModal />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
