import Breadcrumbs from "@/components/common/bread-crumb";
import { Button } from "@/components/ui/button";
import { fetchWishlist } from "@/lib/apis/wishlist";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import WishlistButton from "../../../../components/custom/WishlistButton";
import ViewButton from "@/components/custom/ViewButton";

// ✅ Force dynamic rendering to prevent caching
export const dynamic = "force-dynamic";

const Page = async () => {
	const t = await getTranslations();
	const payload = await fetchWishlist();
	const wishlistItems = payload?.data.data ?? [];

	const breadcrumbItems = [
		{
			href: "/",
			// label: "الرئيسية",
			icon: "/assets/icons/home.svg",
		},
		{
			label: t("Favorites"),
		},
	];

	const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

	return (
		<>
			<Breadcrumbs items={breadcrumbItems} />
			<section className="section">
				<div className="container mx-auto">
					<div className="col-span-full mb-12">
						<span className="span_section"> {t("Save-your-favorite")}</span>
						<div className="flex items-center">
							<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
							<h2 className="py-[16px] h2_section">{t("favorites-easily")}</h2>
						</div>
						{/* <p className="p_section pt-[12px]">
                صفحة المفضلة تتيح لك حفظ المنتجات التي تحبها لتصفحها لاحقًا أو
                تسوقها بسهولة. اجعل تجربة التسوق أكثر تميزًا عبر تخصيص قائمة
                خاصة تلبي احتياجاتك وذوقك الفريد.
              </p> */}
					</div>

					{/* ✅ Check if wishlist is empty */}
					{wishlistItems.length > 0 ? (
						<div className="row !items-start">
							{/* Dynamically render categories */}
							{wishlistItems.map((wishlist: wishlistData) => (
								<div key={wishlist.id} className="w-full md:w-6/12 lg:w-4/12 relative">
									<div className="md:px-4 pb-[32px] relative">
										<div className="relative">
											<img
												src={wishlist?.image}
												alt={wishlist?.title}
												// fill
												className="object-cover rounded-sm w-full md:h-[228px]"
												//   className="w-full md:h-[228px] object-cover rounded-sm "
											/>
											<div className="absolute bottom-[1rem] left-[50%] transform -translate-x-[50%] flex items-center gap-x-[20px]">
												<div className="p-[8px] rounded-sm bg-light-hover flex items-center justify-center">
													<WishlistButton productId={wishlist.id} /> {/* ✅ Use the Client Component */}
												</div>
												<ViewButton productId={wishlist.id} />
											</div>
										</div>
										<div className="flex flex-col gap-y-[16px] py-[16px]">
											<h2 className="text-text-main text-[1.2rem] font-bold">{wishlist.title}</h2>

											<p>{stripHtml(wishlist?.description)}</p>

											{/* <p className='text-text-sub text-[1.1rem] font-normal' > تغليف عبوات فريدة </p> */}
										</div>
										<Link href={`/categories/all-products/${wishlist?.id}`}>
											<Button variant="default" className="w-full font-bold flex items-center">
												<img src="/assets/icons/bag-2.svg" alt="icon" />
												{t("Product-Details")}
											</Button>
										</Link>
									</div>
								</div>
							))}
						</div>
					) : (
						/* ✅ Display message when wishlist is empty */
						<div className="text-center py-10 flex justify-center items-center flex-col">
							<h2 className="py-[16px] text-[30px] text-red-500">{t("empty")}</h2>
							<img src="/assets/images/empty-wishlist.webp" alt="empty wishlist" className="w-[400px]" />
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Page;
