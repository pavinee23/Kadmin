import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SiteProvider } from "@/lib/SiteContext";
import { LocaleProvider } from "@/lib/LocaleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K Energy Save - Dashboard",
  description: "K Energy Save Co., Ltd (Group of Zera) - Energy Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <LocaleProvider>
          <SiteProvider>
            <div className="flex h-screen bg-gray-100 overflow-hidden">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 p-8 overflow-auto">
                  {children}
                </main>
              </div>
            </div>
          </SiteProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
