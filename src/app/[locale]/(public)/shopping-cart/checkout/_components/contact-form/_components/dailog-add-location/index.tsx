"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { storeAction } from "@/lib/actions/settings/addresses/store.action";
import CitySelectField from "./_components/city-select-field copy";
import AreaSelectField from "./_components/area-select-field";
import { useTranslations } from "next-intl";

const DailogAddLocation: React.FC = () => {
  const t = useTranslations();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  void isLoaded;

  // translation
  // const t = useTranslations();
  const { toast } = useToast();

  // Mutation
  const { mutateAsync } = useMutation({
    mutationFn: (values: storeFields) => storeAction(values),
  });

  const Schema = z.object({
    title: z.string().min(1, t("title_required")),
    street: z.string().min(1, t("street_required")),
    city_id: z.string().min(1, t("city_id_required")),
    area_id: z.string().min(1, t("area_id_required")),
    house_number: z.string().min(1, t("house_number_required")),
    lat: z.string().optional(),
    lng: z.string().optional(),
    address: z.string().optional(), // 🟢 إضافة العنوان
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      title: "",
      street: "",
      house_number: "",
      city_id: "",
      area_id: "",
      lat: "",
      lng: "",
      address: "", // 🟢 إضافة العنوان
    },
    resolver: zodResolver(Schema),
  });

  // State for selected location
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Handle map click
  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      setSelectedLocation({ lat, lng });
      form.setValue("lat", lat.toString());
      form.setValue("lng", lng.toString());

      // استخدام Nominatim API للحصول على العنوان
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        if (data && data.display_name) {
          form.setValue("address", data.display_name);
        } else {
          console.error("لم يتم العثور على عنوان.");
        }
      } catch (error) {
        console.error("خطأ أثناء جلب العنوان:", error);
      }
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (values) => {


    const response = await mutateAsync(values);

    if (response.status === 200) {
      toast({
        title: t("success_title"),
        description: t("success_description"),
        variant: "default",
      });
    } else {
      toast({
        title: t("error_title"),
        description: response?.message || t("error_description"),
        variant: "destructive",
      });
    }
  };

  // if (!isLoaded) return <p>جارٍ تحميل الخريطة...</p>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="transparent" className="md:w-1/2 w-full ">
          {t("add_address_button")}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-md shadow-md p-6">
        <DialogHeader className="mt-4">
          <DialogTitle className="text-lg font-bold text-gray-800 rtl:text-right">
            {t("choose_location_title")}
          </DialogTitle>
        </DialogHeader>

        {/* Form Inputs */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>{t("name_label")}</Label>
                    <Input {...field} placeholder={t("name_placeholder")} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" block md:flex items-center  gap-x-[12px] ">
                <div className=" w-full md:w-1/2  my-[10px] md:my-0 ">
                  <CitySelectField control={form.control} />
                </div>

                <div className=" w-full md:w-1/2">
                  <AreaSelectField control={form.control} />
                </div>
              </div>

              <div className=" block md:flex items-center  gap-x-[12px] ">
                <div className=" w-full md:w-1/2  my-[10px] md:my-0 ">
                  <FormField
                    name="street"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>{t("street_label")}</Label>
                        <Input {...field} placeholder={t("street_label")} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" w-full md:w-1/2">
                  <FormField
                    name="house_number"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label> {t("house_number_label")} </Label>
                        <Input
                          {...field}
                          placeholder={t("house_number_label")}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Google Map for Selecting Location */}
              <div className="w-full h-[300px] my-4">
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={selectedLocation || { lat: 30.0444, lng: 31.2357 }} // Default to Cairo
                  zoom={10}
                  onClick={handleMapClick}
                >
                  {selectedLocation && <Marker position={selectedLocation} />}
                </GoogleMap>
              </div>
              <DialogTrigger>
                <Button type="submit" className="w-full mt-4">
                  {t("save_location_button")}
                </Button>
              </DialogTrigger>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DailogAddLocation;
