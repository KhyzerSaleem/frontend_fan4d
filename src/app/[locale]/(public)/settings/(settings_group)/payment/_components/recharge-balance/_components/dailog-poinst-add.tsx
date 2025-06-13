"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

interface PayloadItem {
  key: string;
  value: string;
}

interface DailogPointsAddProps {
  points: number;
}

export const DailogPointsAdd = ({ points }: DailogPointsAddProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API;

  const t = useTranslations();
  const { toast } = useToast();

  const [updatedUserPoints, setUpdatedUserPoints] = useState<number>(points); // حالة لتخزين النقاط المحدثة
  const [moneyValue, setMoneyValue] = useState<number>(0); // حالة لتخزين قيمة المال

  // Fetch settings data using useQuery
  const { data: payload } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await fetch(BASE_URL + "/settings");
      if (!response.ok) {
        throw new Error("Failed to fetch settings");
      }
      return response.json();
    },
  });

  const reward_points = Number(
    payload?.data?.find((item: PayloadItem) => item.key === "reward_points")
      ?.value || 0
  );
  const reward_money = Number(
    payload?.data?.find((item: PayloadItem) => item.key === "reward_money")
      ?.value || 0
  );

  const handleFetchPoints = async () => {
    const response = await fetch(BASE_URL + "/points-change");
    const data = await response.json();

    // في حالة فشل عملية النقاط
    if (data?.status === 406) {
      toast({
        title: t("errors.title"),
        description: data?.message || t("errors.noPoints"),
        variant: "destructive",
      });
    }

    if (data?.status === 200) {
      // إذا تمت العملية بنجاح، نقوم بتحديث النقاط وقيمة المال
      const newPoints = updatedUserPoints - reward_points; // نقوم بطرح النقاط التي تم استردادها
      setUpdatedUserPoints(newPoints);

      const newMoneyValue = (newPoints / reward_points) * reward_money;
      setMoneyValue(newMoneyValue); // تحديث المبلغ المحول

      toast({
        title: t("success.title"),
        description: data?.message || t("success.redeemed"),
        variant: "default",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"} className="!w-full">
          {t("points.redeemButton")}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-xl bg-white rounded-md shadow-md p-6">
        <div className="my-[10px]">
          <div className="flex justify-center items-center flex-col gap-y-[12px] my-[20px]">
            <h2 className="md:text-[1.5rem] text-[1rem] font-bold text-normal">
              {updatedUserPoints} {t("points.points")} = {moneyValue.toFixed(2)}{" "}
              {t("Saudi-Riyal")}
            </h2>
            <p className="text-[1rem] text-[#5A5D61]">{t("points.autoAdd")}</p>
          </div>

          <div className="block w-full">
            <Button
              variant={"default"}
              className="!w-full mb-5"
              onClick={handleFetchPoints}
            >
              {t("points.redeemButton")}
            </Button>

            <Link href={"/"} className="w-full">
              <Button className="w-full" variant="transparent">
                {t("points.shopMore")}
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
