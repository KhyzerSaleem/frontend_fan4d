/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchInput from "@/components/custom/SearchInput";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

const MaterialDialog = ({ attributes }: { attributes: any }) => {
  const t = useTranslations();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptionData, setSelectedOptionData] = useState<any | null>(
    null
  );
  const materialAttribute = attributes.find(
    (attr: any) => attr.view_type === "text with image"
  );

  if (!materialAttribute) return null;


  return (
    <div className="flex items-center gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer w-full ">
            {/* Input لعرض العنوان المختار */}
            <Input
              type="text"
              value={selectedOptionData ? selectedOptionData.title : ""}
              readOnly
              placeholder={selectedOptionData ? selectedOptionData.title : ""}
              className="border rounded-md px-4 py-2 w-full h-[48px] cursor-pointer text-gray-700"
              onClick={() => setOpen(true)}
            />

            {/* زر لفتح الـ Dialog وعرض الصورة المختارة */}
            <Button
              size={"icon"}
              onClick={() => setOpen(true)}
              className="w-[48px] h-[48px] rounded-sm bg-text-sub flex items-center justify-center"
            >
              {selectedOptionData ? (
                <Image
                  src={selectedOptionData.image}
                  alt={selectedOptionData.title}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-sm"
                />
              ) : null}
            </Button>
          </div>
        </DialogTrigger>

        <DialogContent className="w-full max-w-2xl bg-white rounded-md shadow-md p-6">
          <DialogHeader className="mt-[15px]">
            <DialogTitle className="text-lg font-bold text-gray-800 rtl:text-right">
              {t("Select-material")}
            </DialogTitle>
          </DialogHeader>

          <div className="md:w-1/2">
            <SearchInput />
          </div>

          <div className="my-[32px] flex overflow-x-auto whitespace-nowrap">
            {materialAttribute.options.map((option: any) => (
              <div
                key={option.id}
                className={`md:w-4/12 w-6/12 flex-shrink-0 cursor-pointer`}
                onClick={() => {
                  setSelectedOption(option.id);
                  setSelectedOptionData(option);
                }}
              >
                <div
                  className={`pl-4 relative flex flex-col gap-y-[16px] p-2 border-2 
                                        ${
                                          selectedOption === option.id
                                            ? "border-normal"
                                            : "border-transparent"
                                        }`}
                >
                  <Image
                    src={option.image}
                    alt={option.title}
                    width={314}
                    height={314}
                    className="w-full object-cover"
                  />
                  <h3 className="md:text-[20px] text-[13px] font-bold text-text-main text-center">
                    {option.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="block md:flex items-center justify-between w-full gap-x-[32px]">
            <Button
              className="md:w-1/2 w-full mb-5 md:mb-0"
              variant={"default"}
              onClick={() => setOpen(false)}
            >
              { t("Choose") }
            </Button>

            <Button
              onClick={() => setOpen(false)}
              className="md:w-1/2 w-full"
              variant={"transparent"}
            >
              { t("Close") }
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaterialDialog;
