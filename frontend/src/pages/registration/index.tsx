"use client";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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

export default function Registration() {
  const location = useLocation();
  const { method } = location.state || {
    method: "login",
  };

  const [activeTab, setActiveTab] = useState(method);

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupSubmitfn = (values: z.infer<typeof signupFormSchema>) => {
    console.log(values);
  };

  return (
    <>
      <section className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col  w-full justify-center items-center gap-2 md:flex-row md:w-[80vw]">
          <div className="w-full">
            <Tabs
              defaultValue={method}
              onValueChange={(e) => {
                console.log(e);
                setActiveTab(e);
              }}
            >
              <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form
                    onSubmit={signupForm.handleSubmit(signupSubmitfn)}
                    className="space-y-8"
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
                            <Input placeholder="" {...field} />
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
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full">
            <Tabs defaultValue={method} value={activeTab}>
              <TabsContent value="login">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="signup">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
