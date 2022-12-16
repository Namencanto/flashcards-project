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

    let whereSelect = "";
    let type = "";
    if (folder === "true") {
      type = "folders_statistics";
      whereSelect = "`folder_uid`";
    }
    if (list === "true") {
      type = "lists_statistics";
      whereSelect = "`list_uid`";
    }
    console.log(list);
    const q =
      "SELECT `date`, `wrong_answers`, `right_answers` FROM " +
      type +
      " WHERE `user_uid` = '" +
      userInfo.id +
      "' AND  " +
      whereSelect +
      " = '" +
      id +
      "' ";
    console.log(q);
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
    const { id, folder, list, right, wrong } = req.body;

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
export const addFolderOrListStats = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const { id, folder, list, right, wrong } = req.body;

    const today = new Date();
    const todayShort = today.toISOString().replace(/T/, " ").slice(0, -14);
    const todayLong = today.toISOString().replace(/T/, " ").slice(0, -5);
    console.log("today");
    console.log(todayShort);
    const type = folder
      ? "folders_statistics"
      : list
      ? "lists_statistics"
      : null;

    const typeUid = folder ? "folder_uid" : list ? "list_uid" : null;
    let selectWithTodayDate = "WHERE DATE(date) LIKE '" + todayShort + "%'";
    const checkIfDateExistQuery =
      "SELECT `date`, `wrong_answers`, `right_answers` FROM `" +
      type +
      "` " +
      selectWithTodayDate +
      " AND `" +
      typeUid +
      "` = " +
      id +
      ";";
    db.query(checkIfDateExistQuery, (err, dateData) => {
      if (err) return res.status(500).json(err);
      const dbTime = dateData[0]?.date
        .toISOString()
        .replace(/T/, " ")
        .slice(0, -14);

      const newRightAnswers = dbTime ? dateData[0].right_answers + 1 : 1;
      const newWrongAnswers = dbTime ? dateData[0].wrong_answers + 1 : 1;
      const updateOrSet = dbTime === todayShort ? "UPDATE" : "INSERT INTO";
      const updateType = right
        ? "`right_answers` = '" + newRightAnswers + "'"
        : wrong
        ? "`wrong_answers` = '" + newWrongAnswers + "'"
        : null;
      const setDateIsNew =
        dbTime !== todayShort ? " `date` = UTC_TIMESTAMP()," : "";

      const whereToSet = list
        ? " list_uid = '" + id + "'"
        : folder
        ? "folder_uid = '" + id + "'"
        : null;
      const whereToUpdate =
        dbTime === todayShort
          ? "" +
            selectWithTodayDate +
            " AND `user_uid` = " +
            userInfo.id +
            " AND " +
            whereToSet +
            ""
          : "";
      const setQuery =
        "" +
        updateOrSet +
        " `" +
        type +
        "` SET" +
        setDateIsNew +
        " " +
        whereToSet +
        ", " +
        updateType +
        ", user_uid = '" +
        userInfo.id +
        "' " +
        whereToUpdate +
        "";
      console.log(setQuery);
      db.query(setQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
      });
    });
  });
};
