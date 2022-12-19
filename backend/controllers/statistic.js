import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

function checkToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    next(userInfo);
  });
}

export const getUserStats = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const qLearned =
      "SELECT status FROM `techcards` WHERE user_uid = " +
      userInfo.id +
      " AND status = 0;";
    const qJoinedDate =
      " SELECT joined_date FROM `users` WHERE id = " + userInfo.id + ";";
    const qCountFolders =
      " SELECT COUNT(*) FROM `folders` WHERE user_uid = " + userInfo.id + ";";
    const qCountLists =
      " SELECT COUNT(*) FROM `lists` WHERE user_uid = " + userInfo.id + ";";
    const qCountTechcards =
      " SELECT COUNT(*) FROM `techcards` WHERE user_uid = " + userInfo.id + ";";
    const qCountRanking =
      "SELECT COUNT(*) as 'rank' FROM users_monthly_statistics WHERE month_score > (SELECT month_score FROM users_monthly_statistics WHERE user_uid = " +
      userInfo.id +
      ");";
    const qAllActivity =
      "SELECT date, wrong_answers, right_answers, time_spent FROM `folders_statistics` WHERE user_uid = " +
      userInfo.id +
      ";";
    const qAllStatuses =
      "SELECT GROUP_CONCAT(status SEPARATOR ',') as statuses FROM techcards WHERE user_uid = " +
      userInfo.id +
      ";";

    const finalQ =
      qLearned +
      qJoinedDate +
      qCountFolders +
      qCountLists +
      qCountTechcards +
      qCountRanking +
      qAllActivity +
      qAllStatuses;

    db.query(finalQ, (err, data) => {
      console.log(data[7][0].statuses);
      if (err) return res.status(500).send(err);
      return res.status(200).json([
        {
          learnedNumber: data[0].length,
          joinedDate: data[1][0].joined_date,
          timeSpent: 1000,
          rankingPlace: data[5][0]["rank"] + 1,
          createdFolders: data[2][0]["COUNT(*)"],
          createdLists: data[3][0]["COUNT(*)"],
          createdTechcards: data[4][0]["COUNT(*)"],
        },
        {
          allActivity: data[6],
          allStatuses: JSON.parse(`[${data[7][0].statuses}]`),
        },
      ]);
    });
  });
};
export const getFolderOrListStats = (req, res) => {
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
      "SELECT `date`, `wrong_answers`, `right_answers`, `time_spent` FROM " +
      type +
      " WHERE `user_uid` = '" +
      userInfo.id +
      "' AND  " +
      whereSelect +
      " = '" +
      id +
      "' ";

    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};
export const getUserStrike = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "SELECT `date` FROM folders_statistics WHERE `user_uid` = '" +
      userInfo.id +
      "'";

    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
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

export const addFolderOrListStats = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const { id, folder, list, right, wrong, time } = req.body;

    const today = new Date();
    const todayShort = today.toISOString().replace(/T/, " ").slice(0, -14);

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
      const updateTime = "`time_spent` = '" + time + "'";
      const updateType = right
        ? "`right_answers` = '" + newRightAnswers + "', " + updateTime + ""
        : wrong
        ? "`wrong_answers` = '" + newWrongAnswers + "', " + updateTime + ""
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

      db.query(setQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
      });
    });
  });
};
