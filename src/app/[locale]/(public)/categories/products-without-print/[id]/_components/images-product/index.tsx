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

const ImagesProduct = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  const images = [
    { image: "/assets/images/Offers1.png" },
    { image: "/assets/images/Offers2.png" },
    { image: "/assets/images/Offers3.png" },
    { image: "/assets/images/Offers4.png" },
    { image: "/assets/images/Offers5.png" },
  ];

  return (
    <div className="images-product w-full py-4 sm:px-8">
      {/* Swiper الرئيسي للصور الكبيرة */}
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 3000, // وقت الانتقال بين الصور
          disableOnInteraction: false, // استمر في التشغيل التلقائي حتى بعد التفاعل
        }}
        effect="fade" // تطبيق تأثير التلاشي
        modules={[Navigation, Thumbs, Autoplay, EffectFade]}
        className="main-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.image}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-contain sm:object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper الصور المصغرة */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={2} // افتراضي للجوال
        breakpoints={{
          640: { slidesPerView: 3 }, // للشاشات >= 640px
          768: { slidesPerView: 4 }, // للشاشات >= 768px
          1024: { slidesPerView: 5 }, // للشاشات >= 1024px
        }}
        watchSlidesProgress
        modules={[Thumbs]}
        className="thumbs-swiper mt-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.image}
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
