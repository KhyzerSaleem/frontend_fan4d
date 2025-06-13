"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const Orderdailog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const t = useTranslations();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-xl bg-white rounded-md shadow-md p-6">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-[32px] font-bold text-text-main">
            {t("order_success_title")}
          </h3>
          <div className="py-[20px]">
            <p className="text-[20px] font-normal text-text-sub text-center">
              {t("order_success_description")}
            </p>
          </div>
        </div>

        <div className="block md:flex items-center justify-between w-full gap-x-[32px]">
          <Link href={"/"} className="w-full">
            <Button
              className="w-full md:mb-0 mb-5"
              variant="default"
              onClick={() => onOpenChange(false)}
            >
              {t("view_my_orders")}
            </Button>
          </Link>
          <Link href={"/"} className="w-full">
            <Button
              className="w-full"
              variant="transparent"
              onClick={() => onOpenChange(false)}
            >
              {t("go_to_homepage")}
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
