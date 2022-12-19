import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export const getTechcards = (req, res) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const qFolders =
      "SELECT * FROM folders WHERE user_uid = '" + userInfo.id + "'";
    db.query(qFolders, (err, foldersData) => {
      if (err) return res.status(500).send(err);

      let qLists = "";
      for (const { id } of foldersData) {
        qLists += "SELECT * FROM lists WHERE folder_uid = '" + id + "';";
      }

      db.query(qLists, (err, listsData) => {
        if (err) return res.status(500).send(err);

        if (listsData.length > 0) {
          let qTechcards = "";
          if (foldersData.length === 1) listsData = [listsData];
          for (let i = 0; i < listsData.length; i++) {
            for (const listData of listsData[i]) {
              console.log(listData.id);
              qTechcards +=
                "SELECT * FROM techcards WHERE list_uid = '" +
                listData.id +
                "';";
            }
          }

          db.query(qTechcards, (err, techcardsData) => {
            if (err) return res.status(500).send(err);

            return res
              .status(200)
              .json([foldersData, listsData, techcardsData]);
          });
        } else return res.status(200).json([foldersData, listsData]);
      });
    });
  });
};

export const addTechcards = (req, res) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const listToAdd = req.body.list;
    const folderToAdd = req.body.folder;
    const { firstSidesFlag, secondSidesFlag } = req.body;
    // * ADD LIST
    if (listToAdd) {
      let allAddQueries = "";

      listToAdd.forEach((list, i) => {
        allAddQueries +=
          "INSERT INTO `lists` (`list`, `folder_uid`, user_uid) VALUES ('" +
          list[1] +
          "', '" +
          list[0] +
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
      const addFolderQuery =
        "INSERT INTO `folders` (`folder`, `first_sides_flag`, `second_sides_flag`, `user_uid`) VALUES ('" +
        folderToAdd +
        "', '" +
        firstSidesFlag +
        "', '" +
        secondSidesFlag +
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
          "DELETE FROM `lists` WHERE (`id` = '" +
          listID +
          "') AND (`user_uid` = '" +
          userInfo.id +
          "');";
        allElementsToDelete +=
          "DELETE FROM `techcards` WHERE (`list_uid` = '" +
          listID +
          "') AND (`user_uid` = '" +
          userInfo.id +
          "');";
      });
      folderToDelete?.forEach((folderID, i) => {
        allElementsToDelete +=
          "DELETE FROM `folders` WHERE (`id` = '" +
          folderID +
          "') AND (`user_uid` = '" +
          userInfo.id +
          "');";
        allElementsToDelete +=
          "DELETE FROM `lists` WHERE (`id` = '" +
          folderID +
          "') AND (`user_uid` = '" +
          userInfo.id +
          "');";
        allElementsToDelete +=
          "DELETE FROM `techcards` WHERE (`list_uid` = '" +
          folderID +
          "') AND (`user_uid` = '" +
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
    const { firstSidesFlag, secondSidesFlag } = req.body;

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
          "' AND user_uid = '" +
          userInfo.id +
          "');";
      });
      folderToChange?.forEach((folder, i) => {
        const folderID = folder[0];
        const folderNameToChange = folder[1];
        allElementsToChange +=
          "UPDATE `folders` SET `folder` = '" +
          folderNameToChange +
          "', first_sides_flag = '" +
          firstSidesFlag[i] +
          "', second_sides_flag = '" +
          secondSidesFlag[i] +
          "' WHERE (`id` = '" +
          folderID +
          "' AND user_uid = '" +
          userInfo.id +
          "');";
      });
      db.query(allElementsToChange, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("All elements have been successfully changed");
      });
    }
  });
};
