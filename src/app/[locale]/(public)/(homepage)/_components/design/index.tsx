import React from "react";
import { getLocale } from "next-intl/server";

const Designs = async () => {
	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/home/banners`, {
		method: "GET",
		cache: "no-store",
		headers: {
			lang: locale,
		},
	});

	const payload = await response.json();

	return (
		<section className="section">
			<div className="container mx-auto">
				<div className="row ">
					{payload?.data.map((card: banners) => (
						<div key={card.id} className="w-full md:w-6/12 lg:w-4/12 relative rounded-[4px] overflow-hidden group">
							<div className="sm:px-4 py-4  ">
								<div className="absolute top-[30px] rtl:right-[30px] ltr:left-[30px] flex flex-col gap-y-[16px] z-10">
									<h2 className="text-[20px] font-[700] text-text-main transition-all duration-1200 ease-in group-hover:text-[23px]">{card.title}</h2>
									<p className="text-[20px] font-[400] text-text-sub transition-all duration-1200">{card.description}</p>
								</div>
								<div className="relative overflow-hidden">
									<img src={card.image} alt="image" className="object-cover w-full h-full rounded-[4px] transition-all duration-1200  ease-in transform group-hover:scale-150  group-hover:-rotate-6" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Designs;
