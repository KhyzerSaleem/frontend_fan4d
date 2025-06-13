"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  // translation
  const t = useTranslations("contact-us");

  const form = useForm();

  // const onSubmit: SubmitHandler<{}> = async (values) => {
  

  // }

  return (
    <>
      <Form {...form}>
        <form
        // onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className=" flex flex-col gap-y-[20px]">
            <div className="flex items-center  gap-x-[12px]  ">
              <div className="w-1/2">
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label>{t("first_name")}</Label>
                        <Input
                          {...field}
                          placeholder={t("first_name_placeholder")}
                        />

                        {/* feedback */}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label>{t("email")}</Label>
                        <Input
                          {...field}
                          placeholder={t("email_placeholder")}
                        />

                        {/* feedback */}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div>
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Label>{t("message_subject")}</Label>
                      <Input
                        {...field}
                        placeholder={t("message_subject_placeholder")}
                      />

                      {/* feedback */}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div>
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      {/* Label */}
                      <Label> {t("message_content")}</Label>

                      {/* input */}
                      <Textarea
                        {...field}
                        placeholder={t("message_content_placeholder")}
                      />

                      {/* feedback */}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <Button variant={"default"} className="md:w-1/2">
              {" "}
              {t("send")}{" "}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ContactForm;
