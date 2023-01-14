import classes from "./Courses.module.scss";
import classNames from "classnames/bind";
import CoursesList from "./CoursesList";
import { useState } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

function CoursesContent({ isFetched, courseFolders, courseLists }) {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("courses-content"))}>
      <h1>Our Courses</h1>
      {isFetched ? (
        <CoursesList courseFolders={courseFolders} courseLists={courseLists} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default CoursesContent;
