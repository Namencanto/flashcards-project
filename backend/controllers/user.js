import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { checkToken } from "./checkToken.js";
export const getInformation = (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) return res.status(401).json("Not authenticated!");

  const decoded = jwt_decode(token);
  console.log(token, decoded.id);
  const q = "SELECT * FROM user_description WHERE uid = ?";

  db.query(q, [decoded.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const addInformation = (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE `user_description` SET `about_me_info` = '" +
      req.body.aboutMeText +
      "' WHERE (`uid` = '" +
      userInfo.id +
      "')";
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

/**
 * * ADD LANGUAGES TO PROFILE INFORMATION
 */

export const addLanguage = (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (!req.body.change) {
      if (req.body.language.includes("/") || req.body.level.includes("/"))
        return res.status(403).json("'/' Character is not allowed");
    }

    // default query
    let query =
      "concat(languages,'" +
      req.body.language +
      "/'), `levels` = concat(levels,'" +
      req.body.level +
      "/')";

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

      query =
        "'" + req.body.language + "', `levels` = '" + req.body.level + "'";
    }

    const q =
      "UPDATE `user_description` SET `languages` = " +
      query +
      " WHERE (`uid` = '" +
      userInfo.id +
      "')";

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const getRanking = (req, res) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const today = new Date();
    const month = today.toISOString().split("T")[0].slice(0, -3);
    const qFirst =
      "SELECT `month_score`, `user_uid` FROM `users_monthly_statistics` WHERE month = '" +
      month +
      "' ORDER BY month_score DESC LIMIT 10;";

    db.query(qFirst, (err, dataFirst) => {
      console.log(dataFirst);
      if (err) return res.status(500).json(err);
      let qSecond = "";
      for (const data of dataFirst) {
        qSecond +=
          "SELECT `nick`, `avatar` FROM `users` WHERE id = " +
          data.user_uid +
          ";";
      }

      db.query(qSecond, (err, dataSecond) => {
        if (err) return res.status(500).json(err);

        return res.json({ dataFirst, dataSecond });
      });
    });
  });
};

///////////////////////////////////////////////////

import sharp from "sharp";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const UPLOAD_PATH = path.join(__dirname, ".././uploads");
import fs from "fs";
import { unlink } from "fs/promises";

export const postUserAvatar = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    //TODO: DELETE AVATARS
    const { previousAvatar } = req.headers;
    if (previousAvatar && previousAvatar.startsWith(`user-avatar-`)) {
      fs.unlink(previousAvatar, (error) => {
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
    const qAvatar =
      "UPDATE `users` SET avatar = '" +
      fileName +
      "' WHERE id = " +
      userInfo.id +
      ";";

    db.query(qAvatar, (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(fileName);
      return res.status(200).json(fileName);
    });
  });
};

export const getGeneralInformation = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    const q = "SELECT avatar, nick FROM users WHERE id = " + userInfo.id + "";

    db.query(q, (err, data) => {
      console.log(data);
      if (err) return res.status(500).send(err);

      return res
        .status(200)
        .json({ avatar: data[0].avatar, nick: data[0].nick });
    });
  });
};
