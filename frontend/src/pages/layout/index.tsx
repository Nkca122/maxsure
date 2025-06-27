import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout() {
  return (
    <>
      <Helmet>
        <meta
          property="og:title"
          content="Algobrief - Smart AI Trading Platform"
        />
        <meta
          property="og:description"
          content="Get real-time market insights and trade smarter with Algobrief."
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/assets/preview.png"
        />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
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
