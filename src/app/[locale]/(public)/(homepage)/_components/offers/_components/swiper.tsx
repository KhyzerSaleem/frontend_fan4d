"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";

interface Offer {
	id: number;
	title: string;
	description: string;
	image: string;
}

interface OffersSwiperProps {
	offers: Offer[];
}

const OffersSwiper: React.FC<OffersSwiperProps> = ({ offers }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<div className="w-full items-center flex flex-col sm:flex-row gap-4">
			{/* Slider Section */}
			<div className="w-full sm:w-6/12  relative ">
				<Swiper
					spaceBetween={50}
					slidesPerView={1}
					loop={true}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					effect="fade"
					fadeEffect={{ crossFade: true }}
					pagination={{ clickable: true }}
					navigation={{
						prevEl: ".offer-prev",
						nextEl: ".offer-next",
					}}
					modules={[Navigation, Pagination, Autoplay, EffectFade]}
					onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
					className="py-10">
					{offers.map((offer) => (
						<SwiperSlide key={offer.id} className=" pb-10">
							<div>
								<h2 className="text-text-main text-[1.3rem] md:text-[2rem] font-bold">{offer.title}</h2>
								<p className="text-text-sub text-[1rem] md:text-[1.2rem] font-semibold py-[32px]">{offer.description}</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<span className="offer-next absolute  bottom-2 left-4 cursor-pointer z-10">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
					</svg>
				</span> 
				<span className=" offer-prev absolute bottom-2 right-4 cursor-pointer z-10">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</span>
			</div>

			{/* Display the image based on current slide */}
			<div className="w-full sm:w-6/12 ">
				<img src={offers[currentSlide]?.image} alt="Offer" className="w-full h-[300px] md:h-[500px]  object-cover rounded-lg" />
			</div>
		</div>
	);
};

export default OffersSwiper;
