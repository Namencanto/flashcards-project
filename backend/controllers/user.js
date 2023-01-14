import { db } from "../config/db.js";
import { checkToken } from "./checkToken.js";

export const getInformation = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const q =
      "SELECT `about_me_info`, `languages`, `levels` FROM `user_description` WHERE `uid` = ?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

export const addInformation = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const q =
      "UPDATE `user_description` SET `about_me_info` = ? WHERE (`uid` = ?)";
    db.query(q, [req.body.aboutMeText, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

/**
 * * ADD LANGUAGES TO PROFILE INFORMATION
 */

export const addLanguage = (req, res) => {
  checkToken(req, res, (userInfo) => {
    if (!req.body.change) {
      if (req.body.language.includes("/") || req.body.level.includes("/"))
        return res.status(403).json("'/' Character is not allowed");
    }

    if (req.body.change) {
      for (let i = 0; i < req.body.language.length; i++) {
        if (req.body.language[i - 1] === "/" && req.body.language[i] === "/") {
          return res.status(403).json("'//' Character is not allowed");
        }
      }
      for (let i = 0; i < req.body.level.length; i++) {
        if (req.body.level[i - 1] === "/" && req.body.level[i] === "/") {
          return res.status(403).json("'//' Character is not allowed");
        }
      }
    }

    let queryDefault =
      "UPDATE `user_description` SET `languages` = concat(languages, ?), `levels` = concat(levels, ?) WHERE (`uid` = ?)";
    if (req.body.change) {
      queryDefault =
        "UPDATE `user_description` SET `languages` = ?, `levels` = ? WHERE (`uid` = ?)";
    }
    const parameters = !req.body.change
      ? [req.body.language + "/", req.body.level + "/", userInfo.id]
      : [req.body.language, req.body.level, userInfo.id];

    db.query(queryDefault, parameters, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const getRanking = (req, res) => {
  checkToken(req, res, () => {
    const today = new Date();
    const month = today.toISOString().split("T")[0].slice(0, -3);
    const qFirst =
      "SELECT `month_score`, `user_uid` FROM `users_monthly_statistics` WHERE month = ? ORDER BY month_score DESC LIMIT 10;";
    console.log(month);
    db.query(qFirst, [month], (err, dataFirst) => {
      if (err) return res.status(500).json(err);
      let qSecond = "";
      for (const data of dataFirst) {
        qSecond +=
          "SELECT `nick`, `avatar` FROM `users` WHERE id = " +
          data.user_uid +
          ";";
      }
      console.log(qSecond.length === 0);
      console.log(qSecond);
      if (qSecond.length === 0) {
        return res.status(200).json(null);
      }
      db.query(qSecond, (err, dataSecond) => {
        if (err) return res.status(500).json(err);

        return res.json({ dataFirst, dataSecond });
      });
    });
  });
};

///////////////////////////////////////////////////
// * USER SETTINGS PART
///////////////////////////////////////////////////

import { nickValidation } from "./server-validations/inputsValidation.js";
import sharp from "sharp";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const UPLOAD_PATH = path.join(__dirname, ".././uploads");
import fs from "fs";

// * GENERAL SETTINGS PART
// GET GENERAL SETTINGS
export const getGeneralInformation = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    const q = "SELECT `avatar`, `nick` FROM `users` WHERE `id` = ?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res
        .status(200)
        .json({ avatar: data[0].avatar, nick: data[0].nick });
    });
  });
};

// POST FOR UPLOAD & UPDATE USER AVATAR
export const postUserAvatar = (req, res) => {
  checkToken(req, res, (userInfo) => {
    // * DELETE AVATAR

    const qCheckPreviousAvatarExist =
      "SELECT avatar FROM techcards.users WHERE id = ?";
    db.query(qCheckPreviousAvatarExist, [userInfo.id], async (err, avatar) => {
      const previousAvatar = avatar[0].avatar;
      if (err) return res.status(500).json(err);

      if (previousAvatar && previousAvatar.startsWith(`user-avatar-`)) {
        fs.unlink(`${UPLOAD_PATH}/${previousAvatar}`, (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log("File deleted successfully");
          }
        });
      }

      //

      const { file } = req;
      const fileName = `user-avatar-${Date.now()}.${file.originalname}`;
      const imagePath = UPLOAD_PATH + `/${fileName}`;
      const imageBuffer = await sharp(file.buffer)
        .resize({
          fit: sharp.fit.contain,
          width: 250,
        })
        .jpeg({ quality: 50 })
        .toBuffer();
      if (imageBuffer.length > 500000) {
        throw new Error("Image too large");
      }
      fs.writeFile(imagePath, imageBuffer, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("File saved successfully");
        }
      });
      const qAvatar = "UPDATE `users` SET avatar = ? WHERE id = ?";

      db.query(qAvatar, [fileName, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(fileName);
        return res.status(200).json(fileName);
      });
    });
  });
};

