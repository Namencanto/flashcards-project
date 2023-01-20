import { db } from "../config/db.js";
import { checkToken } from "./checkToken.js";

export const getUserStats = (req, res) => {
  checkToken(req, res, ({ id }) => {
    const qLearned =
      "SELECT status FROM `techcards` WHERE user_uid = ? AND status = 0;";
    const qJoinedDate = " SELECT joined_date FROM `users` WHERE id = ?;";
    const qCountFolders = " SELECT COUNT(*) FROM `folders` WHERE user_uid = ?;";
    const qCountLists = " SELECT COUNT(*) FROM `lists` WHERE user_uid = ?;";
    const qCountTechcards =
      " SELECT COUNT(*) FROM `techcards` WHERE user_uid = ?;";
    const qCountRanking =
      "SELECT COUNT(*) + 2 as 'rank' FROM users_monthly_statistics WHERE month = DATE_FORMAT(CURDATE(), '%Y-%m') AND month_score > (SELECT month_score FROM users_monthly_statistics WHERE user_uid = ? AND month = DATE_FORMAT(CURDATE(), '%Y-%m'));";
    const qCountRanking2 =
      "SELECT COUNT(*) as 'rank' FROM users_monthly_statistics WHERE month_score > (SELECT month_score FROM users_monthly_statistics WHERE user_uid = ?);";
    const qAllActivity =
      "SELECT date, wrong_answers, right_answers, time_spent FROM `folders_statistics` WHERE user_uid = ?;";
    const qGroupConcatMaxLen = "SET SESSION group_concat_max_len = 250000;";
    const qAllStatuses =
      "SELECT GROUP_CONCAT(status SEPARATOR ',') as statuses FROM techcards WHERE user_uid = ?;";

    const finalQ =
      qLearned +
      qJoinedDate +
      qCountFolders +
      qCountLists +
      qCountTechcards +
      qCountRanking +
      qAllActivity +
      qGroupConcatMaxLen +
      qAllStatuses;

    db.query(finalQ, [id, id, id, id, id, id, id, id], (err, data) => {
      if (err) return res.status(500).send(err);
      let statusesArr = [];
      try {
        statusesArr = JSON.parse(`[${data[8][0].statuses}]`);
      } catch (err) {
        console.error(err);
      }

      return res.status(200).json([
        {
          learnedNumber: data[0].length,
          joinedDate: data[1][0].joined_date,
          timeSpent: 1000,
          rankingPlace: data[5][0]["rank"],
          createdFolders: data[2][0]["COUNT(*)"],
          createdLists: data[3][0]["COUNT(*)"],
          createdTechcards: data[4][0]["COUNT(*)"],
        },
        {
          allActivity: data[6],
          allStatuses: statusesArr,
        },
      ]);
    });
  });
};

export const getFolderOrListStats = (req, res) => {
  checkToken(req, res, (userInfo) => {
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

    const q =
      "SELECT `date`, `wrong_answers`, `right_answers`, `time_spent` FROM " +
      type +
      " WHERE `user_uid` = ? AND  " +
      whereSelect +
      " = ?;";

    db.query(q, [userInfo.id, id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

export const getUserStrike = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const q = "SELECT `date` FROM folders_statistics WHERE `user_uid` = ?;";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

export const addFolderOrListStats = (req, res) => {
  checkToken(req, res, (userInfo) => {
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
      "` = ?;";

    db.query(checkIfDateExistQuery, [id], (err, dateData) => {
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
        ", user_uid = ? " +
        whereToUpdate +
        "";
      console.log("setQuery");
      console.log(setQuery);
      db.query(setQuery, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
      });
    });
  });
};
