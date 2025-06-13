import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
const Experts = async () => {
	const t = await getTranslations();

	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/home/about`, {
		method: "GET",
		cache: "no-store",
		headers: {
			lang: locale,
		},
	});

	const payload = await response.json();
	const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

	return (
		<>
			<section className="section py-10">
				<div className="container mx-auto">
					<div className="flex flex-wrap items-center lg:flex-nowrap gap-8">
						<div className="w-full lg:w-6/12">
							<div className="">
								{/* <span className="span_section">
                                    { payload?.data?.title }
                                </span> */}
								<div className="pt-[16px] flex items-center">
									<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
									<h2 className="h2_section">{t("experts-providing")}</h2>
								</div>
								<p className="p_section py-[30px]">{stripHtml(payload?.data?.description)}</p>
								<Button variant={"transparent"} className=" w-full md:w-2/3 !whitespace-pre-wrap  ">
									<Link href={"/about-us"}> {t("Explore-story")} </Link>
								</Button>
							</div>
						</div>

						{/* <div className="w-full lg:w-6/12 relative ">
                            <img src={payload?.data.image} alt='image' className=' object-cover ' />
                        </div> */}
						<div className="relative w-full lg:w-6/12 h-[400px]">
							{/* Top Left (Expands first, then shrinks) */}
							<img src="/assets/images/Experts1.png" alt="image" className=" rounded-sm absolute top-2 left-2 w-[48%] h-[48%] object-cover animate-expand-shrink" />

							{/* Top Right (Shrinks first, then expands) */}
							<img src="/assets/images/Experts2.png" alt="image" className=" rounded-sm absolute top-2 right-2 w-[48%] h-[48%] object-cover animate-shrink-expand" />

							{/* Bottom Left (Shrinks first, then expands) */}
							<img src="/assets/images/Experts4.png" alt="image" className=" rounded-sm absolute bottom-2 left-2 w-[48%] h-[48%] object-cover animate-shrink-expand" />

							{/* Bottom Right (Expands first, then shrinks) */}
							<img src="/assets/images/Experts3.png" alt="image" className=" rounded-sm absolute bottom-2 right-2 w-[48%] h-[48%] object-cover animate-expand-shrink" />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Experts;
