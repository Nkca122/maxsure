import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

import { Brain, Clock, ChartNoAxesCombined, LogIn } from "lucide-react";


export default function Home() {
  return (
    <>
      <section className="w-screen h-screen flex flex-col justify-center items-center gap-3 border-b-2">
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
                <Badge className="m-0.5" variant={"outline"}>
                  <Brain /> AI-powered
                </Badge>{" "}
                trading platform that delivers smart,{" "}
                <Badge className="m-0.5" variant={"outline"}>
                  <Clock /> Real-time
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
                className="w-full"
              >
                <Badge variant={"default"} className="w-full">
                  <div className="flex justify-center items-center">
                    <div>
                      <LogIn size={24} />
                    </div>
                    <Button
                      className="text-sm font-bold text-bg"
                      variant={"link"}
                    >
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
                <Badge variant={"secondary"}>
                  <Button variant={"link"} className="text-sm font-bold">
                    New here? Create an account <ChartNoAxesCombined />
                  </Button>
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-4 py-2 border-b-2">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div
            className="flex-2/3 flex justify-center items-center relative bg-no-repeat bg-contain bg-center"
            style={{
              backgroundImage: "url(/assets/area.png)",
            }}
          >
            <img src="/assets/chart.png" alt="" className="opacity-50" />
          </div>

          <div className="flex-1/3 flex flex-col justify-center items-end px-4">
            <h1 className="text-4xl font-extrabold text-end">
              <span className="text-[#305cde]">About</span>
              <br />
              Us
            </h1>
            <p className="text-justify [text-align-last:right] text-sm font-medium">
              At Algobrief, we believe trading should be smart, simple, and
              accessible. Our AI-powered platform analyzes real-time market data
              to deliver concise, actionable insights—helping you trade
              confidently and stay ahead. Whether you're a beginner or a pro,
              Algobrief is your edge in the market.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-4 py-2">
        <div className="flex">
          <div className="flex-1/2 flex flex-col justify-center items-start gap-4 px-4">
            <h1 className="text-4xl font-extrabold text-start">
              <span className="text-[#305cde]">Explore</span>
              <br />
              curated courses
            </h1>
            <p className="text-justify [text-align-last:left] text-sm font-medium">
              Boost your trading skills with our curated courses. From AI
              fundamentals to advanced trading strategies, our content is
              designed to help you grow—whether you're just starting out or
              looking to sharpen your edge.
            </p>
          </div>
          <div className="flex-1/2">
            <img src="/assets/courses.png" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
