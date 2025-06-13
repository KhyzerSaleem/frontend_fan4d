import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

const Clients = async () => {
	const t = await getTranslations();
	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/home/reviews`, {
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
					<div className="row justify-center">
						{/* Header Section */}
						<div className="text-center col-span-full mb-12">
							<span className="span_section">{t("clients.testimonialsTitle")}</span>
							<h2 className="py-[16px] h2_section line-bottom">{t("clients.testimonialsHeading")}</h2>
							<p className="p_section">{t("clients.testimonialsDescription")}</p>
						</div>

						{/* Main Content Section */}
						<div className="relative block md:w-10/12 md:bg-[#F1F4F4] md:flex items-center md:p-[78px] mt-[32px]  after:hidden md:after:block after:content-[''] after:absolute after:top-[-65px] rtl:after:left-[-65px] ltr:after:left-[-65px] after:w-[559px] after:h-[660px] after:border-[20.8px] after:border-solid after:border-[#F49100] after:z-[-1] ">
							<div className="md:w-full mb-6 md:mb-0">
								<Carousel className="flex flex-col gap-y-[25px]">
									<CarouselContent>
										{payload?.data?.map((reviwe: reviewsv) => {
											return (
												<CarouselItem key={reviwe.id} className=" flex items-center flex-col md:flex-row ">
													<div className=" w-8/12 flex flex-col gap-y-[25px]">
														<Image src="/assets/icons/GermanDesignAward.svg" width={97} height={70} alt="icon" className=" object-cover " />
														<h2 className="md:text-[2rem] text-[1.5rem] font-[700] text-customPalette-300">{reviwe?.title}</h2>
														<p className="text-text-main font-normal md:text-[1.5rem] text-[1rem]">{reviwe?.description}</p>
														<div className="flex items-center md:gap-x-[30px] gap-x-[10px]">
															<div className="box w-[40px] h-[40px] rounded-sm bg-accent-warning "></div>
															<div className="flex flex-col gap-y-[4px] ">
																<h3 className="font-bold text-text-main text-[1.2rem]">{reviwe?.title}</h3>
																<span className="font-normal text-text-main text-[1.1rem]">{reviwe?.job_name}</span>
															</div>
														</div>
														<div></div>
													</div>
													<div className="md:w-4/12 relative">
														<div>
															<img src="/assets/images/Clients1.png" alt="image" className="w-full h-full object-cover z-10 py-[35px]" />
														</div>
														<div className="absolute top-[50%]  hidden md:block ltr:right-[0px]  w-[calc(100%-50%)] h-full border-t-[20.8px] border-b-[20.8px] border-solid border-[#F49100] z-[1]  ltr:border-r-[20.8px] transform -translate-y-1/2"></div>
													</div>
												</CarouselItem>
											);
										})}
									</CarouselContent>

									<CarouselPrevious className="bg-accent-warning hidden md:flex  " />
									<CarouselNext className="bg-accent-warning hidden md:flex " />
								</Carousel>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Clients;
