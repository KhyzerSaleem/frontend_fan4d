"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { removeCart } from "@/lib/actions/cart/removeCart.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React from "react";

interface RemoveCartButtonProps {
	cart_id: number;
	onRemove: (id: number) => void;
}

export default function RemoveCartButton({ cart_id, onRemove }: RemoveCartButtonProps) {
	const t = useTranslations();

	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
    mutationFn: () => removeCart(cart_id),
		onSuccess: (response) => {
      // Assuming response contains a message field or custom message
			onRemove(cart_id); // 🔥 Update the list locally without Reload
			toast({
        title: response?.message, // Use response message if available
				description: t("cartdel"),
				variant: "default",
			});
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},

		onError: (error) => {
			// You can check if the error response contains a message, and use that
			const errorMessage = error?.message || "تعذر إزالة المنتج، حاول مرة أخرى.";
			toast({
				title: "حدث خطأ",
				description: errorMessage,
				variant: "destructive",
			});
			console.error("Error removing item:", error);
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});

	return (
		<Button variant="ghost" size="icon" onClick={() => mutate()} className="absolute rtl:left-2 ltr:right-2 top-0 cursor-pointer hover:bg-transparent">
			<img src="/assets/icons/close-circle.svg" alt="icon" />
		</Button>
	);
}
