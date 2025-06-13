"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";

type Slide = {
	id: number;
	title: string;
	image: string;
};

type SwiperComponentsProps = {
	slides: Slide[];
};

const SwiperComponents: React.FC<SwiperComponentsProps> = ({ slides }) => {
	const prevRef = useRef<HTMLDivElement>(null);
	const nextRef = useRef<HTMLDivElement>(null);

	return (
		<div className="w-full relative">
			<Swiper
				modules={[Autoplay, Pagination ,Navigation, EffectFade]}
				autoplay={{
					delay: 3000,
					disableOnInteraction: true,
				}}
				pagination={{ clickable: true }}
				speed={1000}
				effect="slide"
				loop={slides.length > 1}
				spaceBetween={20}
				navigation={{
					nextEl: ".cat-next",
					prevEl: ".cat-prev",
				}}
				breakpoints={{
					320: { slidesPerView: 1, spaceBetween: 10 },
					420: { slidesPerView: 2, spaceBetween: 10 },
					640: { slidesPerView: 3, spaceBetween: 15 },
					1024: { slidesPerView: 4, spaceBetween: 20 },
					1280: { slidesPerView: 5, spaceBetween: 20 },
					1400: { slidesPerView: 6, spaceBetween: 20 },
				}} >
				{slides.map((category) => (
					<SwiperSlide key={category.id} className="pb-20">
						<div className="sm:px-4 flex flex-col justify-center items-center gap-y-[20px] group overflow-hidden">
							<div className="rounded-[50%]  border-[4px] border-opacity-0 border-gray-900  group-hover:border-opacity-100 overflow-hidden duration-1200 max-w-[175px] max-h-[175px] transition-all transform ">
								<Image
									src={category.image}
									alt={category.title}
									width={1000}
									height={200}
									className=" transform group-hover:scale-125 w-[175px] h-[175px] object-cover rounded-[50%] duration-1200 transition-all"
								/>
							</div>
							<h2 className="text-[20px] font-[700] text-text-main">{category.title}</h2>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{/* أزرار التنقل */}
			<div
				ref={nextRef}
				className=" cat-next absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-normal w-[57px] h-[57px] rounded-full items-center justify-center border-2 border-white hidden sm:flex text-white text-2xl cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
				</svg>
			</div>
			<div
				ref={prevRef}
				className=" cat-prev absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-normal w-[57px] h-[57px] rounded-full items-center justify-center border-2 border-white  hidden sm:flex text-white text-2xl cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
				</svg>
			</div>
		</div>
	);
};

export default SwiperComponents;
