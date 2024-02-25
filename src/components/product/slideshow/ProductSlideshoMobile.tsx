"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slideshow.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

export default function ProductSlideshowMobile({
  images,
  title,
  className,
}: {
  images: string[];
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Swiper
        style={{ width: "100%", height: "auto" }}
        pagination
        // navigation={true}
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              className="object-fill"
              width={600}
              height={500}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
