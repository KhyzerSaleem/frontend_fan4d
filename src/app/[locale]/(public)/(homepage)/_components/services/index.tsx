import React from "react";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import SwiperComponents from "./_components/swiper";

const Services = async () => {
	const t = await getTranslations();

	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/home/categories`, {
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
					<div className="row relative">
						{/* Header Section */}
						<div className="col-span-full mb-12">
							<div className="flex justify-between items-center">
								<span className="span_section"> {t("Endless-choices")} </span>
								<Link href={"/categories"} className="text-[13px] md:text-[16px] md:font-[700] text-normal text-end  ">
									{t("Browse-more-categories")}
								</Link>
							</div>
							<div className="flex items-center">
								<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
								<h2 className="py-[16px] h2_section  ">
									{t("discoveryText")}
									<br className="hidden md:inline" />
									<span className=""> {t("design-meets")} </span>
								</h2>
							</div>
							<p className="p_section pt-[12px]">{t("professional-packaging")}</p>
						</div>

						{/* Services Slides */}
						<SwiperComponents slides={payload.data || []} />
					</div>
				</div>
			</section>
		</>
	);
};

export default Services;