// POST FOR DELETE USER AVATAR
export const postUserAvatarDelete = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const qCheckPreviousAvatarExist =
      "SELECT avatar FROM techcards.users WHERE id = ?";
    db.query(qCheckPreviousAvatarExist, [userInfo.id], async (err, avatar) => {
      const previousAvatar = avatar[0].avatar;
      if (err) return res.status(500).json(err);

      if (previousAvatar && previousAvatar.startsWith(`user-avatar-`)) {
        fs.unlink(`${UPLOAD_PATH}/${previousAvatar}`, (error) => {
          if (error) {
            res.status(500).json("Somethin went wrong...");
          } else {
            console.log("avatar successfully deleted");
          }
        });
      }
      const q = "UPDATE `users` SET `avatar` = NULL WHERE `id` = ?";

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json("Avatar successfully deleted");
      });
    });
  });
};

//

// POST FOR CHANGE USER NICK
export const postChangeUserNick = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    const nick = req.body.nick;
    if (!nickValidation(nick)) {
      return res.status(422).json("Invalid nick pattern");
    }
    const q = "UPDATE `users` SET `nick` = ? WHERE `id` = ?";

    db.query(q, [nick, userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json("Successfully changed nick");
    });
  });
};

// * PRIVATY AND LOGIN SETTINGS PART

// GET PRIVATY AND LOGIN DATA
export const getPrivatyAndLogin = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    const q = "SELECT `notifications`, `public` FROM `users` WHERE `id` = ?";
    db.query(q, userInfo.id, (err, data) => {
      if (err) return res.status(500).send(err);

      return res
        .status(200)
        .json({ notifications: data[0].notifications, public: data[0].public });
    });
  });
};

export const postPrivatyAndLoginPublicNotifications = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    const qNotifications =
      "UPDATE `users` SET `notifications` = ? WHERE `id` = ?";
    const qPublic = "UPDATE `users` SET `public` = ? WHERE `id` = ?";

    const q =
      req.body.public !== undefined
        ? qPublic
        : req.body.notifications !== undefined
        ? qNotifications
        : "";

    const data =
      req.body.public !== undefined
        ? req.body.public
        : req.body.notifications !== undefined
        ? req.body.notifications
        : "";
    console.log(data);
    db.query(q, [data, userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

// * LEARNING SETTINGS PART
export const getLearningDifficult = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    const q = "SELECT `learning_difficult` FROM `users` WHERE `id` = ?";

    db.query(q, userInfo.id, (err, data) => {
      if (err) return res.status(500).send(err);

      return res
        .status(200)
        .json({ learningDifficult: data[0].learning_difficult });
    });
  });
};

export const postLearningDifficult = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    const q = "UPDATE `users` SET `learning_difficult` = ? WHERE `id` = ?";

    db.query(q, [req.body.learningDifficult, userInfo.id], (err, data) => {
      if (err) return res.status(500).json("Something went wrong...");

      return res.status(200).json(data);
    });
  });
};

// * Premium access logic
// export const postPremiumAccess = (req, res) => {
//   checkToken(req, res, async (userInfo) => {
//     let date = new Date();
//     let premium = 0;
//     const premiumType = req.body.premiumType;

//     if (premiumType === "Trial") {
//       date.setDate(date.getDate() + 14);
//       premium = 1;
//     }
//     if (premiumType === "Advanced") {
//       date.setFullYear(date.getFullYear() + 1);
//       premium = 1;
//     }
//     if (premiumType === "Complete") {
//       date.setFullYear(date.getFullYear() + 1);
//       premium = 2;
//     }

//     let premiumExpiry = date.toISOString();
//     premiumExpiry =
//       premiumExpiry.split("T")[0] +
//       " " +
//       premiumExpiry.split("T")[1].slice(0, 8);

//     const q =
//       "UPDATE `users` SET `premium` = ?, `premium_expiry` = ? WHERE `id` = ?";
//     console.log(premium, premiumExpiry, userInfo.id);
//     db.query(q, [premium, premiumExpiry, userInfo.id], (err, data) => {
//       if (err) return res.status(500).json("Something went wrong...");

//       return res.status(200).json("Transaction successful");
//     });
//   });
// };
