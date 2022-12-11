import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export const getMainStats = (req, res) => {
  const qFolders = "SELECT * FROM folders WHERE uid = '" + "4" + "'";

  db.query(qFolders, (err, foldersData) => {
    if (err) return res.status(500).send(err);
    let qLists = "";
    for (const { id } of foldersData) {
      qLists += "SELECT * FROM lists WHERE uid = '" + id + "';";
    }

    db.query(qLists, (err, listsData) => {
      if (err) return res.status(500).send(err);

      if (listsData.length > 0) {
        let qTechcards = "";
        if (foldersData.length === 1) listsData = [listsData];
        for (let i = 0; i < listsData.length; i++) {
          for (const listData of listsData[i]) {
            qTechcards +=
              "SELECT * FROM techcards WHERE uid = '" + listData.id + "';";
          }
        }

        db.query(qTechcards, (err, techcardsData) => {
          if (err) return res.status(500).send(err);

          return res.status(200).json([foldersData, listsData, techcardsData]);
        });
      } else return res.status(200).json([foldersData, listsData]);
    });
  });
};
export const getUserStats = (req, res) => {
  const qFolders = "SELECT * FROM folders WHERE uid = '" + "4" + "'";

  db.query(qFolders, (err, foldersData) => {
    if (err) return res.status(500).send(err);
    let qLists = "";
    for (const { id } of foldersData) {
      qLists += "SELECT * FROM lists WHERE uid = '" + id + "';";
    }

    db.query(qLists, (err, listsData) => {
      if (err) return res.status(500).send(err);

      if (listsData.length > 0) {
        let qTechcards = "";
        if (foldersData.length === 1) listsData = [listsData];
        for (let i = 0; i < listsData.length; i++) {
          for (const listData of listsData[i]) {
            qTechcards +=
              "SELECT * FROM techcards WHERE uid = '" + listData.id + "';";
          }
        }

        db.query(qTechcards, (err, techcardsData) => {
          if (err) return res.status(500).send(err);

          return res.status(200).json([foldersData, listsData, techcardsData]);
        });
      } else return res.status(200).json([foldersData, listsData]);
    });
  });
};
export const getFolderOrListStats = (req, res) => {
  console.log("el;o");
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { id, folder, list } = req.query;

    let type = "";
    if (folder === "true") type = "folders_statistics";
    if (list === "true") type = "lists_statistics";

    const q =
      "SELECT `date`, `wrong_answers`, `right_answers` FROM " +
      type +
      " WHERE (`user_uid` = '" +
      userInfo.id +
      "') AND (`folder_uid` = '" +
      id +
      "') ";

    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

export const addMainStats = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const { id, round, type } = req.body;

    const changeStatusQuery =
      "UPDATE `techcards` SET `status` = '" +
      statusToChange +
      "', `when_the_status_can_be_changed` = '" +
      tomorrow +
      "' WHERE (`id` = " +
      id +
      ")";
    db.query(changeStatusQuery, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};
export const addUserStats = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const { id, round, type } = req.body;

    const changeStatusQuery =
      "UPDATE `techcards` SET `status` = '" +
      statusToChange +
      "', `when_the_status_can_be_changed` = '" +
      tomorrow +
      "' WHERE (`id` = " +
      id +
      ");";
    db.query(changeStatusQuery, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};
export const addFolderStats = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const { id, round, type } = req.body;

    const changeStatusQuery =
      "UPDATE `techcards` SET `status` = '" +
      statusToChange +
      "', `when_the_status_can_be_changed` = '" +
      tomorrow +
      "' WHERE (`id` = " +
      id +
      ");";
    db.query(changeStatusQuery, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};
