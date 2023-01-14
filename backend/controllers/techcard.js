import { db } from "../config/db.js";
import { checkToken } from "./checkToken.js";

export const getTechcards = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const qFolders = "SELECT * FROM folders WHERE user_uid = ?";
    db.query(qFolders, [userInfo.id], (err, foldersData) => {
      if (err) return res.status(500).send(err);

      let qLists = "";
      let listsDataToMySql = [];
      for (const { id } of foldersData) {
        listsDataToMySql.push(id);
        qLists += "SELECT * FROM lists WHERE folder_uid = ?;";
      }

      db.query(qLists, listsDataToMySql, (err, listsData) => {
        if (err) return res.status(500).send(err);

        if (listsData.length > 0) {
          let qTechcards = "";
          let techcardsDataToMySql = [];

          if (foldersData.length === 1) listsData = [listsData];
          for (let i = 0; i < listsData.length; i++) {
            for (const listData of listsData[i]) {
              techcardsDataToMySql.push(listData.id);
              qTechcards += "SELECT * FROM techcards WHERE list_uid = ?;";
            }
          }

          db.query(qTechcards, techcardsDataToMySql, (err, techcardsData) => {
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

import { courseNameValidation } from "./server-validations/inputsValidation.js";
export const addTechcards = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const listToAdd = req.body.list;

    // Check that the list name is not the course name
    if (listToAdd) {
      for (const list of listToAdd) {
        if (courseNameValidation(list[1])) {
          return res
            .status(400)
            .json(
              "The list name you entered is prohibited. Please enter different name"
            );
        }
      }
    }

    const folderToAdd = req.body.folder;
    // Check that the folder name is not the course name
    if (folderToAdd) {
      if (courseNameValidation(folderToAdd)) {
        return res
          .status(400)
          .json(
            "The folder name you entered is prohibited. Please enter different name"
          );
      }
    }

    const { firstSidesFlag, secondSidesFlag } = req.body;

    // * ADD LIST
    if (listToAdd) {
      let listToAddData = [];
      let allAddQueries = "";

      listToAdd.forEach((list, i) => {
        listToAddData.push(list[1], list[0], userInfo.id);
        allAddQueries +=
          "INSERT INTO `lists` (`list`, `folder_uid`, user_uid) VALUES (?,?,?);";
      });

      db.query(allAddQueries, listToAddData, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("All lists have been successfully added");
      });
    }
    // * ADD FOLDER
    if (folderToAdd && !listToAdd) {
      const addFolderQuery =
        "INSERT INTO `folders` (`folder`, `first_sides_flag`, `second_sides_flag`, `user_uid`) VALUES (?,?,?,?);";

      db.query(
        addFolderQuery,
        [folderToAdd, firstSidesFlag, secondSidesFlag, userInfo.id],
        (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("Folder has been successfully added");
        }
      );
    }
  });
};

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export const deleteTechcards = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const listToDelete = req.body.list;
    const folderToDelete = req.body.folder;

    let dataToMySql = [];

    if (listToDelete || folderToDelete) {
      let allElementsToDelete = "";

      listToDelete?.forEach((listID, i) => {
        dataToMySql.push(listID, userInfo.id, listID, userInfo.id);

        allElementsToDelete +=
          "DELETE FROM `lists` WHERE (`id` = ?) AND (`user_uid` = ?);";
        allElementsToDelete +=
          "DELETE FROM `techcards` WHERE (`list_uid` = ?) AND (`user_uid` = ?);";
      });
      folderToDelete?.forEach((folderID, i) => {
        dataToMySql.push(
          folderID,
          userInfo.id,
          folderID,
          userInfo.id,
          folderID,
          userInfo.id
        );
        allElementsToDelete +=
          "DELETE FROM `folders` WHERE (`id` = ?) AND (`user_uid` = ?);";
        allElementsToDelete +=
          "DELETE FROM `lists` WHERE (`folder_uid` = ?) AND (`user_uid` = ?);";
        allElementsToDelete +=
          "DELETE FROM `techcards` WHERE (`folder_uid` = ?) AND (`user_uid` = ?);";
      });
      db.query(allElementsToDelete, dataToMySql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("All elements have been successfully deleted");
      });
    }
  });
};

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export const updateTechcards = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const listToChange = req.body.list;
    // Check that the list name is not the course name
    if (listToChange) {
      for (const list of listToChange) {
        if (courseNameValidation(list[1])) {
          return res
            .status(400)
            .json(
              "The list name you entered is prohibited. Please enter different name"
            );
        }
      }
    }

    const folderToChange = req.body.folder;
    // Check that the folder name is not the course name
    if (folderToChange) {
      for (const folder of folderToChange) {
        if (courseNameValidation(folder[1])) {
          return res
            .status(400)
            .json(
              "The folder name you entered is prohibited. Please enter different name"
            );
        }
      }
    }
    const { firstSidesFlag, secondSidesFlag } = req.body;

    if (listToChange || folderToChange) {
      let allElementsToChange = "";
      let dataToMySql = [];

      listToChange?.forEach((list, i) => {
        const listID = list[0];
        const listNameToChange = list[1];

        dataToMySql.push(listNameToChange, listID, userInfo.id);

        allElementsToChange +=
          "UPDATE `lists` SET `list` = ? WHERE (`id` = ? AND user_uid = ?);";
      });

      folderToChange?.forEach((folder, i) => {
        const folderID = folder[0];
        const folderNameToChange = folder[1];

        dataToMySql.push(
          folderNameToChange,
          firstSidesFlag[i],
          secondSidesFlag[i],
          folderID,
          userInfo.id
        );

        allElementsToChange +=
          "UPDATE `folders` SET `folder` = ?, first_sides_flag = ?, second_sides_flag = ? WHERE (`id` = ? AND user_uid = ?);";
      });

      db.query(allElementsToChange, dataToMySql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("All elements have been successfully changed");
      });
    }
  });
};
