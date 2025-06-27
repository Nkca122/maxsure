import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

import { Brain, Clock, ChartNoAxesCombined, LogIn } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="w-screen h-screen flex flex-col justify-center items-center gap-3">
        <div className="w-full h-full flex flex-col-reverse md:flex-row justify-center items-center bg-[#00000090]">
          <div className="w-full h-full overflow-hidden flex justify-center items-center">
            <div className="flex flex-col justify-center items-center p-4 gap-4 px-4">
              <div className="flex justify-start items-center gap-2 w-full">
                <div className="text-4xl font-bold flex flex-col justify-start items-start">
                  <p className="font-extrabold text-green-600 inline-block">
                    {"Sma₹t______"}
                  </p>{" "}
                  Trading Made{" "}
                  <p className="font-extrabold text-yellow-600 inline-block">
                    {"_____$imple"}
                  </p>
                </div>
                <img src="/assets/airplane_icon.png" alt="" />
              </div>

              <span className="leading-none text-sm">
                Algobrief is an{" "}
                <Badge className="m-0.5" variant={"destructive"}>
                  <Brain /> AI-powered
                </Badge>{" "}
                trading platform that delivers smart,{" "}
                <Badge className="m-0.5" variant={"destructive"}>
                  <Clock /> real-time
                </Badge>{" "}
                market insights and brief, actionable reports to help users make
                faster, data-driven trading decisions.
              </span>
            </div>
          </div>
          <div
            className="w-full h-full flex justify-center items-center bg-cover bg-no-repeat relative"
            style={{
              backgroundImage: "url(/assets/hero_steps.svg)",
            }}
          >
            <div className="absolute h-full w-full z-0 flex justify-center items-center">
              <img
                src="/assets/hero_section.png"
                alt="Hero Image"
                className="absolute z-0 opacity-80"
              />
              <img
                src="/assets/hero_section.png"
                alt="Hero Image"
                className="absolute -z-1 top-[30%] opacity-20"
              />
            </div>
            <div className="absolute z-10 flex flex-col justify-center items-center gap-4 px-4">
              <Link
                to="/register"
                state={{
                  method: "login",
                }}
              >
                <Badge variant={"destructive"}>
                  <div className="flex justify-center items-center">
                    <div>
                      <LogIn size={24} />
                    </div>
                    <Button className="font-bold" variant={"link"}>
                      Welcome back! Log in
                    </Button>
                  </div>
                </Badge>
              </Link>

              <div className="flex justify-center items-center w-full relative">
                <p className="absolute z-0 pb-1.5 font-bold">or</p>
                <Separator className="bg-white absolute z-0" />
              </div>

              <Link
                to="/register"
                state={{
                  method: "signup",
                }}
              >
                <Badge>
                  <Button variant={"link"} className="text-blue-600 text-xs font-bold">
                    New here? Create an account <ChartNoAxesCombined />
                  </Button>
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
