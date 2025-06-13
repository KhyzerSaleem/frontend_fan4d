import React from "react";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import OffersSwiper from "./_components/swiper";

const OffersSection = async () => {
	const t = await getTranslations();
	const locale = await getLocale();

	// Fetch data
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/home/offers`, {
		method: "GET",
		cache: "no-store",
		headers: { lang: locale },
	});
	const payload = await response.json();

	return (
		<section className="section">
			<div className="container mx-auto">
				<div className="row">
					{/* Header Section */}
					<div className="col-span-full mb-12">
						<div className="flex justify-between items-center">
							<span className="span_section"> {t("Exclusive-offers")} </span>
							<Link href={"/offers"} className="text-[13px] md:text-[16px] md:font-[700] text-normal text-end ">
								{t("Browse-more-offers")}
							</Link>
						</div>
						<div className="flex items-center">
							<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
							<h2 className="py-[16px] h2_section">
								{t("Best-exclusive")} <br className="hidden md:inline" />
								{t("Creative-designs")}
							</h2>
						</div>
						<p className="p_section pt-[12px]">{t("offer-variety")}</p>
					</div>

					{/* Swiper Section */}
					<OffersSwiper offers={payload?.data || []} />
				</div>
			</div>
		</section>
	);
};

export default OffersSection;
