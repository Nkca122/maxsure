import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";

import axios from "axios";

const signupFormSchema = z
  .object({
    email: z.string().email({
      message: "Enter a valid email id",
    }),
    password: z.string().min(8, {
      message: "The password must be 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email id",
  }),
  password: z.string().min(8, {
    message: "The password must be 8 characters long",
  }),
});

export default function Registration() {
  const location = useLocation();
  const { method } = location.state || {
    method: "login",
  };

  const Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(method);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupSubmitfn = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.status == 201) Navigate(response.data.redirectTo);
    } catch (err) {
      console.log(err);
    }
  };

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginSubmitfn = async (values: z.infer<typeof loginFormSchema>) => {
    console.log(`${import.meta.env.VITE_BACKEND_URL}/auth/login`);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          email: values.email,
          password: values.password,
        }
      );

      console.log(response);
      if (response.status == 200) {
        const { token, redirectTo } = response.data;
        localStorage.setItem("token", token);
        Navigate(redirectTo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Algo-Brief | Register</title>
      </Helmet>
      <section className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col-reverse w-full justify-center items-center gap-2 md:flex-row md:w-[80vw] bg-slate-900 px-4 py-4 rounded-2xl border-2">
          <div className="w-full">
            <Tabs
              defaultValue={method}
              onValueChange={(e) => {
                setActiveTab(e);
              }}
              value={activeTab}
            >
              <TabsContent value="login" className="px-2 py-2">
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(loginSubmitfn)}
                    className="space-y-4"
                    autoComplete="off"
                    autoFocus={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                  >
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder=""
                                {...field}
                                type={isPasswordVisible ? "text" : "password"}
                              />
                              <div className="absolute top-0 right-0 z-10">
                                <Button
                                  className=""
                                  variant={"outline"}
                                  type="button"
                                  onMouseDown={() => {
                                    setIsPasswordVisible(true);
                                  }}
                                  onMouseUp={() => {
                                    setIsPasswordVisible(false);
                                  }}
                                >
                                  {isPasswordVisible ? <EyeClosed /> : <Eye />}
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="w-full flex justify-start items-center">
                      <Button
                        type="submit"
                        className="font-semibold text-xs text-foreground hover:text-background bg-slate-950 px-8"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </Form>
                <Separator orientation="horizontal" className="my-2" />
                <Button
                  variant={"link"}
                  className="text-blue-500"
                  onClick={() => {
                    setActiveTab("signup");
                  }}
                >
                  Create an account ?
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="px-2 py-2">
                <Form {...signupForm}>
                  <form
                    onSubmit={signupForm.handleSubmit(signupSubmitfn)}
                    className="space-y-4"
                    autoComplete="off"
                    autoFocus={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                  >
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder=""
                                {...field}
                                type={isPasswordVisible ? "text" : "password"}
                              />
                              <div className="absolute top-0 right-0 z-10">
                                <Button
                                  className=""
                                  variant={"outline"}
                                  type="button"
                                  onMouseDown={() => {
                                    setIsPasswordVisible(true);
                                  }}
                                  onMouseUp={() => {
                                    setIsPasswordVisible(false);
                                  }}
                                >
                                  {isPasswordVisible ? <EyeClosed /> : <Eye />}
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Re-enter Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder=""
                              {...field}
                              type={isPasswordVisible ? "text" : "password"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="w-full flex justify-start items-center">
                      <Button
                        type="submit"
                        className="font-semibold text-xs text-foreground hover:text-background bg-slate-950 px-8"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </Form>
                <Separator orientation="horizontal" className="my-2" />
                <Button
                  variant={"link"}
                  className="text-blue-500"
                  onClick={() => {
                    setActiveTab("login");
                  }}
                >
                  Already have an account ?
                </Button>
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-full">
            <Tabs defaultValue={method} value={activeTab}>
              <TabsContent value="login">
                <div className="flex flex-col justify-center items-start gap-4">
                  <h1 className="text-4xl font-bold inline-block">
                    Welcome <span className="text-blue-500">Back!</span>
                  </h1>
                  <p className="text-muted-foreground text-sm leading-none text-start">
                    to Algobrief! Log in to access your personalized insights
                    and stay ahead in the market with AI-driven trading
                    intelligence.
                  </p>
                  <div className="w-full flex justify-center items-center">
                    <img src="/assets/login.png" alt="" className="h-[155px]" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="flex flex-col justify-center items-start gap-4">
                  <h1 className="text-4xl font-bold inline-block">Welcome</h1>
                  <p className="text-muted-foreground text-sm leading-none text-start">
                    to Algobrief! We’re excited to have you on board—get ready
                    to trade smarter with the power of AI at your fingertips.
                  </p>
                  <div className="w-full flex justify-center items-center">
                    <img src="/assets/signup.png" alt="" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
