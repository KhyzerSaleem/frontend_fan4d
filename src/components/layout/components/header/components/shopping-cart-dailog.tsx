"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/routing";
import RemoveCartButton from "./remove-cart-button";
import { getCart } from "@/lib/apis/get-cart";
import { toast } from "@/hooks/use-toast";

const ShoppingCartDialog = () => {
	const t = useTranslations();
	const BASE_URL = process.env.NEXT_PUBLIC_API;
	// Fetch cart data using react-query
	const { data: payload } = useQuery({
		queryKey: ["cart"],
		queryFn: async () => {
			try {
				// Try fetching from the server function
				return await getCart();
			} catch (error) {
				console.error("Server fetch failed, trying fallback:", error);

				// Fallback to direct API fetch
				const response = await fetch(`${BASE_URL}/cart`);
				if (!response.ok) throw new Error("Fallback fetch failed");

				return await response.json();
			}
		},
	});

	const closeDrawer = () => {
		const drawerCheckbox = document.getElementById("my-drawer") as HTMLInputElement;
		if (drawerCheckbox) {
			drawerCheckbox.checked = false;
		}
	};

	const handleCheckoutClick = (e: React.MouseEvent) => {
		const items = payload?.data?.items;

		if (!Array.isArray(items) || items.length === 0) {
			e.preventDefault(); // Prevent navigation
			toast({
				title: t("EmptyCart"),
				description: t("hint"),
				variant: "destructive",
				duration: 3000,
			});
		} else {
			closeDrawer(); // Proceed normally
		}
	};

	return (
		<>
			<div className="">
				<input id="my-drawer" type="checkbox" className="drawer-toggle inline-block  z-50" />
				<div className="">
					{/* Page content here */}
					<label htmlFor="my-drawer" className=" ">
						<div className="relative cursor-pointer hidden md:flex items-center gap-x-2 ">
							<img src="/assets/icons/Bag.svg" alt="icon" />

							{payload?.data?.items.length > 0 && (
								<span className="absolute bottom-[-5px] start-[-5px] bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">{payload?.data?.items.length}</span>
							)}

							<span className="text-[0.8rem] sm:text-[1rem] font-normal">{t("basket")}</span>
						</div>
					</label>
				</div>
				<div className="drawer-side  z-50 ">
					<label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu bg-base-200 text-base-content min-h-full sm:min-w-[60%] md:min-w-[40%] p-4 z-50">
						{/* ✅ Close Button (New) */}
						<div className="flex justify-end mb-4 ">
							<span
								onClick={() => ((document.getElementById("my-drawer") as HTMLInputElement).checked = false)}
								className="text-white  text-3xl bg-red-500 w-[30px] h-[35px] flex items-center justify-center rounded-md cursor-pointer leading-[0px] ">
								<span>&times;</span>
							</span>
						</div>
						<div className="text-lg font-bold text-gray-800 rtl:text-right">
							{t("Shopping-cart")} ({payload?.data?.items.length})
						</div>
						<div className="flex flex-col justify-between  ">
							<div className="my-[32px]  ">
								{payload?.data?.items.length > 0 ? (
									payload?.data?.items.map((product: productCart) => (
										<div key={product.id} className="block md:flex items-center gap-x-[20px] relative border-b border-text-borders pb-[10px] my-[10px] gap-y-[20px]">
											<img src={product?.product?.image || "/assets/images/shopping.png"} alt="image" className="w-[111px] h-[111px] object-cover" />
											<div className="flex flex-col gap-y-[10px]">
												<h2 className="text-[1rem] font-bold text-text-main">
													<Link href={`/categories/all-products/${product.product.id}`}>{product?.product?.title || "منتج بدون عنوان"}</Link>
												</h2>
												<p className="text-[14px] font-normal text-text-main">
													{t("price")} : {product.product?.price} {t("Saudi-Riyal")}
												</p>
												<div className="flex items-center justify-between gap-y-[10px] gap-x-3 ">
													<span className="text-[16px] font-bold text-normal">
														{t("Quantity")} : {product?.quantity?.quantity}
													</span>
													<span className="text-[16px] font-bold text-normal">
														{t("count")}: {product?.count}
													</span>
													<span className="text-[16px] font-bold text-normal">
														{t("price")}: {product?.price} {t("Saudi-Riyal")}
													</span>
												</div>
											</div>
											<RemoveCartButton cart_id={product?.id} />
										</div>
									))
								) : (
									<p className="text-center text-gray-500"> {t("EmptyCart")} </p>
								)}

								<div className="flex items-center justify-between mt-4">
									<h3 className="text-[22px] font-bold text-text-main">
										{payload?.data?.items.length} {t("Products")}
									</h3>
									<div className="text-[22px] font-bold text-text-main leading-none">
										<p>{payload?.data?.total || 0}</p>
										<span className="text-[14px] font-normal text-text-sub">{t("Saudi-Riyal")}</span>
									</div>
								</div>
							</div>
							<div className="block md:flex flex-col items-center justify-between w-full gap-x-[32px]">
								<Link href={"/shopping-cart/checkout"} className="w-full">
									<Button className="w-full mb-5" variant={"default"} onClick={handleCheckoutClick}>
										{t("ProceedToCheckout")}
									</Button>
								</Link>
								<Link href={"/shopping-cart"} className="w-full">
									<Button className="w-full" variant={"transparent"} onClick={closeDrawer}>
										{t("GoToCart")}
									</Button>
								</Link>
							</div>
						</div>
					</ul>
				</div>
			</div>
		</>
	);
};

export default ShoppingCartDialog;
