/*import React from "react";
import Swiper, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Intro from "./Intro";
//import HomeData from "../../../data/home.json";

Swiper.use([Pagination]);
const IntroContainer = () => {
  const swiperOption = {
    loop: true,
    speed: 750,
    spaceBetween: 0,
    slidesPerView: 1,
    pagination: { clickable: true },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  };
  return (
    <div className="intro-slider-wrap">
      <Swiper effect="fade" className="intro-slider" {...swiperOption}>
        {HomeData[0].slider &&
          HomeData[0].slider.map((single, key) => {
            return (
              <SwiperSlide key={key}>
                <Intro data={single} key={key} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

//export default IntroContainer;


import PropTypes from "prop-types";
import Link from "next/link";
//const Intro = ({ data }) => {
  return (
    <div
      className="intro-section section overlay"
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + data.backgroundImage
        })`,
      }}
    >
      <div className="container">
        <div className="row row-cols-lg-1 row-cols-1">
          <div className="col align-self-center">
            <div className="intro-content">
              <span className="sub-title">{data.subTitle}</span>
              <h2 className="title">{data.title}</h2>
              <div className="desc">
                <p>{data.desc}</p>
              </div>
              <Link to={process.env.PUBLIC_URL + "/"} className="intro-btn">
                {data.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Intro.propTypes = {
  data: PropTypes.object,
};

export default Intro;
*/