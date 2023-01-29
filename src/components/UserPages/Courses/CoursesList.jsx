import classes from "./Courses.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faDollar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import { useNavigate } from "react-router-dom";
function CoursesList({ courseFolders, courseLists }) {
  const cx = classNames.bind(classes);

  const navigate = useNavigate();

  const [userCourses, setUserCourses] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [userPremium, setUserPremium] = useState(false);
  const addCourseToUserAccount = async (
    courseFolder,
    courseList,
    courseFolderId,
    courseListId
  ) => {
    try {
      const res = await axios.post("/courses/", {
        courseFolder,
        courseList,
        courseFolderId,
        courseListId,
      });

      if (res.status === 200) {
        fetchUserCourses();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetchUserCourses = async () => {
    setIsFetched(false);
    try {
      const res = await axios.get("/courses/user");
      setUserCourses(res.data);
      const res2 = await axios.get("/premium/check-user");

      const currentDate = new Date();
      const expiryDate = new Date(res2.data);
      if (expiryDate.getTime() > currentDate.getTime()) {
        setUserPremium(true);
      }
    } catch (err) {
      console.log(err);
      setIsFetched(true);
    }
    setIsFetched(true);
  };
  useEffect(() => {
    fetchUserCourses();
  }, []);

  return (
    <>
      {isFetched ? (
        <div className={classNames(cx("courses-list"))}>
          {courseFolders.map((folder, iFolder) => {
            return (
              <div key={folder.id}>
                <h2>{folder.folder}</h2>
                <ul>
                  {courseLists[iFolder].map(
                    ({ id, list, folder_uid, premium, length }) => {
                      let listExist = false;
                      return folder_uid == folder.id ? (
                        <li key={id + folder_uid}>
                          <div
                            className={classNames(
                              cx("courses-list-description")
                            )}
                          >
                            {premium ? (
                              <FontAwesomeIcon
                                title="Only for premium users"
                                icon={faDollar}
                              />
                            ) : (
                              ""
                            )}
                            {" " + list + " "}
                          </div>
                          <div className={classNames(cx("courses-list-box"))}>
                            <span>{length}</span>
                            {userCourses.forEach((userList, i) => {
                              if (list === userList) {
                                listExist = true;
                              }
                            })}
                            {!listExist ? (
                              <FontAwesomeIcon
                                onClick={() => {
                                  if (userPremium || !premium) {
                                    addCourseToUserAccount(
                                      folder.folder,
                                      list,
                                      folder_uid,
                                      id
                                    );
                                  } else {
                                    navigate("/pricing");
                                  }
                                }}
                                icon={faPlus}
                                title="Add course to your account"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </li>
                      ) : (
                        ""
                      );
                    }
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default CoursesList;
