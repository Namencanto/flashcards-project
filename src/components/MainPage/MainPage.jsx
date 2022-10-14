import Header from "./Header/Header";
import Carousel from "./Carousel/Carousel";
import InfoCards from "./InfoCards/InfoCards";
import Features from "./Features/Features";
import Details from "./Details/Details";
import Player from "./Player/Player";
import Price from "./Price/Price";
import CarouselOpinions from "./CarouselOpinions/CarouselOpinions";
import Newsletter from "./Newsletter/Newsletter";
import SocialMedia from "./SocialMedia/SocialMedia";
import Footer from "./Footer/Footer";
import { useRef, useState } from "react";
import PageScrollBtn from "../PageScrollBtn/PageScrollBtn";
import useScrollPosition from "../../hooks/useScrollPosition";

function MainPage() {
  const featuresRef = useRef(),
    detailsRef = useRef(),
    playerRef = useRef(),
    pricingRef = useRef();

  const scrollPosition = useScrollPosition();

  const [scrollIsVisible, setScrollIsVisible] = useState();

  if (scrollIsVisible !== true && scrollPosition > 600) {
    setScrollIsVisible(true);
  }
  if (scrollIsVisible !== false && scrollPosition < 600) {
    setTimeout(() => {
      setScrollIsVisible(false);
    }, 500);
  }

  return (
    <>
      <Header allParts={[featuresRef, detailsRef, playerRef, pricingRef]} />
      <Carousel />
      <InfoCards />
      <Features ref={featuresRef} />
      <Details ref={detailsRef} />
      <Player ref={playerRef} />
      <Price ref={pricingRef} />
      <CarouselOpinions />
      <Newsletter />
      <SocialMedia />
      <Footer />
      {scrollIsVisible ? <PageScrollBtn /> : ""}
    </>
  );
}

export default MainPage;
