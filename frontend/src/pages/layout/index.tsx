import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
          <div className="fixed z-10 bottom-4 right-4 flex gap-2">
            <Badge variant={"outline"}>
              <Link to="/register" state={{
                method: "login"
              }}>
                <Button variant={"link"} className="text-xs text-blue-700 dark:text-blue-400">Login</Button>
              </Link>
            </Badge>
            <Badge variant={"outline"}>
              <Link to="/register" state={{
                method: "signup"
              }}>
                <Button variant={"link"} className="text-xs text-blue-700 dark:text-blue-400">Signup</Button>
              </Link>
            </Badge>
          </div>
          <div className="fixed z-10 bottom-4 left-4">
            <ModeToggle />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
