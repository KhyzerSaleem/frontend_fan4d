"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { removeCart } from "@/lib/actions/cart/removeCart.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React from "react";

interface RemoveCartButtonProps {
	cart_id: number;
}

export default function RemoveCartButton({ cart_id }: RemoveCartButtonProps) {
	const t = useTranslations();

	const { toast } = useToast();
	const queryClient = useQueryClient(); // 🔥 استدعاء queryClient لتحديث البيانات بعد الحذف

	const { mutate } = useMutation({
		mutationFn: () => removeCart(cart_id),
		onSuccess: () => {
			// تحديث بيانات السلة بعد الحذف بدون Reload
			queryClient.invalidateQueries({ queryKey: ["cart"] });

			toast({
				title: "تم الحذف بنجاح",
				description: t("cartdel"),
				variant: "default",
			});
		},
		onError: (error) => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			toast({
				title: "حدث خطأ",
				description: "تعذر إزالة المنتج، حاول مرة أخرى.",
				variant: "destructive",
			});
			console.error("Error removing item:", error);
		},
	});

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => mutate()} // 🟢 عند الضغط، يتم الحذف وتحديث البيانات فورًا
			className="absolute rtl:left-2 ltr:right-2 top-0 cursor-pointer hover:bg-transparent">
			<img src="/assets/icons/close-circle.svg" alt="icon" />
		</Button>
	);
}
