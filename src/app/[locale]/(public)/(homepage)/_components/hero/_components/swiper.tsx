"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";

type Slide = {
	id: number;
	title: string;
	description: string;
	image: string;
};

type SwiperComponentsProps = {
	slides: Slide[];
};

const SwiperComponents: React.FC<SwiperComponentsProps> = ({ slides }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!slides || slides.length === 0) {
		return <div>No slides available.</div>;
	}

	return (
		<div className="row justify-end relative">
			<div className="!px-4">
				<div className="absolute top-1/2 rtl:right-0 ltr:left-0 transform -translate-y-1/2 p-6 md:p-[60px] bg-white bg-opacity-80 rounded-[22.367px] shadow-[0px_0px_4.473px_0px_rgba(0,0,0,0.08)] backdrop-blur-[5.591716289520264px] z-30 w-full md:w-1/2">
					<h2 className="md:text-[2.2rem] text-[1.2rem] text-normal font-[700] pt-[12px] pb-[30px]  duration-700 transition-opacity">{slides[currentIndex]?.title}</h2>
					<span className="md:text-[1.2rem] text-[1rem] text-text-main duration-700 transition-opacity ">{slides[currentIndex]?.description}</span>
				</div>
			</div>

			<div className="w-full md:w-10/12 relative h-full">
				<Swiper
					onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
					spaceBetween={50}
					slidesPerView={1}
					modules={[Navigation, EffectFade, Pagination, Autoplay]}
					effect="fade"
					speed={800}
					loop
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					navigation={{
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					}}
					className="mySwiper">
					{slides.map((slide) => (
						<SwiperSlide key={slide.id}>
							<div className="overflow-hidden h-[100vh]  md:pe-10 md:pb-10">
								<Image width={2000} height={0} src={slide.image} alt={slide.title} className="object-cover w-full h-full md:rounded-[20px] ltr:shadow-[44px_38px_0px_0px_rgba(232,237,240,1)] rtl:shadow-[-47px_38px_0px_rgba(232,237,240,1)]"  />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>


			<div className="absolute bottom-[60px] rtl:left-[50%] transform -translate-x-[50%] md:rtl:left-16 md:transform md:-translate-x-[0%] ltr:right-[-50%] md:ltr:right-16 z-30 flex items-center justify-center gap-x-6 w-full md:w-3/12">
				<button className="swiper-button-prev !text-[16px] !text-white" aria-label="Previous Slide"></button>
				<div className="flex items-center justify-center gap-x-2">
					<span className="text-white text-xl font-bold">{`0${currentIndex + 1}`}</span>
					<div className="w-40 h-[2px] bg-[#D3D3D3] rounded-full overflow-hidden">
						<div className="h-full bg-white rounded-full duration-300 " style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}></div>
					</div>
					<span className="text-white text-xl font-bold">03</span>
				</div>
				<button className="swiper-button-next md:ml-8" aria-label="Next Slide"></button>
			</div>
		</div>
	);
};

export default SwiperComponents;
