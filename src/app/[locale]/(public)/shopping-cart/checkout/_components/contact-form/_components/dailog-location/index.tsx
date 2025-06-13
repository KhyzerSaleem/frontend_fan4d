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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GoogleMap, Marker } from "@react-google-maps/api";
import DailogAddLocation from "../dailog-add-location";
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

interface CardLocationProps {
  locations: Location[];
  setAddressId: (id: number) => void;

}

export const DailogLocation = ({ locations, setAddressId }: CardLocationProps) => {

  const t = useTranslations()
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [locationsList, ] = useState<Location[]>(locations);
  const [isOpen, setIsOpen] = useState(false); // التحكم في فتح وإغلاق الديالوج

  const handleSelect = (id: number) => {
  
    
    setSelectedLocation(id);
    setAddressId(id);
    
    setIsOpen(false); // إغلاق الديالوج عند تحديد العنوان
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="flex items-center gap-x-[8px] md:text-[1rem] text-[0.8rem] font-bold text-normal cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          { t("Select-locations") }
          <img src="/assets/icons/location-tick.svg" alt="icon" />
        </div>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-md shadow-md p-6">
        <DialogHeader className="mt-4">
          <DialogTitle className="text-lg font-bold text-gray-800 rtl:text-right">
          { t("Select-locations") }
          </DialogTitle>
        </DialogHeader>

        <div>
          <RadioGroup
            value={selectedLocation?.toString()}
            onValueChange={(value) => handleSelect(Number(value))}
            className="flex flex-wrap items-center justify-end gap-0 "
          >
            {locationsList.map((location) => (
              <div key={location.id} className="md:w-4/12 w-full my-5 md:my-2">
                <div className="px-4">
                  <div
                    className={`p-[12px] rounded-sm border relative cursor-pointer transition-all ${
                      selectedLocation === location.id
                        ? "border-normal shadow-md"
                        : "border-text-borders"
                    }`}
                    onClick={() => handleSelect(location.id)} // تحديد العنوان عند الضغط
                  >
                    <RadioGroupItem
                      value={location?.id.toString()}
                      id={`location-${location?.id}`}
                      className="cursor-pointer"
                    />

                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "210px" }}
                      center={{
                        lat: parseFloat(location?.lat),
                        lng: parseFloat(location.lng),
                      }}
                      zoom={9}
                    >
                      <Marker
                        key={`${location?.id}-${location?.lat}-${location?.lng}`}
                        position={{
                          lat: parseFloat(location?.lat),
                          lng: parseFloat(location?.lng),
                        }}
                      />
                    </GoogleMap>

                    <div className="flex flex-col gap-y-[16px] pt-[16px]">
                      <div className="flex items-center gap-x-[8px]">
                        <img src="/assets/icons/location2.svg" alt="icon" />
                        <span className="text-[1rem] text-text-main font-normal">
                          {location.address}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[1.1rem] text-text-main font-bold">
                          {location.area} - {location.city}
                        </h3>
                      </div>
                      <div>
                        <p className="text-[1rem] text-text-sub font-normal">
                          {location.house_number}, {location.street}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="block md:flex items-center justify-between w-full gap-x-8">
          <Button
            className="md:w-1/2 w-full mb-5 md:mb-0"
            variant="default"
            onClick={() => selectedLocation !== null && setIsOpen(false)}
          >
           { t("Specify-address") }
          </Button>
          <DailogAddLocation />
        </div>
      </DialogContent>
    </Dialog>
  );
};
