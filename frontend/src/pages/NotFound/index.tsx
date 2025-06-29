import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col-reverse md:flex-row justify-center items-center p-8">
        <div className="flex-1/2 flex flex-col justify-center items-start gap-4">
          <h1 className="text-start text-5xl font-extrabold">
            <span className="text-blue-500">Error 404</span>,<br />
            Page Not Found
          </h1>
          <Link to={"/"} className="w-full md:w-fit">
            <Button
              variant={"secondary"}
              className="text-sm font-bold px-4 py-6 rounded-4xl border-2 hover:underline w-full md:w-fit"
            >
              Go to Home
            </Button>
          </Link>
        </div>
        <div className="flex-1/2 flex justify-center items-center">
          <img src="/assets/404.png" alt="" />
        </div>
      </div>
    </>
  );
}
