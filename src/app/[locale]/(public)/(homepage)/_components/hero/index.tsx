import React from "react";
import SwiperComponets from "./_components/swiper";
import { getLocale } from "next-intl/server";

const Hero = async () => {
	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/home/sliders`, {
		method: "GET",
		cache: "no-store",
		headers: {
			lang: locale,
		},
	});

	const payload = await response.json();

	return (
		<>
			<section className="hero !block h-[100vh]">
				<div className="container mx-auto">
					<SwiperComponets slides={payload.data || []} />
				</div>
			</section>
		</>
	);
};

export default Hero;
