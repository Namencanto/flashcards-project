import { db } from "../config/db.js";
import { checkToken } from "./checkToken.js";

export const getCourses = (req, res) => {
  checkToken(req, res, () => {
    const qFolders = "SELECT `id`, `folder` FROM `course_folders`";
    db.query(qFolders, (err, foldersData) => {
      if (err) return res.status(500).send(err);

      let qLists = "";
      let listsDataToMySql = [];
      for (const { id } of foldersData) {
        listsDataToMySql.push(id);
        qLists +=
          "SELECT `id`, `folder_uid`, `list`, `premium` FROM course_lists WHERE folder_uid = ?;";
      }

      db.query(qLists, listsDataToMySql, (err, listsData) => {
        if (err) return res.status(500).send(err);

        let qTechcards = "";
        let techcardsDataToMySql = [];
        if (foldersData.length === 1) listsData = [listsData];
        for (let i = 0; i < listsData.length; i++) {
          for (const listData of listsData[i]) {
            techcardsDataToMySql.push(listData.id);
            qTechcards +=
              "SELECT COUNT(*) FROM course_techcards WHERE list_uid = ?;";
          }
        }

        db.query(qTechcards, techcardsDataToMySql, (err, techcardsData) => {
          if (err) return res.status(500).send(err);
          const foldersId = foldersData.map((item) => item.id);
          let lengths = techcardsData.map((arr) => {
            return arr[0]["COUNT(*)"];
          });
          for (let i = 0; i < listsData.length; i++) {
            listsData[i].map((obj, i) => {
              obj.length = lengths[0];
              lengths.shift();
            });
          }

          return res
            .status(200)
            .json({ foldersId, folders: foldersData, lists: listsData });
        });
      });
    });
  });
};

export const getUserCourses = (req, res) => {
  checkToken(req, res, (userInfo) => {
    try {
      const qCourseListsCheck = "SELECT `list` FROM `course_lists`";

      db.query(qCourseListsCheck, (err, listsData) => {
        let qUserCourseListsCheck = "";
        let userCourseListsCheckDataToMySql = [];
        for (const { list } of listsData) {
          userCourseListsCheckDataToMySql.push(list, userInfo.id);
          qUserCourseListsCheck +=
            "SELECT `list` FROM `lists` WHERE `list` = ? AND `user_uid` = ?;";
        }

        db.query(
          qUserCourseListsCheck,
          userCourseListsCheckDataToMySql,
          (err, userListsData) => {
            let userCourses = [];
            for (const userList of userListsData) {
              if (userList[0]?.list) {
                userCourses.push(userList[0]?.list);
              }
            }
            return res.status(200).send(userCourses);
          }
        );
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  });
};

export const addCourseToUser = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const { courseFolder, courseList, courseFolderId, courseListId } = req.body;

    const qCheckUserPremium =
      "SELECT `expiry` FROM `users_premium` WHERE `user_uid` = ? ORDER BY `date` DESC LIMIT 1;";
    const qCheckCourseFolder =
      "SELECT `id` FROM folders WHERE user_uid = ? AND folder = ?;";
    const qCheckCourseList =
      "SELECT `id` FROM lists WHERE user_uid = ? AND list = ?;";
    const qCheckListPremium =
      "SELECT `premium` FROM `course_lists` WHERE `list` = ?;";

    const qCreateCourseFolder =
      "INSERT INTO `folders` SET `folder` = ?, `user_uid` = ?, `first_sides_flag` = ?, `second_sides_flag` = ?;";
    const qCreateCourseList =
      "INSERT INTO `lists` SET `list` = ?, `user_uid` = ?, `folder_uid` = ?;";
    const qCopyCourseToUserAccount =
      "INSERT INTO techcards (user_uid, list_uid, folder_uid, first_side, second_side) SELECT ?,?,?, first_side, second_side FROM course_techcards WHERE list_uid = ?;";

    // * First Part
    let userCourseFolderId = "";
    let userCourseListId = "";
    const createCourseList = (id) => {
      db.query(
        qCreateCourseList,
        [courseList, userInfo.id, id],
        (err, data) => {
          if (err) return res.status(500).send(err);
          userCourseListId = data.insertId;
        }
      );
    };
    const copyToUserAccount = () => {
      // Check list is premium
      db.query(qCheckListPremium, [courseList], (err, listPremiumData) => {
        // If not, copy list to user account

        if (!listPremiumData[0].premium) {
          db.query(
            qCopyCourseToUserAccount,
            [userInfo.id, userCourseListId, userCourseFolderId, courseListId],
            (err) => {
              if (err) return res.status(500).send(err);
            }
          );
        }
        // If is, check user is premium
        if (listPremiumData[0].premium) {
          db.query(qCheckUserPremium, [userInfo.id], (err, userPremiumData) => {
            const currentDate = new Date();
            const expiryDate = new Date(userPremiumData[0]?.expiry);
            let premium = false;
            if (expiryDate.getTime() > currentDate.getTime()) {
              premium = true;
            }

            if (!premium) return res.status(403).send("This is premium stuffs");
            if (premium) {
              db.query(
                qCopyCourseToUserAccount,
                [
                  userInfo.id,
                  userCourseListId,
                  userCourseFolderId,
                  courseListId,
                ],
                (err) => {
                  if (err) return res.status(500).send(err);
                }
              );
            }
          });
        }
      });
    };

    // Check course folder exist
    db.query(
      qCheckCourseFolder,
      [userInfo.id, courseFolder],
      (err, folderSearchData) => {
        if (err) return res.status(500).send(err);

        // if not, create course folder and list
        if (folderSearchData.length === 0) {
          db.query(
            qCreateCourseFolder,
            [courseFolder, userInfo.id, "gb", "pl"],
            (err, insertFolderData) => {
              if (err) return res.status(500).send(err);

              userCourseFolderId = insertFolderData.insertId;
              createCourseList(userCourseFolderId);
              copyToUserAccount();
            }
          );
        } else {
          userCourseFolderId = folderSearchData[0].id;

          // if exist check course list exist
          db.query(
            qCheckCourseList,
            [userInfo.id, courseList],
            (err, listSearchData) => {
              if (err) return res.status(500).send(err);

              // if not, create course list
              if (listSearchData.length === 0) {
                createCourseList(userCourseFolderId);
                copyToUserAccount();
              }
              if (listSearchData.length > 0) {
                // * Second Part
                // userCourseListId = listSearchData[0].id;
                // copyToUserAccount();
                return res.status(409).send("Course exists!");
              }
            }
          );
        }
      }
    );
  });
};
