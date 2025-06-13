import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import WishlistButton from "../../../../../../components/custom/WishlistButton";
import ViewButton from "@/components/custom/ViewButton";

const Products = async () => {
	const t = await getTranslations();
	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/home/not-print-products`, {
		method: "GET",
		cache: "no-store",
		headers: {
			lang: locale,
		},
	});

	const payload = await response.json();

	return (
		<>
			<section className="section">
				<div className="container mx-auto">
					<div className="row">
						{/* Header Section */}
						<div className="col-span-full mb-12">
							<div className="flex justify-between items-center">
								<span className="span_section">{t("start-designing")}</span>
								<Link href={"/categories/all-products"} className="text-[13px] md:text-[16px] md:font-[700] text-normal ">
									{t("browse-more-products")}
								</Link>
							</div>
							<div className="flex items-center">
								<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
								<h2 className="py-[16px] h2_section">
									{t("printing-packaging-title")}

									<br />
									{t("printing-packaging-subtitle")}
								</h2>
							</div>
							<p className="p_section pt-[12px]">{t("printing-packaging-description")}</p>
						</div>

						{/* Products Section */}
						{payload?.data.map((product: product) => (
							<div key={product.id} className="md:w-4/12 lg:W-3/12 w-full relative md:p-4 py-4 group overflow-hidden rounded-sm">
								<div className="relative overflow-hidden">
									<img src={product?.image} alt={product?.title} className="w-full h-full object-cover rounded-sm" />
									{/* Overlay Effect */}
									<div className="absolute bottom-0 inset-0 bg-black opacity-0 group-hover:translate-top-0 group-hover:opacity-70 transition-all duration-1000 rounded-sm"></div>
									<div className="absolute inset-0   translate-y-full group-hover:translate-y-0  transition-all duration-1000 text-white rounded-sm p-3 flex items-center justify-center flex-col">
										<div className="text-center">
											<p className="mb-4">{product?.title}</p>
											<p className="mb-3">
												{product?.price} {t("Saudi-Riyal")}{" "}
											</p>
										</div>
										<div className="flex items-start  justify-center">
											<div className="p-[8px] rounded-sm bg-light-hover flex items-center justify-center me-2" key={product.id}>
												<WishlistButton productId={product.id} />
											</div>
											<ViewButton productId={product?.id} />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Products;
