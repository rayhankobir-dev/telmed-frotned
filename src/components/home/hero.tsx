"use client";
import "swiper/css";
import Image from "next/image";
import "swiper/css/effect-fade";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  "/banners/banner-1.webp",
  "/banners/banner-2.webp",
  "/banners/banner-3.webp",
  "/banners/banner-4.webp",
];

export default function Hero() {
  return (
    <section className="w-full h-fit max-h-[300px]">
      <Swiper
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        className="hero-slider rounded-xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="">
            <div className="rounded-xl overflow-hidden bg-primary/10">
              <img
                className="min-h-[130px] w-full object-cover object-bottom"
                src={slide}
                alt="Banner"
                width={1920}
                height={1080}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
