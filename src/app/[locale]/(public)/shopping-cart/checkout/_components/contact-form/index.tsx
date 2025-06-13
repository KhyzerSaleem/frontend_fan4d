/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoadScript } from "@react-google-maps/api";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "@/lib/actions/cart/place-order.action";
import TotalBasket from "../total-basket";
import { DailogLocation } from "./_components/dailog-location";
import { Orderdailog } from "../order-dailog";
import { useTranslations } from "next-intl";

interface Location {
  id: number;
  title: string;
  address: string;
  street: string;
  house_number: string;
  lat: string;
  lng: string;
  city: string;
  city_id: number;
  area: string;
  area_id: number;
  is_default: number;
}

interface cartData {
  total: number;
  items: any[];
}

interface CardLocationProps {
  locations: Location[];
  cartData: cartData;
}

const ContactForm = ({ locations, cartData }: CardLocationProps) => {
  const t = useTranslations();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  void isLoaded;

  // translation
  // const t = useTranslations()

  const [addressId, setAddressId] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState("cash");
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const { toast } = useToast();

  const Schema = z.object({
    payment_method: z.string().optional(),
    notes: z.string().optional(),
    address_id: z.number().optional(),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      payment_method: "",
      notes: "",
    },
    resolver: zodResolver(Schema),
  });

  const { mutate } = useMutation({
    mutationFn: (values: PlaceOrderType) => placeOrder(values),
    onSuccess: (response) => {
      if (response?.status === 200) {
        // toast({
        //   title: "تمت العملية بنجاح",
        //   description: response?.message || "تم تقديم الطلب بنجاح!",
        //   variant: "default",
        // });
        setIsOrderDialogOpen(true);
      }
    },
    onError: (error: any) => {
      let errorMessage = t("Unexpected-Error");

      if (error.response?.data?.message) {
        // جلب الرسالة مباشرة من الاستجابة
        errorMessage = error.response.data.message;
      } else if (error.message) {
        try {
          const parsedError = JSON.parse(error.message);
          if (parsedError?.message) {
            errorMessage = parsedError.message;
          }
        } catch (error: any) {
          errorMessage = error.message;
        }
      }

      toast({
        title: t("Sending-Error"),
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {

    if (!addressId) {
      toast({ title: t("select-address"), variant: "destructive" });
      return;
    }
    mutate({
      ...values,
      address_id: addressId.toString(),
      payment_method: selectedMethod,
      notes: values.notes || "", // Ensure notes is always a string
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-y-3  ">
        <div className="w-full md:w-7/12">
          <Form {...form}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                form.handleSubmit(onSubmit)();
              }}
            >
              <div className=" flex flex-col gap-y-[20px]">
                <div>
                  <div className=" flex items-center justify-between ">
                    <h2 className=" md:text-[20px] text-[14px] font-bold text-text-main">
                      {" "}
                      {t("deliveryLocation")}
                    </h2>
                    <DailogLocation
                      locations={locations}
                      setAddressId={setAddressId}
                    />
                  </div>
                </div>

                <div>
                  <div className="">
                    <h2 className="text-[20px] font-bold text-text-main">
                      {" "}
                      {t("additionalInfo")}
                    </h2>
                  </div>
                </div>

                <div>
                  <FormField
                    name="notes"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          {/* Label */}
                          <Label> {t("orderNotes")} </Label>

                          {/* input */}
                          <Textarea
                            {...field}
                            placeholder={t("orderNotesPlaceholder")}
                          />

                          {/* feedback */}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
        <div className="w-full md:w-4/12">
          <TotalBasket
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            onSubmit={form.handleSubmit(onSubmit)}
            cartData={cartData}
          />
        </div>
      </div>

      <Orderdailog
        open={isOrderDialogOpen}
        onOpenChange={setIsOrderDialogOpen}
      />
    </>
  );
};

export default ContactForm;
