"use client";

import { useToast } from "@/hooks/use-toast";
import { addAndRemoveProducts } from "@/lib/apis/products-details";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { ProductDetails } from "@/lib/types/product-details";

interface WishlistButtonProps {
  product: ProductDetails["product"];
}

export const WishlistButton = ({ product }: WishlistButtonProps) => {
  const t = useTranslations();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isWishlist, setIsWishlist] = useState(product.is_wishlist);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await addAndRemoveProducts(product.id);
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        setIsWishlist((prev) => {
          const newState = !prev;
          toast({
            title: data.message,
            description: t("Toast.ProductActionSuccess", {
              action: newState ? t("Toast.Add") : t("Toast.Remove"),
            }),
            variant: "default",
            duration: 3000,
          });
          return newState;
        });

        // 🔄 Invalidate and refetch wishlist
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      } else if (data.status === 401) {
        toast({
          title: data.message,
          variant: "destructive",
          duration: 3000,
        });
      }
    },
    onError: () => {
      toast({
        title: t("Sending-Error"),
        description: t("Unexpected-Error"),
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  return (
    <button
      className="p-[0px] w-[56px] h-[56px] flex justify-center items-center bg-light-active rounded-sm cursor-pointer"
      onClick={() => !isPending && mutate()}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="animate-spin text-white" size={24} />
      ) : (
        <FaHeart className={isWishlist ? "text-normal" : "text-white"} size={24} />
      )}
    </button>
  );
};
