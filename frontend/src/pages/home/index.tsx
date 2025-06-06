import { Badge } from "@/components/ui/badge";
import { LockKeyhole, ChartCandlestick, MoveUpRight } from "lucide-react";
export default function Home() {
  return (
    <>
      <section
        className="w-screen h-screen flex flex-col justify-center items-center gap-3 bg-center bg-cover"
        style={{
          backgroundImage: "url(/assets/hero_bg.png)",
        }}
      >
        <h1 className="font-bold text-4xl leading-snug text-transparent bg-clip-text bg-gradient-to-r from-gray-400 dark:from-gray-300 via-black dark:via-white to-gray-400 dark:to-gray-300 text-center">
          Discover endless possibilities in the world <br />
          of Trading
        </h1>
        <p className="text-muted-foreground px-8">
          Step into the world of trading excellence and seize every opportunity
          with our advanced platform, expert guidance, and strategic insights
          for unrivaled financial success.
        </p>
        <div className="flex justify-center items-center gap-4">
          <Badge variant={"outline"}>
            <div className="flex justify-center items-center gap-1">
              <MoveUpRight />
              <p>Fast trading</p>
            </div>
          </Badge>

          <Badge variant={"outline"}>
            <div className="flex justify-center items-center gap-1">
              <ChartCandlestick />
              <p>Continuous Market Updates</p>
            </div>
          </Badge>

          <Badge variant={"outline"}>
            <div className="flex justify-center items-center gap-1">
              <LockKeyhole />
              <p>Secure & reliable</p>
            </div>
          </Badge>
        </div>
      </section>
    </>
  );
}
