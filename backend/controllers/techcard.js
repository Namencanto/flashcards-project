import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export const getTechcards = (req, res) => {
  const qFolders = "SELECT * FROM folders WHERE uid = '" + "4" + "'";

  db.query(qFolders, (err, foldersData) => {
    if (err) return res.status(500).send(err);
    // console.log(foldersData);
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
          "INSERT INTO `lists` (`list`, `uid`) VALUES ('" +
          list[1] +
          "', '" +
          list[0] +
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
        "INSERT INTO `folders` (`folder`, `uid`) VALUES ('" +
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

    const listToDelete = req.body.list;
    const folderToDelete = req.body.folder;

    if (listToDelete || folderToDelete) {
      let allElementsToDelete = "";

      listToDelete?.forEach((listID, i) => {
        allElementsToDelete +=
          "DELETE FROM `lists` WHERE (`id` = '" + listID + "');";
        allElementsToDelete +=
          "DELETE FROM `techcards` WHERE (`uid` = '" + listID + "');";
      });
      folderToDelete?.forEach((folderID, i) => {
        allElementsToDelete +=
          "DELETE FROM `folders` WHERE (`id` = '" +
          folderID +
          "') AND (`uid` = '" +
          userInfo.id +
          "');";
        allElementsToDelete +=
          "DELETE FROM `lists` WHERE (`id` = '" + folderID + "');";
        allElementsToDelete +=
          "DELETE FROM `techcards` WHERE (`folder_uid` = '" + folderID + "');";
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
        const listID = list[0];
        const listNameToChange = list[1];
        allElementsToChange +=
          "UPDATE `lists` SET `list` = '" +
          listNameToChange +
          "' WHERE (`id` = '" +
          listID +
          "');";
      });
      folderToChange?.forEach((folder, i) => {
        const folderID = folder[0];
        const folderNameToChange = folder[1];
        allElementsToChange +=
          "UPDATE `folders` SET `folder` = '" +
          folderNameToChange +
          "' WHERE (`id` = '" +
          folderID +
          "');";
      });
      db.query(allElementsToChange, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("All elements have been successfully changed");
      });
    }
  });
};
