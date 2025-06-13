"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "@/lib/actions/cart/addToCart.action";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Product } from "@/lib/types/product-details";

interface AddToCartButtonProps {
	product: Product;
	quantity_id: number | undefined;
	count: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: any; // you can type this better later with `UseFormReturn`
	formRef: React.RefObject<HTMLFormElement>;
}

export default function AddToCartButton({ product, quantity_id, count, form, formRef }: AddToCartButtonProps) {
	const t = useTranslations();
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			if (!formRef.current) return;

			const formData = new FormData(formRef.current);
			formData.append("product_id", product?.id.toString());
			if (quantity_id !== undefined) {
				formData.append("quantity_id", quantity_id.toString());
			}
			formData.append("count", count.toString());

			if (product?.need_design_files) {
				const files = form.getValues("files");
				if (files && files.length > 0) {
					Array.from(files).forEach((file, index) => {
						if (file instanceof File) {
							formData.append(`designs[${index}]`, file);
						}
					});
				}
			}

			return await addToCart(formData);
		},
		onSuccess: (data) => {
			if (data.status === 200) {
				toast({
					title: data.message || t("Toast.ProductAdded"),
					variant: "default",
				});
				queryClient.invalidateQueries({ queryKey: ["cart"] });
			} else if (data.status === 401) {
				toast({
					title: data.message || t("plslogin"),
					variant: "destructive",
					duration: 3000,
				});
			} else {
				toast({
					title: data.message || t("missing"),
					variant: "destructive",
					duration: 3000,
				});
			}
		},
		onError: (data) => {
			toast({
				title: data.message,
				variant: "destructive",
				duration: 3000,
			});
		},
	});

	return (
		<Button
			onClick={(e) => {
				e.preventDefault();
				mutate();
			}}
			variant="default"
			className="w-full"
			disabled={isPending}>
			{isPending ? <Loader2 className="animate-spin mr-2" /> : ""}
			<img src="/assets/icons/bag-2.svg" alt="icon" /> {t("add-to-cart")}
		</Button>
	);
}
