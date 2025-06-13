import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

const Steps = async () => {
	const t = await getTranslations();
	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/home/steps`, {
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
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[32px]">
						{/* header section */}
						<div className="text-center col-span-full mb-12">
							<span className="span_section"> {t("Every-brings")} </span>
							<h2 className="py-[16px] h2_section line-bottom"> {t("Discover-simple")} </h2>
							<p className="p_section">{t("offer-comprehensive")}</p>
						</div>

						{/* cards */}
						{payload?.data?.map((step: step) => (
							<div key={step.id} className="bg-[#F7F7F7] p-[24px] rounded-sm">
								<div className="card-header flex items-center justify-between">
									<img src={step.image} alt="icon" />
									<span className="text-[48px] font-[700] text-normal opacity-10">{`${step.number}`}</span>
								</div>
								<div className="card-center py-[20px]">
									<h2 className="text-text-main md:text-[20px] text-[15px] font-[700]">{step.title}</h2>
								</div>
								<p className="text-text-sub md:text-[20px] text-[15px] font-[400] pt-[20px]">{step.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Steps;
