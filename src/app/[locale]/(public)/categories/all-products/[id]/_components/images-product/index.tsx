"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { Navigation, Thumbs, Autoplay, EffectFade } from "swiper/modules";

type ImagesProductProps = {
  images: string[];
};

const ImagesProduct: React.FC<ImagesProductProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  return (
    <div className="images-product w-full py-4 sm:px-8  ">
      {/* Swiper الرئيسي للصور الكبيرة */}
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect="fade"
        modules={[Navigation, Thumbs, Autoplay, EffectFade]}
        className="main-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-contain sm:object-cover max-h-[400px] "
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper الصور المصغرة */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        watchSlidesProgress
        modules={[Thumbs]}
        className="thumbs-swiper mt-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-auto object-contain cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImagesProduct;
