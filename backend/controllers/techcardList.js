import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import { checkToken } from "./checkToken.js";

export const getTechcardList = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const qList =
      "SELECT * FROM lists WHERE id = '" +
      req.query.id +
      "'; SELECT first_sides_flag, second_sides_flag FROM folders WHERE folder = '" +
      req.query.folder +
      "'; ";
    db.query(qList, (err, listsData) => {
      if (err) return res.status(500).send(err);

      const qTechcards =
        "SELECT * FROM techcards WHERE list_uid = '" + listsData[0][0].id + "'";
      db.query(qTechcards, (err, techcardsData) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({
          techcardsData,
          folderID: listsData[0][0].folder_uid,
          listImage: listsData[0][0].image,
          firstSidesFlag: listsData[1][0].first_sides_flag,
          secondSidesFlag: listsData[1][0].second_sides_flag,
        });
      });
    });
  });
};

// * uploading image
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const UPLOAD_PATH = path.join(__dirname, ".././uploads");
import fs from "fs";
import { unlink } from "fs/promises";

export const uploadImage = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    if (req.file) {
      const { file } = req;
      const fileName = `techcard-image-${Date.now()}.${file.originalname}`;
      const imagePath = UPLOAD_PATH + `/${fileName}`;
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
        folderID,
        id,
        techcardsToAdd,
        techcardsToUpdate,
        techcardsToDelete,
      } = req.body;
      const deleteImageFunction = async (path) => {
        try {
          await unlink(path);
        } catch (error) {
          console.error("there was an error:", error.message);
        }
      };

      let q = "";

      // * ADD CASE
      if (techcardsToAdd) {
        const { firstSide, secondSide, image } = techcardsToAdd;

        if (image) {
          const imageToDB = image;
          q =
            "INSERT INTO `techcards` (`first_side`, `second_side`, `image`, `list_uid`, `folder_uid`, `user_uid`) VALUES ('" +
            firstSide +
            "', '" +
            secondSide +
            "', '" +
            imageToDB +
            "', '" +
            id +
            "', '" +
            folderID +
            "', '" +
            userInfo.id +
            "');";
        } else {
          q =
            "INSERT INTO `techcards` (`first_side`, `second_side`, `list_uid`, `folder_uid`, `user_uid`) VALUES ('" +
            firstSide +
            "', '" +
            secondSide +
            "', '" +
            id +
            "', '" +
            folderID +
            "', '" +
            userInfo.id +
            "');";
        }
      }

      // * UPDATE CASE
      if (techcardsToUpdate) {
        const {
          firstSide,
          secondSide,
          image,
          deleteImage,
          oldImage,
          techcardID,
        } = techcardsToUpdate;

        if (oldImage) {
          deleteImageFunction(
            `${UPLOAD_PATH}/${oldImage.replace(
              `${process.env.REACT_APP_URL}/`,
              ""
            )}`
          );
        }
        if (image) {
          let imageToDB = image;
          if (image.startsWith("image-"))
            imageToDB = `${process.env.REACT_APP_URL}/${image}`;

          q =
            "UPDATE `techcards` SET `first_side` = '" +
            firstSide +
            "', `second_side` = '" +
            secondSide +
            "', `image` = '" +
            imageToDB +
            "' WHERE (`id` = '" +
            techcardID +
            "');";
        } else if (!deleteImage) {
          q =
            "UPDATE `techcards` SET `first_side` = '" +
            firstSide +
            "', `second_side` = '" +
            secondSide +
            "' WHERE (`id` = '" +
            techcardID +
            "');";
        } else {
          if (oldImage) {
            deleteImageFunction(
              `${UPLOAD_PATH}/${oldImage.replace(
                `${process.env.REACT_APP_URL}/`,
                ""
              )}`
            );
          }
          q =
            "UPDATE `techcards` SET `image` = NULL WHERE (`id` = '" +
            techcardID +
            "');";
        }
      }

      // * DELETE CASE
      if (techcardsToDelete) {
        const { techcardsIDS, images } = techcardsToDelete;

        for (const techcardID of techcardsIDS) {
          q += "DELETE FROM `techcards` WHERE (`id` = '" + techcardID + "');";
        }

        for (const image of images) {
          if (image) {
            deleteImageFunction(
              `${UPLOAD_PATH}/${image.replace(
                `${process.env.REACT_APP_URL}/`,
                ""
              )}`
            );
          }
        }
      }
      db.query(q, (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
      });
    }
  });
};

////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////// *
////////////////////////////////////////////////////////////////////////////

export const uploadListImage = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    if (req.file) {
      const { file } = req;
      const fileName = `list-image-${Date.now()}.${file.originalname}`;
      const imagePath = UPLOAD_PATH + `/${fileName}`;
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

      const { image, id, oldImage, deleteType, setType } = req.body;

      const deleteImageFunction = async (path) => {
        try {
          await unlink(path);
        } catch (error) {
          console.error("there was an error:", error.message);
        }
      };

      let q = "";

      // * UPDATE CASE
      if (setType) {
        if (oldImage) {
          deleteImageFunction(
            `${UPLOAD_PATH}/${oldImage.replace(
              `${process.env.REACT_APP_URL}/`,
              ""
            )}`
          );
        }

        if (image) {
          const imageToDB = image;

          q =
            "UPDATE `lists` SET `image` = '" +
            imageToDB +
            "' WHERE (`id` = '" +
            id +
            "');";
        } else {
          if (oldImage) {
            deleteImageFunction(
              `${UPLOAD_PATH}/${oldImage.replace(
                `${process.env.REACT_APP_URL}/`,
                ""
              )}`
            );
          }
          q = "UPDATE `lists` SET `image` = NULL WHERE (`id` = '" + id + "');";
        }
      }

      // * DELETE CASE
      if (deleteType) {
        q = "UPDATE `lists` SET `image` = NULL WHERE (`id` = '" + id + "');";

        deleteImageFunction(
          `${UPLOAD_PATH}/${oldImage.replace(
            `${process.env.REACT_APP_URL}/`,
            ""
          )}`
        );
      }

      db.query(q, (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
      });
    }
  });
};
