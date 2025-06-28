import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SkeletonCard from "@/components/skeleton_card";
import { Settings } from "lucide-react";

type Report = {
  _id: string;
  content: string;
  createdAt: string;
};

const formSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Enter a valid username",
    })
    .max(50, {
      message: "Enter a valid username",
    }),
});

export default function Dashboard() {
  let [currentPage, setCurrentPage] = useState(0);
  let [reports, setReports] = useState<Report[]>([]);
  let [totalPages, setTotalPages] = useState(0);
  let [loading, setLoading] = useState(false);

  let [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const repsonse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/user`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(repsonse.data.username);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          Navigate(err.response?.data?.redirectTo);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      try {
        const repsonse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/reports`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              p: currentPage,
            },
          }
        );
        setReports(repsonse.data.reports);
        setTotalPages(repsonse.data.totalPages);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          Navigate(err.response?.data?.redirectTo);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [currentPage]);
  const Navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/bot/telegram_user`,
        {
          username: values.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        Navigate(err.response?.data?.redirectTo);
      }
    }
  }
  return (
    <>
      <section
        className="h-screen w-screen bg-center bg-cover bg-no-repeat relative"
        style={{
          backgroundImage: "url(/assets/dashboard.svg)",
        }}
      >
        <div className="w-full h-full flex flex-col justify-center items-center gap-2 bg-[#00000080] px-4">
          <div className="w-full md:w-[80vw] flex justify-between">
            <h1 className="text-3xl font-bold text-blue-500">Dashboard</h1>

            <Dialog>
              <DialogTrigger>
                <div className="px-2">
                  <Settings className="" size={24} />
                </div>
              </DialogTrigger>
              <DialogContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter your Telegram username</FormLabel>
                          <FormDescription className="flex flex-col justify-center items-center gap-2">
                            <h1>
                              In order to receive live updates on telegram, drop
                              a message to{" "}
                              <span className="text-blue-500 inline-block">
                                @Thiswillbeatestbot
                              </span>
                            </h1>

                            <img
                              src={import.meta.env.VITE_BOT_URL}
                              alt=""
                              className="h-[250px]"
                            />
                          </FormDescription>
                          <FormControl>
                            <Input
                              placeholder="Your Telegram Username"
                              defaultValue={user}
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full md:w-[80vw]">
            {loading && (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
            {!loading &&
              reports.map((report: Report) => {
                return (
                  <Card
                    key={report._id}
                    className="max-h-[250px] text-sm text-justify w-full bg-slate-900 text-muted-foreground"
                  >
                    <CardHeader className="font-bold">
                      {new Date(Date.parse(report.createdAt)).toUTCString()}
                    </CardHeader>
                    <CardContent className="h-full overflow-scroll">
                      <p>{report.content}</p>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
          <Pagination className="">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 0));
                  }}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i}
                    onClick={() => setCurrentPage(i)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </>
  );
}
