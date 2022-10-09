import "../../../assets/Global.scss";

import classes from "./Carousel.module.scss";
import classNames from "classnames/bind";

import { useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

import Slider from "infinite-react-carousel";
import images from "./SliderImages";

function Carousel() {
  let cx = classNames.bind(classes);
  const minWidth1000 = useWindowDimensions().width < 1000;
  const minWidth800 = useWindowDimensions().width < 800;
  const minWidth600 = useWindowDimensions().width < 600;
  const minWidth400 = useWindowDimensions().width < 400;

  const [quantity, setQuantity] = useState(0);

  const setSlidesToShow = () => {
    if (minWidth400) {
      setQuantity(1);
    } else if (minWidth600) {
      setQuantity(2);
    } else if (minWidth800) {
      setQuantity(3);
    } else if (minWidth1000) {
      setQuantity(4);
    } else setQuantity(5);
  };

  return (
    <div
      className={classNames("grid-mainpage-carousel", cx("carousel-container"))}
      onLoad={setSlidesToShow}
    >
      <Slider
        className={cx("carousel")}
        slidesToShow={quantity}
        autoplay={true}
        arrows={false}
        autoplaySpeed={3000}
        duration={100}
        onResize={setSlidesToShow}
      >
        {images.map((image, i) => (
          <div className={cx("carousel-item")} key={image.slice(-30)}>
            <img src={image} alt={`${i} carousel element`}></img>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;

{
  /* <motion.div
        ref={carousel}
        className={cx("carousel")}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className={cx("inner-carousel")}
        >
          {images.map((image, i) => {
            return (
              <motion.div className={cx("item")} key={image.slice(-30)}>
                <img src={image} alt={`${i} carousel element`}></img>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
      ; */
}
