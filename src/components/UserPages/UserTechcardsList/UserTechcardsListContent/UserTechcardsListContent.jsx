import "../../../../assets/Global.scss";

import classes from ".././UserTechcardsList.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState } from "react";

import { useParams } from "react-router-dom";

function UserTechcardsListContent() {
  const cx = classNames.bind(classes);
  const { folder, list } = useParams();

  //todo write logic about fetching first and second sides of techcards and paste it below
  return (
    <div className={classNames(cx("techcards-list-container"))}>
      <div className={classNames(cx("techcards-list-title"))}>
        <h1>{list}</h1>
      </div>
    </div>
  );
}

export default UserTechcardsListContent;
