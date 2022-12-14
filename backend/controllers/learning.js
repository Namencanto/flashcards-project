import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import { checkToken } from "./checkToken.js";

export const changeTechcardStatus = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    const { id, round, type } = req.body;

    const searchQuery =
      "SELECT status, when_the_status_can_be_changed FROM techcards WHERE id = '" +
      id +
      "'";
    const today = new Date();
    const month = today.toISOString().split("T")[0].slice(0, -3);

    // * USER ADD SCORE LOGIC PART
    // USER GAIN SCORES ONLY IF THEY CHANGED THEIR TECHCARD STATUS TO LEARNED
    const addMonthScore =
      "INSERT INTO `users_monthly_statistics` (user_uid, month) SELECT " +
      userInfo.id +
      ", '" +
      month +
      "' WHERE NOT EXISTS (SELECT 1 FROM `users_monthly_statistics` WHERE user_uid = " +
      userInfo.id +
      " AND month = '" +
      month +
      "'); UPDATE `users_monthly_statistics` SET month_score = month_score + 1 WHERE user_uid = " +
      userInfo.id +
      " AND month = '" +
      month +
      "'; ";

    //learned: 0, knowed: 1 - 4 NEW : 5 | TO LEARN : 6-8 | hard 9-10
    // If learned, cannot change to any else
    // if one mistake in knowed set to to learn 6
    // Status be able to change only one time of day,
    db.query(searchQuery, (err, statusData) => {
      if (err) return res.status(500).json(err);

      const status = statusData[0].status;
      const whenTheStatusCanBeChanged =
        statusData[0].when_the_status_can_be_changed;

      function isInThePast(date) {
        return date < today;
      }

      let statusToChange;
      if (status === 0 || !isInThePast(whenTheStatusCanBeChanged))
        return res.json();

      if (type === "KNOWED") {
        if (status - 1 === 5) statusToChange = 4;
        else statusToChange = status - 1;
      }

      if (type === "UNKNOWED") {
        if (
          status + 1 === 2 ||
          status + 1 === 4 ||
          status + 1 === 4 ||
          status + 1 === 5
        )
          statusToChange = 6;
        if (status === 10) return res.json();
        else statusToChange = status + 1;
      }

      let tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      tomorrow = tomorrow.toISOString().slice(0, 10).replace("T", " ");

      let changeStatusQuery =
        "UPDATE `techcards` SET `status` = '" +
        statusToChange +
        "', `when_the_status_can_be_changed` = '" +
        tomorrow +
        "' WHERE (`id` = " +
        id +
        "); ";

      if (statusToChange === 0) {
        changeStatusQuery = changeStatusQuery + addMonthScore;
      }
      db.query(changeStatusQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
      });
    });
  });
};
