import Breadcrumbs from "@/components/common/bread-crumb";
import React from "react";
// import Filter from "./_components/filter";
import Card from "./_components/card";
// import ALLProductsOffres from "./_components/all-products-offres";
// import Discount from "./_components/discount";
import { getLocale, getTranslations } from "next-intl/server";
import ALLProductsOffres from "../all-products/_components/all-products-offres";

const Page = async () => {
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
	const responseOffers = await fetch(`${process.env.NEXT_PUBLIC_API}/home/offers`, {
		method: "GET",
		cache: "no-store",
		headers: { lang: locale },
	});
	const payloadOffers = await responseOffers.json();

	const breadcrumbItems = [
		{
			href: "/",
			// label: "الرئيسية",
			icon: "/assets/icons/home.svg",
		},
		{
			label: t("Categories"),
			href: "/categories",
		},
		{
			label: t("Non-printing-products"),
		},
	];

	return (
		<>
			<Breadcrumbs items={breadcrumbItems} />
			<section className="section">
				<div className="container mx-auto">
					<h2 className=" text-[1.1rem] mb-[10px] md:text-[2.2rem] font-bold text-text-main "> {t("Non-printing-products")}</h2>
					<div className="flex flex-wrap ">
						{/* <div className="md:w-3/12 w-full  ">
              <div className="md:pl-8 ">
                <div className="flex justify-between items-center">
                  <div className="filter px-[2rem] py-[10px] flex items-center gap-x-[12px] bg-normal w-fit rounded-[43px] ">
                    <img src="/assets/icons/Filter.svg" alt="icon" />
                    <span className="text-[1rem] font-bold text-white ">
                      {" "}
                      فلتر{" "}
                    </span>
                  </div>
                  <span className="text-text-sub"> فرز حسب: </span>
                </div>

                <div className="mt-[50px]">
                  <Filter />
                </div>
              </div>
            </div> */}

						<div className="w-full ">
							<div className="">
								<Card products={payload?.data} />
							</div>
						</div>
					</div>
				</div>
			</section>
			<ALLProductsOffres offers={payloadOffers?.data} />
		</>
	);
};

export default Page;
