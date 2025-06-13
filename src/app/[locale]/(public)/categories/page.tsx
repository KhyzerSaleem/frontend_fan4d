import Breadcrumbs from "@/components/common/bread-crumb";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
	const t = await getTranslations();
	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`, {
		method: "GET",
		cache: "no-store",
		headers: {
			lang: locale,
		},
	});

	const payload = await response.json();

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
	];

	return (
		<>
			<Breadcrumbs items={breadcrumbItems} />
			<section className="section">
				<div className="container mx-auto">
					<div className="col-span-full mb-12">
						<span className="span_section"> {t("Choose-your-category")} </span>
						<div className="flex items-center">
							<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
							<h2 className="py-[16px] h2_section">{t("Explore-our-premium")}</h2>
						</div>
						{/* <p className="p_section pt-[12px]">
                                في فن، نقدم مجموعة متنوعة من الفئات التي تلبي كافة احتياجاتك من الطباعة والتغليف. سواء كنت تبحث عن طباعة على ورق مميز، أو تغليف بأساليب مبتكرة، أو تصميم عبوات تعكس هوية علامتك التجارية، نحن هنا لتوفير الحلول المثالية التي تضمن لك الجودة والاحترافية في كل خطوة.
                            </p> */}
					</div>
					<div className="row justify-center ">
						{/* Dynamically render categories */}
						{payload?.data?.data?.map((category: categories) => (
							<div key={category.id} className="md:w-4/12 relative  ">
								<div className="md:px-4 pb-[32px] relative">
									<Image src={category.image} alt={category.title} width={400} height={400} className="object-contain  w-100" />
									<h2 className="text-text-main text-[1.2rem] py-[1.2rem] font-bold text-center">{category.title}</h2>
									<Link href={"/categories/all-products"}>
										<Button variant="transparent" className="w-full font-bold">
											{t("Choose-now")}
										</Button>
									</Link>
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
