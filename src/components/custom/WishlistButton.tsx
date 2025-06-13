/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { addAndRemoveProducts } from "@/lib/apis/products-details";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { fetchWishlist } from "@/lib/apis/wishlist"; // API to fetch wishlist
import { FaHeart } from "react-icons/fa";

interface WishlistButtonProps {
	productId: number;
}

const WishlistButton = ({ productId }: WishlistButtonProps) => {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	// ✅ Get the current wishlist from cache
	const { data: wishlistData } = useQuery({
		queryKey: ["wishlist"],
		queryFn: fetchWishlist,
		staleTime: Infinity, // Prevents unnecessary refetch
	});

	// ✅ Check if the product is in the wishlist
	const isProductInWishlist = wishlistData?.data?.data?.some((item: any) => item.id === productId);

	// ✅ Local state for instant UI updates
	const [isWishlist, setIsWishlist] = useState(isProductInWishlist || false);

	useEffect(() => {
		setIsWishlist(isProductInWishlist || false);
	}, [isProductInWishlist, wishlistData]);

	const { mutate, isPending } = useMutation({
		mutationFn: async () => await addAndRemoveProducts(productId),
		onMutate: () => {
			setIsWishlist((prev: any) => !prev); // Optimistic UI update

			// ✅ Update local cache without revalidation
			queryClient.setQueryData(["wishlist"], (oldData: any) => {
				if (!oldData) return oldData;

				const newWishlist = isWishlist
					? oldData.data.data.filter((item: any) => item.id !== productId) // Remove from wishlist
					: [...oldData.data.data, { id: productId }]; // Add to wishlist

				return { ...oldData, data: { ...oldData.data, data: newWishlist } };
			});
		},
		onSuccess: (result) => {
			if (result.status === 200) {
				toast({
          title: result.message,
					description: isWishlist ? "✅" : "✅",
					variant: "default",
					duration: 3000,
				});
			} else if (result.status === 401) {
				toast({
					title: result.message,
					variant: "destructive",
					duration: 3000,
				});

				// Revert UI state if unauthorized
				setIsWishlist((prev: any) => !prev);
			} else {
				toast({
					title: "خطأ غير متوقع",
					description: "حدث خطأ أثناء تحديث قائمة المفضلة.",
					variant: "destructive",
					duration: 3000,
				});

				// Revert UI state on unexpected error
				setIsWishlist((prev: any) => !prev);
			}
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onError: (error) => {
			toast({
				title: "خطأ في الشبكة",
				description: "يرجى التحقق من الاتصال بالإنترنت والمحاولة مرة أخرى.",
				variant: "destructive",
				duration: 3000,
			});

			// Revert UI state on network errors
			setIsWishlist((prev: any) => !prev);
		},
	});

	return (
		<button onClick={() => !isPending && mutate()} disabled={isPending} className="relative flex items-center justify-center">
			{isPending ? <Loader2 className="animate-spin text-gray-500" size={24} /> : <FaHeart className={isWishlist ? "text-red-500" : "text-gray-400"} size={24} />}
		</button>
	);
};

export default WishlistButton;
