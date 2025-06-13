/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";

const TotalBasket = ({
  selectedMethod,
  setSelectedMethod,
  onSubmit,
  cartData,
}: any) => {

  const t = useTranslations();
  const queryClient = useQueryClient();
  const voucherData: any = queryClient.getQueryData(["voucherData"]);
  

    // **استخدام البيانات داخل الحسابات**
    const discount = voucherData?.discount || 0; // قيمة الخصم
    const totalAfterDiscount = voucherData?.total || cartData?.total; // المجموع بعد الخصم
    const subTotal = voucherData?.sub_total || cartData?.total; // السعر قبل الخصم
  

  const paymentMethods = [
    { key: "credit", label: t("credit") },
    { key: "cash", label: t("cash") },
    { key: "wallet", label: t("wallet") },
    { key: "apple", label: t("apple") },
    { key: "mada", label: t("mada") },
  ];

  return (
    <>
      <div className="px-[20px] py-[16px] border border-text-borders rounded-sm mb-3 ">
        <h2 className=" text-[18px] font-bold text-text-main ">
          {" "}
          {t("Shopping-cart")}{" "}
        </h2>

        <div className="flex flex-col gap-y-[14px] ">
          <div className="flex justify-between items-center py-[12px] border-b border-text-borders ">
            <span className="text-[16px] font-normal text-text-sub ">
              {t("Subtotal")}
            </span>
            <span className="text-[14px] font-normal text-text-main ">
            {subTotal} {t("Saudi-Riyal")}
            </span>
          </div>
          {/* <div className="flex justify-between items-center py-[12px] border-b border-text-borders ">
            <span className="text-[16px] font-normal text-text-sub ">
              {t("shipping")}
            </span>
            <span className="text-[14px] font-normal text-text-main ">
              20 {t("Saudi-Riyal")}
            </span>
          </div> */}
          {discount > 0 && (
            <div className="flex justify-between items-center py-[12px] border-b border-text-borders">
              <span className="text-[16px] font-normal text-text-sub">
              {t("opponent")}
              </span>
              <span className="text-[14px] font-normal text-accent-danger">
                -{discount} {t("Saudi-Riyal")}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center py-[12px] border-b border-text-borders ">
            <span className="text-[16px] font-normal text-text-sub ">
              {t("total")}
            </span>
            <span className="text-[16px] font-bold text-text-main ">
            {totalAfterDiscount} {t("Saudi-Riyal")}
            </span>
          </div>
        </div>
      </div>
      <div className="px-[20px] py-[16px] border border-text-borders rounded-sm">
        <h2 className="text-[18px] font-bold text-text-main mb-[14px] ">
          {t("payment-method")}
        </h2>

        <RadioGroup
          value={selectedMethod}
          onValueChange={(value) => setSelectedMethod(value)}
          className="flex flex-col items-end gap-y-[16px]"
        >
          {paymentMethods.map(({ key, label }) => (
            <div className="flex" key={key}>
              <label className="flex items-center justify-end gap-2">
                <span className="text-[16px] font-normal text-text-sub">
                  {label}
                </span>
                <RadioGroupItem value={key} />
              </label>
            </div>
          ))}
        </RadioGroup>

        <Button
          variant={"default"}
          className="w-full mt-[14px] "
          onClick={onSubmit}
        >
          {" "}
          {t("Order-now")}{" "}
        </Button>
        {/* <Orderdailog /> */}
      </div>
    </>
  );
};

export default TotalBasket;
