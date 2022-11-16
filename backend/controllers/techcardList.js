import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import multer from "multer";
import sharp from "sharp";
import router from "../routes/techcards.js";

export const getTechcardList = (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "SELECT * FROM users_techcards WHERE uid = '" +
      userInfo.id +
      "' AND folder = '" +
      req.query.folder +
      "' AND list = '" +
      req.query.list +
      "'";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

//////////////////////////////////
//////////////////////////////////
// * uploading image
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const UPLOAD_PATH = path.join(__dirname, ".././uploads");
import fs from "fs";

export const uploadImage = (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (req.file) {
      const { file } = req;
      const fileName = `/image-${Date.now()}.${file.originalname}`;
      const imagePath = UPLOAD_PATH + fileName;
      fs.access(UPLOAD_PATH, (err) => {
        if (err) console.log(err);
      });
      await sharp(file.buffer)
        .resize({
          fit: sharp.fit.contain,
          width: 400,
        })
        .jpeg({ quality: 50 })
        .toFile(imagePath);

      return res.status(200).json(fileName);
    } else {
      // * add new

      const {
        folder,
        list,
        imagePath,
        firstSidesToUpdate,
        secondSidesToUpdate,
      } = req.body;

      let q;

      q =
        "UPDATE `users_techcards` SET `techcard_image` = '" +
        imagePath +
        "', first_side = '" +
        firstSidesToUpdate +
        "', second_side = '" +
        secondSidesToUpdate +
        "' WHERE (`uid` = '" +
        userInfo.id +
        "') AND (`folder` = '" +
        folder +
        "') AND (`list` = '" +
        list +
        "');";

      // q =
      //   "UPDATE `users_techcards` SET `techcard_image` ='" +
      //   imagePath +
      //   "' WHERE (`uid` = '" +
      //   userInfo.id +
      //   "') AND (`folder` = '" +
      //   folder +
      //   "') AND (`list` = '" +
      //   list +
      //   "');";

      db.query(q, (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
      });
    }
  });
};
