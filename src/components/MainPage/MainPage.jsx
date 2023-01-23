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
import { useEffect, useRef, useState, useContext } from "react";
import PageScrollBtn from "../PageScrollBtn/PageScrollBtn";
import useScrollPosition from "../../hooks/useScrollPosition";

import { AuthContext } from "../../context/AuthContext";

function MainPage(props) {
  const { currentUser, logout } = useContext(AuthContext);

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

  useEffect(() => {
    props.sendAllParts([featuresRef, detailsRef, playerRef, pricingRef]);
  }, []);

  return (
    <>
      <Header
        allParts={[featuresRef, detailsRef, playerRef, pricingRef]}
        currentUser={currentUser}
        logout={logout}
      />
      <Carousel />
      <InfoCards />
      <Features ref={featuresRef} />
      <Details ref={detailsRef} currentUser={currentUser} />
      <Player ref={playerRef} />
      <Price ref={pricingRef} currentUser={currentUser} />
      <CarouselOpinions />
      <Newsletter />
      <SocialMedia />
      <Footer />
      {scrollIsVisible ? <PageScrollBtn /> : ""}
    </>
  );
}

export default MainPage;
