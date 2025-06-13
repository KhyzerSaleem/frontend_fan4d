// lib/hooks/use-cart.ts
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/lib/apis/get-cart";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};
