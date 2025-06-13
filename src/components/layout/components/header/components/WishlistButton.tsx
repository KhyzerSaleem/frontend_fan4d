"use client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/routing";
import { fetchWishlist } from "@/lib/apis/wishlist";
import { useTranslations } from "next-intl";

export default function WishlistButton() {
	const BASE_URL = process.env.NEXT_PUBLIC_API;

	// Fetch cart data using react-query
	const { data: payload } = useQuery({
		queryKey: ["wishlist"],
		queryFn: async () => {
			try {
				// Try fetching from the server function
				return await fetchWishlist();
			} catch (error) {
				console.error("Server fetch failed, trying fallback:", error);

				// Fallback to direct API fetch
				const response = await fetch(BASE_URL + "/wishlist/get");
				if (!response.ok) throw new Error("Fallback fetch failed");

				return await response.json();
			}
		},
	});
	const t = useTranslations();
	
	return (
		<>
			<Link href="/wishlist" className="hidden md:flex items-center gap-x-2 relative">
				<img src="/assets/icons/Heart.svg" alt="icon" />
				{payload?.data?.data?.length > 0 && (
					<span className="absolute bottom-[-5px] start-[-5px] bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">{payload?.data?.data?.length}</span>
				)}

				<span className="text-[0.8rem] sm:text-[1rem] font-normal">{t("Favorites")}</span>
			</Link>
		</>
	);
}
