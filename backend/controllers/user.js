import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

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
          "SELECT `nick` FROM `users` WHERE id = " + data.user_uid + ";";
      }

      console.log(qSecond);
      db.query(qSecond, (err, dataSecond) => {
        if (err) return res.status(500).json(err);

        return res.json({ dataFirst, dataSecond });
      });
    });
  });
};
