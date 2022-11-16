import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export const getTechcards = (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM users_techcards WHERE uid = ?";
    console.log(userInfo.id);
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

export const addTechcards = (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const listToAdd = req.body.list;
    const folderToAdd = req.body.folder;
    // * ADD LIST
    if (listToAdd) {
      let allAddQueries = "";

      listToAdd.forEach((list, i) => {
        allAddQueries +=
          "INSERT INTO `users_techcards` (`folder`, `list`, `uid`) VALUES ('" +
          list[0] +
          "', '" +
          list[1] +
          "', '" +
          userInfo.id +
          "');";
      });

      db.query(allAddQueries, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("All lists have been successfully added");
      });
    }

    // * ADD FOLDER
    if (folderToAdd && !listToAdd) {
      console.log(folderToAdd);
      const addFolderQuery =
        "INSERT INTO `users_techcards` (`folder`, `uid`) VALUES ('" +
        folderToAdd +
        "', '" +
        userInfo.id +
        "');";

      db.query(addFolderQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Folder has been successfully added");
      });
    }
  });
};

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export const deleteTechcards = (req, res) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const listToAdd = req.body.list;
    const folderToAdd = req.body.folder;

    if (listToAdd || folderToAdd) {
      let allElementsToDelete = "";

      listToAdd?.forEach((list, i) => {
        allElementsToDelete +=
          "DELETE FROM `users_techcards` WHERE (`folder` = '" +
          list[0] +
          "') AND (`list` = '" +
          list[1] +
          "') AND (`uid` = '" +
          userInfo.id +
          "');";
      });
      folderToAdd?.forEach((folder, i) => {
        allElementsToDelete +=
          "DELETE FROM `users_techcards` WHERE (`folder` = '" +
          folder +
          "') AND (`uid` = '" +
          userInfo.id +
          "');";
      });
      db.query(allElementsToDelete, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("All elements have been successfully deleted");
      });
    }
  });
};

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export const updateTechcards = (req, res) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const listToChange = req.body.list;
    const folderToChange = req.body.folder;

    if (listToChange || folderToChange) {
      let allElementsToChange = "";

      listToChange?.forEach((list, i) => {
        console.log(list[0], list[1], list[2]);
        allElementsToChange +=
          "UPDATE `users_techcards` SET `list` = '" +
          list[2] +
          "' WHERE (`folder` = '" +
          list[0] +
          "') AND (`list` = '" +
          list[1] +
          "');";
      });
      folderToChange?.forEach((folder, i) => {
        console.log(folder[1]);
        allElementsToChange +=
          "UPDATE `users_techcards` SET `folder` = '" +
          folder[1] +
          "' WHERE (`folder` = '" +
          folder[0] +
          "');";
      });
      db.query(allElementsToChange, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("All elements have been successfully changed");
      });

      console.log(allElementsToChange);
    }
  });
};
