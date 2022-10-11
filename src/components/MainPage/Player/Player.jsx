import classes from "./Player.module.scss";
import classNames from "classnames/bind";

import playerImage from "../../../images/video-image.png";

import "../../../assets/Global.scss";
import { useState } from "react";

import ModalVideo from "react-modal-video";

import ReactDOM from "react-dom";
import "./PlayerVideo.scss";

function Player() {
  const cx = classNames.bind(classes);

  const [videoIsVisible, setVideoIsVisible] = useState(false);

  const showVideoHandler = () => {
    setVideoIsVisible(true);
  };
  return (
    <>
      {ReactDOM.createPortal(
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={videoIsVisible}
          videoId="sWtEYPva4A0"
          onClose={() => setVideoIsVisible(false)}
        />,
        document.getElementById("overlay-root")
      )}

      <div className={classNames(cx("player"))}>
        <div className="grid-mainpage-player">
          <div className={classNames(cx("player-container"))}>
            <div
              onClick={() => setVideoIsVisible(true)}
              className={classNames(cx("player-video"))}
            >
              <div className={classNames(cx("player-video-main"))}>
                <img src={playerImage} alt="video illustration" />
                <span className={classNames(cx("player-video-main-button"))}>
                  <span></span>
                </span>
              </div>
            </div>
            <p>
              What better way to show off Tivo marketing automation saas app
              than presenting you some great situations of each module and tool
              available to users in a video
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
