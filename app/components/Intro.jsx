"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import PropTypes from "prop-types";
import Link from "next/link";

const IntroSlider = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    fetch("/data/home.json")
      .then((res) => res.json())
      .then((data) => setHomeData(data))
      .catch((error) => console.error("Error cargando home.json:", error));
  }, []);

  if (!homeData) return <p>Loading...</p>;

  return (
    <div className="intro-slider-wrap">
      <Swiper
        loop={true}
        speed={750}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        {homeData[0].slider.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="intro-section section overlay"
              style={{
                backgroundImage: `url(${
                  slide.backgroundImage.startsWith("/")
                    ? slide.backgroundImage
                    : "/" + slide.backgroundImage
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container">
                <div className="row row-cols-lg-1 row-cols-1">
                  <div className="col align-self-center">
                    <div className="intro-content">
                      <span className="sub-title">{slide.subTitle}</span>
                      <h2 className="title">{slide.title}</h2>
                      <div className="desc">
                        <p>{slide.desc}</p>
                      </div>
                      <Link href="/" className="intro-btn">
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

IntroSlider.propTypes = {
  data: PropTypes.array,
};

export default IntroSlider;
