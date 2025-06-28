import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";

export default function Layout() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="w-screen h-screen overflow-x-hidden overflow-y-scroll relative">
          <Header />
          <main className="min-h-full">
            <Outlet />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
