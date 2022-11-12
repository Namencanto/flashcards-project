import "../../../../assets/Global.scss";

import classes from "../UserTechcards.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { useRef } from "react";

function UserTechcardsContent() {
  const cx = classNames.bind(classes);
  const { currentUser } = useContext(AuthContext);

  const [userMessage, setUserMessage] = useState([]);

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
      setUserMessage([]);
      setTechcardsChangeIcon(faGear);
      setTechcardsIsVisible(false);
      clearFormStates();
    } else {
      setTechcardsChangeIcon(faArrowLeft);
      setTechcardsIsVisible(true);
      setAddFormIsSelected(true);
    }
  };

  /////////////////////////////////////////////////

  // * SUBMIT HANDLER
  const techcardsSubmitHandler = async (e) => {
    e.preventDefault();
    // * ADD
    if (addFormIsSelected) {
      let anyFolderExists = techcardsFolders.length > 0 ? true : false;
      let listsToAdd = [];

      if (anyFolderExists) {
        let allInputs = Array.from(e.target.newList);
        // if only one folder exist case
        if (e.target.newList.value && e.target.newList.length === undefined)
          allInputs.push(e.target.newList);

        allInputs.forEach((input) => {
          let listExists = false;
          // check if list name already exists
          techcards.forEach(({ folder, list }) => {
            if (folder === input.attributes.folder.value)
              if (list === input.value) return (listExists = true);
          });
          if (input.value.length > 0)
            if (!listExists)
              listsToAdd.push([input.attributes.folder.value, input.value]);
            else setUserMessage(["red", "List name arleady exists"]);
          else setUserMessage(["red", "List name cannot be empty"]);
        });

        // * LIST ADD
        if (listsToAdd.length > 0) {
          try {
            const res = await axios.post("/techcards/add", {
              list: listsToAdd,
            });
            fetchTechcards();
            setUserMessage(["green", res.data]);
            for (const list of allInputs) {
              list.value = "";
            }
          } catch (err) {
            setUserMessage(["red", "Something went wrong..."]);
          }
        }
      }
      // * FOLDER ADD
      const newFolder = techcardAddFolderRef.current.value;
      if (uniqFolders.find((folder) => folder === newFolder))
        return setUserMessage(["red", "Folder name already exists"]);

      if (newFolder.length > 0 && newFolder.length < 30) {
        try {
          const res = await axios.post("/techcards/add", {
            folder: newFolder,
          });
          fetchTechcards();
          setUserMessage(["green", res.data]);
          techcardAddFolderRef.current.value = "";
        } catch (err) {
          setUserMessage(["red", "Something went wrong..."]);
        }
      }
    }
    // * CHANGE
    else if (changeFormIsSelected) {
      const allLists = Array.from(e.target.changeList);
      const allFolders = Array.from(e.target.changeFolder);
      let listsToChange = [];
      let foldersToChange = [];

      allLists.forEach((inputList) => {
        if (inputList.value.length === 0)
          return setUserMessage(["red", "List name cannot be empty"]);

        let listExists = false;

        // check if list name already exists
        techcards.forEach(({ folder, list }) => {
          console.log(folder);
          if (folder === inputList.attributes.folder.value)
            if (list === inputList.value) return (listExists = true);
        });

        if (inputList.value === inputList.attributes.oldList.value) return;
        if (listExists)
          return setUserMessage(["red", "List name arleady exists"]);
        listsToChange.push([
          inputList.attributes.folder.value,
          inputList.attributes.oldList.value,
          inputList.value,
        ]);
      });
      let folderExists = false;
      allFolders.forEach((inputFolder) => {
        if (inputFolder.value.length === 0)
          return setUserMessage(["red", "Folder name cannot be empty"]);

        if (inputFolder.value === inputFolder.attributes.oldFolder.value)
          return;
        foldersToChange.push([
          inputFolder.attributes.oldFolder.value,
          inputFolder.value,
        ]);

        for (const folder of uniqFolders) {
          for (const folderToChange of foldersToChange) {
            if (folder === folderToChange[1]) return (folderExists = true);
          }
        }
      });

      if (listsToChange.length > 0) {
        try {
          const res = await axios.post("/techcards/update", {
            list: listsToChange,
          });
          fetchTechcards();
          return setUserMessage(["green", res.data]);
        } catch (err) {
          setUserMessage(["red", "Something went wrong..."]);
        }
      }

      if (foldersToChange.length > 0) {
        if (folderExists)
          return setUserMessage(["red", "Folder name already exists"]);
        try {
          const res = await axios.post("/techcards/update", {
            folder: foldersToChange,
          });
          fetchTechcards();
          return setUserMessage(["green", res.data]);
        } catch (err) {
          setUserMessage(["red", "Something went wrong..."]);
        }
      }
    }
    // * DELETE
    else if (deleteFormIsSelected) {
      const anyListExist = e.target.listToDeleteInput ? true : false;
      let listToDeleteInputs = anyListExist
        ? Array.from(e.target.listToDeleteInput)
        : [];
      let folderToDeleteInputs = Array.from(e.target.folderToDeleteInput);
      let listToDelete = [];
      let folderToDelete = [];
      if (
        e.target.folderToDeleteInput.value &&
        e.target.folderToDeleteInput.length === undefined
      )
        folderToDeleteInputs.push(e.target.folderToDeleteInput);
      if (
        anyListExist &&
        e.target.listToDeleteInput.value &&
        e.target.listToDeleteInput.length === undefined
      )
        listToDeleteInputs.push(e.target.listToDeleteInput);

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
      console.log(folderToDelete);
      if (listToDelete.length > 0) {
        try {
          const res = await axios.post("/techcards/delete", {
            list: listToDelete,
          });
          fetchTechcards();
          return setUserMessage(["green", res.data]);
        } catch (err) {
          setUserMessage(["red", "Something went wrong..."]);
        }
      }
      if (folderToDelete.length > 0) {
        try {
          const res = await axios.post("/techcards/delete", {
            folder: folderToDelete,
          });
          fetchTechcards();
          return setUserMessage(["green", res.data]);
        } catch (err) {
          setUserMessage(["red", "Something went wrong..."]);
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
            <div className={cx("techcards-settings-container")}>
              <div className={cx("techcards-settings")}>
                <input
                  ref={addFormRadio}
                  type="radio"
                  name="formType"
                  id="add"
                  checked={addFormIsSelected}
                  onClick={() => {
                    setUserMessage([]);
                    clearFormStates();
                    setAddFormIsSelected(true);
                  }}
                />
                <label htmlFor="add">Add</label>
                <input
                  ref={changeFormRadio}
                  type="radio"
                  name="formType"
                  id="change"
                  checked={changeFormIsSelected}
                  onClick={() => {
                    setUserMessage([]);
                    clearFormStates();
                    setChangeFormIsSelected(true);
                  }}
                />
                <label htmlFor="change">Change</label>
                <input
                  ref={deleteFormRadio}
                  type="radio"
                  name="formType"
                  id="delete"
                  checked={deleteFormIsSelected}
                  onClick={() => {
                    setUserMessage([]);
                    clearFormStates();
                    setDeleteFormIsSelected(true);
                  }}
                />
                <label htmlFor="delete">Delete</label>
              </div>
            </div>
            <p style={{ color: userMessage[0] }}>{userMessage[1]}</p>
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
