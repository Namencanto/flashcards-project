import "../../../../assets/Global.scss";

import classes from "../UserTechcards.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faArrowLeft,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { useRef } from "react";

function UserTechcardsContent() {
  const cx = classNames.bind(classes);
  const { currentUser } = useContext(AuthContext);

  const [techcards, setTechcards] = useState();
  const [techcardsFolders, setTechcardsFolders] = useState([]);
  const [techcardsChangeIcon, setTechcardsChangeIcon] = useState(faGear);
  const [changeTechcardsIsVisible, setTechcardsIsVisible] = useState(false);

  // * Handling the form states
  const [addFormIsSelected, setAddFormIsSelected] = useState(false);
  const [changeFormIsSelected, setChangeFormIsSelected] = useState(false);
  const [deleteFormIsSelected, setDeleteFormIsSelected] = useState(false);

  const addFormRadio = useRef();
  const changeFormRadio = useRef();
  const deleteFormRadio = useRef();

  const techcardAddFolderRef = useRef();

  const fetchTechcards = async () => {
    try {
      const res = await axios.get("/techcards/get");

      let folders = [];
      let lists = [];
      let firstSides = [];
      let secondSides = [];

      res.data.forEach(({ folder, list, first_side, second_side }) => {
        folders.push(folder);
        lists.push(list);
        console.log(first_side);
        firstSides.push(first_side);
        secondSides.push(second_side);
      });

      setTechcards(res.data);
      setTechcardsFolders(folders.sort());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTechcards();
  }, []);

  const uniqFolders = [...new Set(techcardsFolders)];
  let uniqPerFolderList = [];
  uniqFolders.forEach((folder, folderI) => {
    uniqPerFolderList.push([{ folder }]);
    techcards.forEach((arr, arrI) => {
      return arr.folder === folder
        ? uniqPerFolderList[folderI].push({ list: arr.list })
        : "";
    });
  });

  let countFolderNew = "";
  let countFolderToLearn = "";
  let countFolderHard = "";
  let countFolderLearned = "";

  const counterFunction = () => {
    uniqFolders.forEach((folder, iFolder) => {
      let newSum = 0;
      let toLearnSum = 0;
      let hardSum = 0;
      let learnedSum = 0;
      techcards.forEach((arr, i) => {
        console.log(arr.learned);
        if (arr.folder === folder) {
          newSum = newSum + +arr.new;
          toLearnSum = toLearnSum + +arr.to_learn;
          hardSum = hardSum + +arr.hard;
          learnedSum = learnedSum + +arr.learned;
        }
        if (i === techcards.length - 1) {
          countFolderNew += +newSum;
          countFolderToLearn += +toLearnSum;
          countFolderHard += +hardSum;
          countFolderLearned += +learnedSum;

          countFolderNew += "|";
          countFolderToLearn += "|";
          countFolderHard += "|";
          countFolderLearned += "|";
        }
      });
    });
  };

  techcards && counterFunction();

  countFolderNew = countFolderNew?.slice(0, -1).split("|");
  countFolderToLearn = countFolderToLearn?.slice(0, -1).split("|");
  countFolderHard = countFolderHard?.slice(0, -1).split("|");
  countFolderLearned = countFolderLearned?.slice(0, -1).split("|");

  const changeTechcardsconHandler = () => {
    if (changeTechcardsIsVisible === true) {
      setTechcardsChangeIcon(faGear);
      setTechcardsIsVisible(false);
      clearFormStates();
    } else {
      setTechcardsChangeIcon(faArrowLeft);
      setTechcardsIsVisible(true);
      setAddFormIsSelected(true);
    }
  };

  // * SUBMIT HANDLER
  const techcardsSubmitHandler = async (e) => {
    e.preventDefault();
    // * ADD
    if (addFormIsSelected) {
      let listsToAdd = [];
      let allInputs = Array.from(e.target.newList);
      allInputs.forEach((input) => {
        if (input.value.length > 0)
          listsToAdd.push([input.attributes.folder.value, input.value]);
      });

      if (allInputs.length > 0) {
        try {
          const res = await axios.post("/techcards/add", {
            list: listsToAdd,
          });
          fetchTechcards();
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
      const newFolder = techcardAddFolderRef.current.value;
      if (newFolder.length > 0 && newFolder.length < 30) {
        try {
          const res = await axios.post("/techcards/add", {
            folder: newFolder,
          });
          fetchTechcards();
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    }
    // * CHANGE
    else if (changeFormIsSelected) {
      let listsToChange = [];
      let foldersToChange = [];
      let allLists = Array.from(e.target.changeList);
      let allFolders = Array.from(e.target.changeFolder);
      allLists.forEach((list) => {
        if (list.value.length === 0) return;
        if (list.value === list.attributes.oldList.value) return;
        listsToChange.push([
          list.attributes.folder.value,
          list.attributes.oldList.value,
          list.value,
        ]);
      });
      allFolders.forEach((folder) => {
        if (folder.value.length === 0) return;
        if (folder.value === folder.attributes.oldFolder.value) return;
        foldersToChange.push([folder.attributes.oldFolder.value, folder.value]);
      });
      console.log("folder", foldersToChange);

      if (listsToChange.length > 0) {
        try {
          const res = await axios.post("/techcards/update", {
            list: listsToChange,
          });
          fetchTechcards();
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
      if (foldersToChange.length > 0) {
        try {
          const res = await axios.post("/techcards/update", {
            folder: foldersToChange,
          });
          fetchTechcards();
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    }
    // * DELETE
    else if (deleteFormIsSelected) {
      const listToDeleteInputs = Array.from(e.target.listToDeleteInput);
      const folderToDeleteInputs = Array.from(e.target.folderToDeleteInput);

      let listToDelete = [];
      let folderToDelete = [];
      listToDeleteInputs.forEach((list, i) => {
        if (list.checked === true) {
          listToDelete.push(list.value.split("/"));
        }
      });
      folderToDeleteInputs.forEach((folder, i) => {
        if (folder.checked === true) {
          folderToDelete.push(folder.value);
        }
      });
      console.log(listToDelete);
      if (listToDelete.length > 0) {
        try {
          const res = await axios.post("/techcards/delete", {
            list: listToDelete,
          });
          fetchTechcards();
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
      if (folderToDelete.length > 0) {
        try {
          const res = await axios.post("/techcards/delete", {
            folder: folderToDelete,
          });
          fetchTechcards();
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    } else return;
  };

  const clearFormStates = () => {
    setAddFormIsSelected(false);
    setChangeFormIsSelected(false);
    setDeleteFormIsSelected(false);
  };

  return (
    <div className={classNames(cx("techcards-container"))}>
      <div className={classNames(cx("techcards-title"))}>
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          onClick={changeTechcardsconHandler}
          icon={techcardsChangeIcon}
        />
        <h1>TECHCARDS</h1>
      </div>

      <form onSubmit={techcardsSubmitHandler}>
        {uniqFolders.map((folder, iFolder) => {
          return (
            <div key={folder} className={classNames(cx("techcards-main"))}>
              <div style={{ display: "flex" }}>
                {changeFormIsSelected ? (
                  <input
                    id="changeFolder"
                    type="text"
                    defaultValue={folder}
                    oldFolder={folder}
                  ></input>
                ) : (
                  <h2>{folder}</h2>
                )}
                {deleteFormIsSelected ? (
                  <input
                    style={{ marginLeft: "0.8rem" }}
                    id="folderToDeleteInput"
                    type="checkbox"
                    value={folder}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className={classNames(cx("techcards-main-progress-bar"))}>
                <div
                  className={classNames(cx("techcards-main-progress-bar-new"))}
                >
                  {countFolderNew[iFolder]}
                </div>
                <div
                  className={classNames(
                    cx("techcards-main-progress-bar-learned")
                  )}
                >
                  {countFolderLearned[iFolder]}
                </div>
                <div
                  className={classNames(
                    cx("techcards-main-progress-bar-to-learn")
                  )}
                >
                  {countFolderToLearn[iFolder]}
                </div>
                <div
                  className={classNames(cx("techcards-main-progress-bar-hard"))}
                >
                  {countFolderHard[iFolder]}
                </div>
              </div>
              <ul>
                {techcards.map((arr, i) => {
                  const techcardsCount =
                    arr.first_side !== null
                      ? arr.first_side.split("/").length
                      : 0;

                  if (arr.folder === folder && arr.list !== null)
                    return (
                      <li key={i}>
                        {changeFormIsSelected ? (
                          <input
                            id="changeList"
                            folder={arr.folder}
                            type="text"
                            oldList={arr.list}
                            defaultValue={arr.list}
                          />
                        ) : (
                          <Link to={`${arr.folder}/${arr.list}`}>
                            {arr.list}
                          </Link>
                        )}

                        <div
                          className={classNames(
                            cx("techcards-main-list-container")
                          )}
                        >
                          <p>{techcardsCount}</p>
                          <div
                            className={classNames(
                              cx("techcards-main-progress-bar-list")
                            )}
                          >
                            {techcardsCount > 0 ? (
                              <>
                                <div
                                  style={{ width: `${arr.new * 100}%` }}
                                  className={classNames(
                                    cx("techcards-main-progress-bar-list-new")
                                  )}
                                >
                                  <span>New techcards:{arr.new}</span>
                                </div>
                                <div
                                  style={{ width: `${arr.learned * 100}%` }}
                                  className={classNames(
                                    cx(
                                      "techcards-main-progress-bar-list-learned"
                                    )
                                  )}
                                >
                                  <span>Learned techcards:{arr.learned}</span>
                                </div>
                                <div
                                  style={{ width: `${arr.to_learn * 100}%` }}
                                  className={classNames(
                                    cx(
                                      "techcards-main-progress-bar-list-to-learn"
                                    )
                                  )}
                                >
                                  <span>To learn techcards:{arr.to_learn}</span>
                                </div>
                                <div
                                  style={{ width: `${arr.hard * 100}%` }}
                                  className={classNames(
                                    cx("techcards-main-progress-bar-list-hard")
                                  )}
                                >
                                  <span>Hard techcards:{arr.hard}</span>
                                </div>
                              </>
                            ) : (
                              <div
                                style={{ width: "100%" }}
                                className={classNames(
                                  cx("techcards-main-progress-bar-list-empty")
                                )}
                              ></div>
                            )}
                          </div>
                          {deleteFormIsSelected ? (
                            <input
                              id="listToDeleteInput"
                              type="checkbox"
                              value={`${arr.folder}/${arr.list}`}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </li>
                    );
                })}
                {addFormIsSelected ? (
                  <li style={{ border: "none", marginTop: "0.8rem" }}>
                    <input
                      id="newList"
                      type="text"
                      folder={folder}
                      placeholder="New list"
                    />
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          );
        })}

        {changeTechcardsIsVisible ? (
          <>
            {addFormIsSelected ? (
              <input
                ref={techcardAddFolderRef}
                type="text"
                placeholder="New folder"
              />
            ) : (
              ""
            )}

            <div>
              <label htmlFor="add">Add</label>
              <input
                ref={addFormRadio}
                type="radio"
                name="formType"
                id="add"
                checked={addFormIsSelected}
                onClick={() => {
                  clearFormStates();
                  setAddFormIsSelected(true);
                }}
              />
              <label htmlFor="change">Change</label>
              <input
                ref={changeFormRadio}
                type="radio"
                name="formType"
                id="change"
                checked={changeFormIsSelected}
                onClick={() => {
                  clearFormStates();
                  setChangeFormIsSelected(true);
                }}
              />
              <label htmlFor="delete">Delete</label>
              <input
                ref={deleteFormRadio}
                type="radio"
                name="formType"
                id="delete"
                checked={deleteFormIsSelected}
                onClick={() => {
                  clearFormStates();
                  setDeleteFormIsSelected(true);
                }}
              />
            </div>
            <button className="btn-solid-small">Confirm</button>
          </>
        ) : (
          ""
        )}
      </form>
      <div className={classNames(cx("techcards-main"))}></div>
    </div>
  );
}

export default UserTechcardsContent;
