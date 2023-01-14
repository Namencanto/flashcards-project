import classes from "./Courses.module.scss";
import classNames from "classnames/bind";

import CoursesContent from "./CoursesContent";

import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

import MediaQueries from "../../../HelperComponents/MediaQueries";
import UserMobileCard from "../UserMainPage/UserMobileCard/UserMobileCard";
import axios from "axios";
import { useEffect, useState } from "react";

function Courses() {
  const cx = classNames.bind(classes);
  const { minWidth1000 } = MediaQueries();

  const [courseFolders, setCourseFolders] = useState([]);
  const [courseLists, setCourseLists] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsFetched(false);
      try {
        const res = await axios.get("/courses/");
        const { folders, lists } = res.data;

        setCourseFolders(folders);
        setCourseLists(lists);
      } catch (e) {
        console.log(e);
        setIsFetched(true);
      }
      setIsFetched(true);
    };
    fetchCourses();
  }, []);

  const props = { isFetched, courseFolders, courseLists };
  return (
    <div className={classNames(cx("courses"))}>
      {minWidth1000 ? (
        <UserMobileCard icon={faRankingStar}>
          {<CoursesContent {...props} />}
        </UserMobileCard>
      ) : (
        <CoursesContent {...props} />
      )}
    </div>
  );
}

export default Courses;
