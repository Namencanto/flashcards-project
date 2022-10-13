import classes from "./CarouselOpinions.module.scss";
import classNames from "classnames/bind";

import "../../../assets/Global.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import Slider from "infinite-react-carousel";

import image1 from "../../../images/testimonial-1.jpg";
import image2 from "../../../images/testimonial-2.jpg";
import image3 from "../../../images/testimonial-3.jpg";
import image4 from "../../../images/testimonial-4.jpg";

function CarouselOpinions() {
  const cx = classNames.bind(classes);

  return (
    <div
      className={classNames(
        "grid-mainpage-carousel-opinions",
        cx("carousel-container")
      )}
    >
      <Slider
        className={cx("carousel")}
        autoplay={true}
        autoplaySpeed={10000}
        duration={100}
      >
        <div className={cx("carousel-item")}>
          <img src={image1} alt="random user"></img>
          <div className={cx("carousel-item-text-container")}>
            <p>
              I started to use Tivo with the free trial about a year ago and
              never stopped since then. It does all the repeating marketing
              tasks and allows me to focus on core development activities like
              new product research and design. I love it and recommend it to
              everyone.
            </p>
            <h3>Jude Thorn - Online Marketer</h3>{" "}
          </div>
        </div>

        <div className={cx("carousel-item")}>
          <img src={image2} alt="random user"></img>
          <div className={cx("carousel-item-text-container")}>
            <p>
              Awesome features for the money. I never thought such a low ammount
              of money would bring me so many leads per month. Before Tivo I
              used the services of an agency which cost 10x more and delivered
              far less. Highly recommended to marketers focused on results.
            </p>
            <h3>Roy Smith - Developer</h3>
          </div>
        </div>
        <div className={cx("carousel-item")}>
          <img src={image3} alt="random user"></img>
          <div className={cx("carousel-item-text-container")}>
            <p>
              Tivo is the best marketing automation app for small and medium
              sized business. It understands the mindset of young entrepreneurs
              and provides the necessary data for wise marketing decisions. Just
              give it a try and you will definitely not regret spending your
              time.
            </p>
            <h3>Marsha Singer - Online Marketer</h3>{" "}
          </div>
        </div>
        <div className={cx("carousel-item")}>
          <img src={image4} alt="random user"></img>
          <div className={cx("carousel-item-text-container")}>
            <p>
              Tivo is one of the greatest marketing automation apps out there. I
              especially love the Reporting Tools module because it gives me
              such a great amount of information based on little amounts of
              input gathered in just few weeks of light weight usage.
              Recommended!
            </p>
            <h3>Ronda Louis - Online Marketer</h3>{" "}
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default CarouselOpinions;
