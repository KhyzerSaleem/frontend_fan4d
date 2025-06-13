"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getpriceAction } from "@/lib/actions/get-price.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const ContactForm = () => {
  // translation
  const t = useTranslations();

  const { toast } = useToast();
  const ref = useRef<HTMLFormElement>(null);

  // Mutation
  const { isPending, mutate } = useMutation({
    mutationFn: (values: FormData) => getpriceAction(values),
  });

  const Schema = z.object({
    subject: z
      .string({ required_error: t("SubjectRequired") })
      .min(1, t("SubjectRequired")),
    message: z
      .string({ required_error: t("MessageRequired") })
      .min(1, t("MessageRequired")),
    files: z.any(),
  });

  type getpriceInputs = z.infer<typeof Schema>;

  const form = useForm<getpriceInputs>({
    defaultValues: {
      subject: "",
      message: "",
    },
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<getpriceInputs> = async (values) => {
    if (!ref.current) return; // تأكد من أن الفورم موجود

 

    const formData = new FormData(ref.current);

    if (values.files instanceof FileList) {
      Array.from(values.files).forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`files[${index}]`, file);
        }
      });
    }

    mutate(formData, {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: t("Sending-Error"),
            description: error.message || t("Unexpected-Error"),
            variant: "destructive",
          });
        } else {
          toast({
            title: t("Sent-Success"),
            description: t("Form-Sent-Successfully"),
            variant: "default",
          });

          form.reset(); // إعادة تعيين النموذج بعد النجاح
        }
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} ref={ref}>
          <div className=" flex flex-col gap-y-[20px]">
            <div>
              <FormField
                name="subject"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      {/* Label */}
                      <Label> {t("Message-Title")} </Label>

                      {/* input */}
                      <Input {...field} placeholder={t("Message-Title")} />

                      {/* feedback */}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div>
              <FormField
                name="message"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      {/* Label */}
                      <Label> {t("Message-content")} </Label>

                      {/* input */}
                      <Textarea {...field} placeholder={t("Message-content")} />

                      {/* feedback */}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div>
              <div className="flex items-center  gap-x-[12px]">
                <div className="w-1/2">
                  <FormField
                    name="files"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          {/* Label */}
                          <Label> {t("Attach-file")} </Label>

                          {/* Input */}
                          <Input
                            type="file"
                            placeholder={t("Attach-file")}
                            multiple
                            name={field.name}
                            onChange={(e) => {
                              const files = e.target.files;
                           
                              if (files) {
                                field.onChange(files); // Update form field
                              }
                            }}
                          />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <div>
                    <div className="flex flex-col gap-y-[1.3rem] ">
                      <div className="flex items-center gap-x-[12px] ">
                        <div className="cricle hidden md:block w-[1rem] h-[1rem] md:w-[1.4rem] md:h-[1.4rem] bg-customPalette-300 rounded-full "></div>
                        <p className="text-[0.7rem] md:text-[1rem]  font-normal text-text-sub ">
                          {" "}
                         { t("Supported-Formats")} :
                          <span className=" text-[0.7rem] md:text-[1rem]   font-normal text-text-main">
                            {" "}
                            { t("Formats-List") }
                          </span>{" "}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-[12px] ">
                        <div className="cricle hidden md:block w-[1rem] h-[1rem] md:w-[1.4rem] md:h-[1.4rem] bg-customPalette-300 rounded-full "></div>
                        <p className=" text-[0.7rem] md:text-[1rem]   font-normal text-text-sub ">
                          {" "}
                          { t("Average-Response-Time") } :
                          <span className="text-[0.7rem] md:text-[1rem] font-normal text-text-main">
                            {" "}
                            { t("Response-Time") }
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button variant={"default"} className="md:w-1/3">
              {isPending ? <Loader2 className="animate-spin mr-2" /> : ""}
              {t("Send")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ContactForm;
