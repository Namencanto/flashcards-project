import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export const getTechcards = (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) return res.status(401).json("Not authenticated!");

  const decoded = jwt_decode(token);

  const q = "SELECT * FROM users_techcards WHERE uid = ?";

  db.query(q, [22], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};
