import { db } from "../config/db.js";
import jwt from "jsonwebtoken";

export const changeTechcardStatus = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const { id, round, type } = req.body;

    const searchQuery =
      "SELECT status, when_the_status_can_be_changed FROM techcards WHERE id = '" +
      id +
      "'";

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
        const today = new Date();
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
      const today = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      tomorrow = tomorrow.toISOString().slice(0, 10).replace("T", " ");

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
  });
};
