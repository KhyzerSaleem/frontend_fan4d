import Breadcrumbs from "@/components/common/bread-crumb";
import React from "react";
import Card from "./_components/card";
import ALLProductsOffres from "./_components/all-products-offres";
// import FilterHeader from "./_components/filter-header";
import { getLocale, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

const Page = async () => {
	const t = await getTranslations();
	const locale = await getLocale();
  const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
	const token = await decode({
		token: tokenCookie,
		secret: process.env.NEXTAUTH_SECRET!,
	});

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products`, {
		method: "GET",
		cache: "no-store",
		headers: {
			lang: locale,
			Accept: "application/json",
			Authorization: `Bearer ${token?.token}`,
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
			label: t("Printing-Products"),
		},
	];

	return (
		<>
			<Breadcrumbs items={breadcrumbItems} />
			<section className="section">
				<div className="container mx-auto">
					<h2 className="pb-[40px] text-[2.2rem] font-bold text-text-main ">
						{" "}
						{/* الملابس والأقمشة{" "} */}
						{t("Printing-Products")}
					</h2>

					{/* <FilterHeader /> */}

					<div className="flex flex-wrap ">
						{/* <div className="md:w-3/12 w-full  ">
              <div className="md:pl-8 ">
                <div className="mb-[20px]">
                  <Filter />
                </div>
              </div>
            </div> */}

						<div className="w-full">
							<div className="">
								<Card payload={payload?.data?.data} />
							</div>
						</div>
					</div>
				</div>
			</section>
			<ALLProductsOffres offers={payloadOffers?.data} />
			{/* <Discount /> */}
		</>
	);
};

export default Page;
