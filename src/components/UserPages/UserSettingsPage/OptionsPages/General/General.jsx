import classNames from "classnames/bind";
import classes from "./General.module.scss";
import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import GeneralAvatar from "./GeneralAvatar/GeneralAvatar";
import GeneralUserInformation from "./GeneralUserInformation/GeneralUserInformation";
import axios from "axios";
import { useEffect } from "react";
const General = () => {
  const cx = classNames.bind(classes);
  const URL = process.env.REACT_APP_URL;

  const [currentNick, setCurrentNick] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png"
  );
  // * this is just for test
  const generalInformationFetch = async () => {
    try {
      const resGeneral = await axios.get("/users/general");
      setCurrentNick(resGeneral.data.nick);
      setCurrentAvatar(
        resGeneral.data.avatar.startsWith("user-avatar-")
          ? `${URL}/${resGeneral.data.avatar}`
          : resGeneral.data.avatar
      );
    } catch (e) {
      return e.message;
    }
  };
  console.log(currentAvatar);
  useEffect(() => {
    generalInformationFetch();
  }, []);
  const postGeneralAvatarHandler = async (avatar) => {
    console.log(avatar);
    try {
      const resAvatar = await axios.post("/users/avatar", avatar, {
        headers: {
          "Content-Type": "multipart/form-data",
          previousAvatar: false,
        },
      });
    } catch (e) {
      return e.message;
    }
  };
  const postGeneralNickHandler = async (nick) => {
    console.log(nick);
    try {
      const resNick = await axios.post("/users/nick", {
        nick,
      });
      setCurrentNick(resNick);
      console.log(resNick);
    } catch (e) {
      return e.message;
    }
  };

  return (
    <div className={classNames(cx("settings-general"))}>
      <h1>General settings</h1>
      <GeneralAvatar
        setCurrentAvatar={setCurrentAvatar}
        currentAvatar={currentAvatar}
        postGeneralAvatar={postGeneralAvatarHandler}
      />
      <GeneralUserInformation
        currentNick={currentNick}
        postGeneralNick={postGeneralNickHandler}
      />
    </div>
  );
};

export default General;
