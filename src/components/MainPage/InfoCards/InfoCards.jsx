import classes from "./InfoCards.module.scss";
import classNames from "classnames/bind";

import MediaQueries from "../../../HelperComponents/MediaQueries";

import cardImage1 from "../../../../src/images/description-1.png";
import cardImage2 from "../../../../src/images/description-2.png";
import cardImage3 from "../../../../src/images/description-3.png";

import "../../../assets/Global.scss";
function InfoCards() {
  const cx = classNames.bind(classes);
  const { minWidth1000 } = MediaQueries();

  console.log(minWidth1000);

  const cardsClassName = () => {
    return minWidth1000 ? classNames(cx("cards")) : "grid-mainpage-cards";
  };

  return (
    // <div className="grid-mainpage-cards">
    <div className={cardsClassName()}>
      <div className={classNames(cx("cards-container"))}>
        <div className={classNames(cx("cards-title"))}>
          <div className={classNames(cx("cards-title-above"))}>DESCRIPTION</div>
          <h2>Marketing Automation Will Bring More Qualified Leads</h2>
        </div>

        <div className={classNames(cx("cards-cardslist"))}>
          <div className={classNames(cx("cards-cardslist-card"))}>
            <div className={classNames(cx("cards-cardslist-card-img"))}>
              <img src={cardImage1} alt="stock presentation illustration" />
            </div>
            <div className={classNames(cx("cards-cardslist-card-body"))}>
              <h4>Lists Builder</h4>
              <p>
                It's very easy to start creating email lists for your marketing
                actions. Just create your Tivo account
              </p>
            </div>
          </div>

          <div className={classNames(cx("cards-cardslist-card"))}>
            <div className={classNames(cx("cards-cardslist-card-img"))}>
              <img src={cardImage2} alt="stock presentation illustration" />
            </div>
            <div className={classNames(cx("cards-cardslist-card-body"))}>
              <h4>Campaign Tracker</h4>
              <p>
                Campaigns is a feature we've developed since the beginning
                because it's at the core of Tivo's functionalities
              </p>
            </div>
          </div>

          <div className={classNames(cx("cards-cardslist-card"))}>
            <div className={classNames(cx("cards-cardslist-card-img"))}>
              <img src={cardImage3} alt="stock presentation illustration" />
            </div>
            <div className={classNames(cx("cards-cardslist-card-body"))}>
              <h4>Analytics Tool</h4>
              <p>
                Tivo collects customer data in order to help you analyse
                different situations and take required action
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCards;
