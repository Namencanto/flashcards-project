import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export const changeTechcardStatus = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const { id, round, type } = req.body;

    const searchQuery = "SELECT status FROM techcards WHERE id = '" + id + "'";

    db.query(searchQuery, (err, statusData) => {
      if (err) return res.status(500).json(err);

      console.log("statusData");
      const status = statusData[0].status;
      let statusToChange;
      if (status === 0 || status === 10) return;

      if (type === "KNOWED") {
        if ((statusToChange = status - 1 === 5)) statusToChange = 4;
        else statusToChange = status - 1;
      }
      if (type === "UNKNOWED") {
        if ((statusToChange = status + 1 === 5)) statusToChange = 6;
        else statusToChange = status + 1;
      }

      const changeStatusQuery =
        "UPDATE `techcards` SET `status` = '" +
        statusToChange +
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
//todo: sound and this logic
//learned: 0, knowed: 1 - 4 NEW : 5 | TO LEARN : 6-8 | hard 9-10
// If learned cannot change to any else
// if one mistake in knowed set to to learn 6
