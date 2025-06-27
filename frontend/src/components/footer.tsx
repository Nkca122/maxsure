import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  feedback: z.string().min(2, {
    message: "Please provide more details so we can better understand and address your feedback."
  }).max(250, {
    message: "Please shorten your feedback to keep it clear and focused. "
  }),
});

let contacts = [
  {
    display: "+91 9625362621",
    link: "tel:+919625362621",
  },
  {
    display: "nkca122@gmail.com",
    link: "mail:nkca122@gmail.com"
  }
];

let contributors = [
  {
    display: "Nkca122",
    link: "https://github.com/Nkca122",
  },
];
export default function Footer() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <div className="w-full border-t-2 pb-4 flex flex-col justify-center items-center gap-4">
        <div className="bg-gradient-to-r from-slate-900 from-30% via-transparent via-60% to-slate-900 to-100% w-full flex justify-center items-center gap-4">
          <img src="/assets/maxsure.png" alt="" className="h-[62px]" />
          <img src="/assets/logo.png" alt="" className="h-[62px]" />
        </div>
           <div className="text-muted-foreground">
          <p>&copy; Maxsure Infocom LLP</p>
        </div>
        <div className="w-full h-full flex flex-col md:flex-row justify-center items-start gap-2">
          <div className="flex flex-col justify-start items-center px-2 mx-2 w-full h-full rounded-xl md:flex-1/4 bg text-muted-foreground">
            <h1 className="text-sm font-bold">Contact-Us</h1>
            <ul>
              {contacts.map((contact) => {
                return (
                  <li key={contact.display}>
                    <a
                      href={contact.link}
                      className="text-sm"
                    >
                      {contact.display}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col justify-start items-center px-2 mx-2 w-full rounded-lg md:flex-1/4 text-muted-foreground">
            <h1 className="text-sm font-bold">Contributors</h1>
            <ul>
              {contributors.map((contributor) => {
                return (
                  <li key={contributor.display}>
                    <a
                      href={contributor.link}
                      className="text-sm"
                    >
                      {contributor.display}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col justify-start items-center px-2 w-full md:flex-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full px-2 flex flex-col justify-center items-start gap-2"
              >
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        <h1 className="text-foreground text-sm font-bold">
                          Leave us your feedback
                        </h1>
                      </FormLabel>
                      <FormDescription className="w-full text-start">
                        Have suggestions or ideas? Help us improve Algobrief by
                        sharing your thoughts. Your feedback makes the platform
                        better for everyone.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="w-full resize-none"
                          rows={10}
                          cols={10}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant={"secondary"}>
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
     
      </div>
    </>
  );
}
