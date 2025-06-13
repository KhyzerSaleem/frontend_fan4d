import Breadcrumbs from "@/components/common/bread-crumb";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

const Page = async () => {
	const t = await getTranslations();
	const locale = await getLocale();

	// Fetch data
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/home/offers`, {
		method: "GET",
		cache: "no-store",
		headers: { lang: locale },
	});
	const payload = await response.json();

	const breadcrumbItems = [
		{
			href: "/",
			// label: "الرئيسية",
			icon: "/assets/icons/home.svg",
		},
		{
			label: t("offers"),
		},
	];

	return (
		<>
			<Breadcrumbs items={breadcrumbItems} />
			<section className="section">
				<div className="container mx-auto">
					<div className="col-span-full mb-12">
						<span className="span_section"> {t("special-offers")} </span>
						<div className="flex items-center">
							<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
							<h2 className="py-[16px] h2_section">{t("Best-exclusive")}</h2>
						</div>
						{/* <p className="p_section pt-[12px]">
                                في فن، نقدم لك مجموعة من العروض الحصرية التي تتناسب مع احتياجاتك، سواء كنت بحاجة إلى طباعة عالية الجودة أو تغليف مبتكر. استمتع بأفضل الأسعار والخدمات المتكاملة التي تضمن لك تجربة مثالية في كل مرحلة. لا تفوت هذه الفرص المميزة!
                            </p> */}
					</div>
					<div className="row justify-start ">
						{/* Dynamically render categories */}
						{payload?.data?.map((offer: offers) => (
							<div key={offer.id} className="md:w-6/12 relative  ">
								<div className="md:px-4 pb-[32px] block md:flex items-center gap-x-[2rem] relative">
									<div className="md:w-1/2">
										<img src={offer.image} alt={offer.title} className="w-full md:h-[296px] object-cover rounded-sm " />
									</div>
									<div className="md:w-1/2">
										<h2 className="text-text-main text-[1.2rem] pt-5 md:pt-0 font-bold ">{offer.title}</h2>
										<p className="text-text-main text-[1rem] py-[1.2rem] font-normal">{offer.description}</p>
										<Link href={`/categories/all-products/${offer?.id}`}>
											<Button variant="transparent" className="w-full font-bold">
												{t("Choose-now")}
											</Button>
										</Link>
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

export default Page;
