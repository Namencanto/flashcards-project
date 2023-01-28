import classNames from "classnames/bind";
import classes from "./General.module.scss";
import { useState, useEffect, useContext } from "react";
import GeneralAvatar from "./GeneralAvatar/GeneralAvatar";
import GeneralUserInformation from "./GeneralUserInformation/GeneralUserInformation";
import axios from "axios";
import { AuthContext } from "../../../../../context/AuthContext";
import defaultAvatar from "../../../../../images/default-avatar.png";
import UserSettingsHeader from "../UserSettingsHeader";
const General = () => {
  const { changeNick } = useContext(AuthContext);

  const cx = classNames.bind(classes);
  const URL = process.env.REACT_APP_URL;

  const [currentNick, setCurrentNick] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState(defaultAvatar);
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageTypeIsError, setServerMessageTypeIsError] =
    useState(false);

  const resetServerMessage = () => {
    setServerMessage("");
  };

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
      return e.serverMessage;
    }
  };

  useEffect(() => {
    generalInformationFetch();
  }, []);
  const postGeneralAvatarHandler = async (avatar) => {
    try {
      if (avatar) {
        await axios.post("/users/avatar", avatar, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        const resAvatarDelete = await axios.post("/users/avatar-delete");
        setServerMessage(resAvatarDelete.data);
        setServerMessageTypeIsError(false);
      }
    } catch (e) {
      setServerMessage(e.serverMessage);
      setServerMessageTypeIsError(true);
    }
  };
  const postGeneralNickHandler = async (nick) => {
    try {
      const resNick = await axios.post("/users/nick", {
        nick,
      });
      if (resNick.status === 200) {
        changeNick(nick);
        setCurrentNick(nick);
        setServerMessage("Successfully changed nick");
        setServerMessageTypeIsError(false);
      }
    } catch (e) {
      setServerMessage(e.serverMessage);
      setServerMessageTypeIsError(true);
    }
  };

  return (
    <div className={classNames(cx("settings-general"))}>
      <UserSettingsHeader title={"General settings"} />
      <GeneralAvatar
        setCurrentAvatar={setCurrentAvatar}
        currentAvatar={currentAvatar}
        postGeneralAvatar={postGeneralAvatarHandler}
      />
      <GeneralUserInformation
        resetServerMessage={resetServerMessage}
        currentNick={currentNick}
        postGeneralNick={postGeneralNickHandler}
        serverMessage={serverMessage}
        serverMessageTypeIsError={serverMessageTypeIsError}
      />
    </div>
  );
};

export default General;
