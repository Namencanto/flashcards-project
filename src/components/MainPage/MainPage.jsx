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
import { useRef } from "react";
function MainPage() {
  const featuresRef = useRef();
  console.log(featuresRef);
  const allParts = [featuresRef];

  return (
    <>
      <Header allParts={allParts} />
      <Carousel />
      <InfoCards />
      <Features ref={featuresRef} />
      <Details />
      <Player />
      <Price />
      <CarouselOpinions />
      <Newsletter />
      <SocialMedia />
      <Footer />
    </>
  );
}

export default MainPage;
