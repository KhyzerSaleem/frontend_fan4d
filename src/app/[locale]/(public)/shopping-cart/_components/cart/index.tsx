/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import RemoveCartButton from "./_components/remove-cart-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyVoucher } from "@/lib/actions/cart/apply-voucher";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {  Loader2 } from "lucide-react";
import TotalBasket from "../total-basket";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface ProductCart {
  id: number;
  quantity: {
    id: number;
    quantity: number;
  }; // changed from number to object
  count: number;
  price: string;
  product?: {
    id: number; // added id to support product.product.id
    image?: string;
    title?: string;
    price?: string;
  };
}

interface CartProps {
  cart: ProductCart[];
  total: string;
}

const Crat = ({ cart, total }: CartProps) => {
  
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(cart);
  const [discountData, setDiscountData] = useState<any>({
    sub_total: total,
    percent: 0,
    discount: 0,
    total: total,
  });

  const Schema = z.object({
    voucher_code: z
      .string({ required_error: "voucher_code is required" })
      .min(1, "voucher_code is required"),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      voucher_code: "",
    },
    resolver: zodResolver(Schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: { voucher_code: string; total: number }) =>
      applyVoucher(values),
    onSuccess: (response) => {
      if (response?.status === 200) {
        setDiscountData({
          sub_total: response.data.sub_total,
          discount: response.data.discount,
          total: response.data.total,
        });

        queryClient.setQueryData(["voucherData"], response.data);


        toast({
          title: t("CouponApplied"),
          description: t("DiscountApplied", {
            amount: response.data.discount,
            percent: response.data.percent,
          }),
          variant: "default",
        });
      }
    },
    onError: () => {
      toast({
        title: t("Sending-Error"),
        description: t("Unexpected-Error") ,
        variant: "destructive",
      });
    },
  });

  const handleRemove = (id: number) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      // Calculate new subtotal
      const newSubTotal = updatedCart.reduce(
        (acc, item) => acc + Number(item.price) ,
        0
      );
  
     console.log(cartItems) ;

      // Update discount data
      setDiscountData((prev: { discount: number; }) => ({
        ...prev,
        sub_total: newSubTotal,
        total: newSubTotal - prev.discount, // Maintain the discount logic
      }));
  
      return updatedCart;
    });
  };
  

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    mutate({ ...values, total: Number(total) });
  };

  return (
    <div className=" flex flex-wrap justify-between items-center gap-y-3">
      <div className="w-full md:w-7/12  px-[20px] py-[16px] border border-text-borders rounded-sm">
        {cartItems?.length > 0 ? (
          cartItems.map((product) => (
            <div
              key={product.id}
              className="block md:flex items-center gap-x-[20px] relative border-b border-text-borders pb-[10px] my-[10px] gap-y-[20px]"
            >
              <img
                src={product?.product?.image || "/assets/images/shopping.png"}
                alt="image"
                className="w-[111px] h-[111px] object-cover"
              />
              <div className="flex flex-col gap-y-[10px]">
                <h2 className="text-[1rem] font-bold text-text-main">
                <Link href={`/categories/all-products/${product?.product?.id}`}>  {product.product?.title || "منتج بدون عنوان"}</Link>
                </h2>
                <p className="text-[14px] font-normal text-text-main">
                {t("price")} : {product.product?.price} {t("Saudi-Riyal")}
                </p>
                <div className="flex items-center justify-between gap-y-[10px] gap-x-3">
                  <span className="text-[16px] font-bold text-normal">
                  {t("Quantity")}: {product.quantity?.quantity}
                  </span>
                  <span className="text-[16px] font-bold text-normal">
                  {t("count")}: {product.count}
                  </span>
                  <span className="text-[16px] font-bold text-normal">
                  {t("price")}: {product.price} {t("Saudi-Riyal")}
                  </span>
                </div>
              </div>
              <RemoveCartButton cart_id={product.id} onRemove={handleRemove} />
            </div>
          ))
        ) : (
          <div className="text-center py-10 flex justify-center items-center flex-col">
          <h2 className="py-[16px] text-[30px] text-red-500">{t("EmptyCart")}</h2>
          <img src="/assets/images/emptycart.jpg" alt="empty cart" className="w-[400px]" />
         
        </div>
         
        )}

        {/* Coupon Form */}
        <div className="block md:flex text-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full block md:flex gap-x-[12px] justify-center items-center"
            >
              <h2> {t("DiscountCode")} </h2>
              <div className="flex-1 py-3">
                <FormField
                  name="voucher_code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Input {...field} placeholder={t("EnterCode")} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button variant="default" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin mr-2" /> : ""}
                {t("ApplyCoupon")}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Total Basket */}
      <div className="w-full md:w-4/12 ">
        <TotalBasket
        items={cartItems?.length}
          sub_total={discountData.sub_total}
          discount={discountData.discount}
          total={discountData.total}
        />
      </div>
    </div>
  );
};

export default Crat;
