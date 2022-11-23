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

  const [techcardsFolders, setTechcardsFolders] = useState([]);
  const [techcardsLists, setTechcardsLists] = useState([]);
  const [techcardsAllSides, setTechcardsAllSides] = useState([]);

  const [userMessage, setUserMessage] = useState([]);

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

      setTechcardsFolders(res.data[0]);
      setTechcardsLists(res.data[1]);
      setTechcardsAllSides(res?.data[2]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTechcards();
  }, []);

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
          techcardsLists.forEach((arr) => {
            arr.forEach(({ list, uid }) => {
              if (+input.attributes.folderID.value === uid) {
                if (list === input.value) {
                  return (listExists = true);
                }
              }
            });
          });

          if (input.value.length > 0)
            if (!listExists)
              listsToAdd.push([input.attributes.folderID.value, input.value]);
            else setUserMessage(["red", "List name already exists"]);
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

            // vanish fields after submit
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
      if (techcardsFolders.find(({ folder }) => folder === newFolder))
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

    /////////////////////////////////////////////////

    // * CHANGE
    else if (changeFormIsSelected) {
      const allLists = Array.from(e.target.changeList);
      const allFolders = Array.from(e.target.changeFolder);
      let listsToChange = [];
      let foldersToChange = [];

      allLists.forEach((inputList) => {
        if (inputList.value.length === 0)
          return setUserMessage(["red", "List name cannot be empty"]);

        // check if list name already exists
        let listExists = false;
        techcardsLists.forEach((arr) => {
          arr.forEach(({ list, uid }) => {
            if (+inputList.attributes.folderID.value === uid) {
              if (list === inputList.value) {
                return (listExists = true);
              }
            }
          });
        });

        if (inputList.value === inputList.attributes.oldList.value) return;
        if (listExists)
          return setUserMessage(["red", "List name arleady exists"]);
        listsToChange.push([
          inputList.attributes.listID.value,
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
          inputFolder.attributes.folderID.value,
          inputFolder.value,
        ]);

        for (const { folder } of techcardsFolders) {
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

    /////////////////////////////////////////////////

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

  let allSidesStatus = [];

  for (let firstI = 0; firstI < techcardsAllSides?.length; firstI++) {
    let newCard = 0;
    let toLearnCard = 0;
    let learnedCard = 0;
    let hardCard = 0;
    let uidCard;

    for (const { status, uid } of techcardsAllSides[firstI]) {
      if (status === 0) newCard += 1;
      if (status === 1) learnedCard += 1;
      if (status === 2) toLearnCard += 1;
      if (status === 3) hardCard += 1;
      uidCard = uid;
    }
    allSidesStatus.push([uidCard, newCard, toLearnCard, learnedCard, hardCard]);
  }

  return (
    <div className={classNames(cx("techcards-container"))}>
      <div className={classNames(cx("techcards-title"))}>
        <FontAwesomeIcon
          className={classNames(cx("techcards-title-icon"))}
          onClick={changeTechcardsconHandler}
          icon={techcardsChangeIcon}
        />
        <h1>TECHCARDS</h1>
        {!changeTechcardsIsVisible && techcardsFolders.length === 0 ? (
          <h3>
            It look like you don't have any techcards, click gear to add some
          </h3>
        ) : (
          ""
        )}
      </div>

      <form onSubmit={techcardsSubmitHandler}>
        {techcardsFolders.map(({ folder, id }, iFolder) => {
          const folderID = id;
          let counter = [];
          if (techcardsAllSides) {
            for (const techcardAllSides of techcardsAllSides) {
              for (const { folder_uid, status } of techcardAllSides) {
                if (folder_uid === id) counter.push(status);
              }
            }
          }
          const counts = {};
          for (const num of counter) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
          }

          return (
            <div key={folder} className={classNames(cx("techcards-main"))}>
              <div style={{ display: "flex" }}>
                {changeFormIsSelected ? (
                  <input
                    id="changeFolder"
                    type="text"
                    defaultValue={folder}
                    folderID={id}
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
                    value={id}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className={classNames(cx("techcards-main-progress-bar"))}>
                <div
                  className={classNames(cx("techcards-main-progress-bar-new"))}
                >
                  {!counts[0] ? 0 : counts[0]}
                </div>
                <div
                  className={classNames(
                    cx("techcards-main-progress-bar-learned")
                  )}
                >
                  {!counts[1] ? 0 : counts[1]}
                </div>
                <div
                  className={classNames(
                    cx("techcards-main-progress-bar-to-learn")
                  )}
                >
                  {!counts[2] ? 0 : counts[2]}
                </div>
                <div
                  className={classNames(cx("techcards-main-progress-bar-hard"))}
                >
                  {!counts[3] ? 0 : counts[3]}
                </div>
              </div>
              <ul>
                {techcardsLists[iFolder]?.map(({ list, id }, iList) => {
                  let actualStatus = [];
                  for (const allsideStatus of allSidesStatus) {
                    if (allsideStatus[0] === id)
                      actualStatus = allsideStatus.slice(1);
                  }
                  const listCount = actualStatus.reduce((a, b) => a + b, 0);
                  return (
                    <li key={iList}>
                      {changeFormIsSelected ? (
                        <input
                          id="changeList"
                          folderID={folderID}
                          listID={id}
                          folderName={folder}
                          type="text"
                          oldList={list}
                          defaultValue={list}
                        />
                      ) : (
                        <Link to={`${folder}/${list}/${id}`}>{list}</Link>
                      )}
                      <div
                        className={classNames(
                          cx("techcards-main-list-container")
                        )}
                      >
                        <p>{listCount}</p>

                        <div
                          className={classNames(
                            cx("techcards-main-progress-bar-list")
                          )}
                        >
                          {listCount > 0 ? (
                            <>
                              <div
                                style={{
                                  width: `${actualStatus[0] * 100}%`,
                                }}
                                className={classNames(
                                  cx("techcards-main-progress-bar-list-new")
                                )}
                              >
                                <span>New techcards:{actualStatus[0]}</span>
                              </div>
                              <div
                                style={{
                                  width: `${actualStatus[1] * 100}%`,
                                }}
                                className={classNames(
                                  cx("techcards-main-progress-bar-list-learned")
                                )}
                              >
                                <span>
                                  Learned techcards:
                                  {actualStatus[1]}
                                </span>
                              </div>
                              <div
                                style={{
                                  width: `${actualStatus[2] * 100}%`,
                                }}
                                className={classNames(
                                  cx(
                                    "techcards-main-progress-bar-list-to-learn"
                                  )
                                )}
                              >
                                <span>
                                  To learn techcards:
                                  {actualStatus[2]}
                                </span>
                              </div>
                              <div
                                style={{
                                  width: `${actualStatus[3] * 100}%`,
                                }}
                                className={classNames(
                                  cx("techcards-main-progress-bar-list-hard")
                                )}
                              >
                                <span>Hard techcards:{actualStatus[3]}</span>
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
                            value={id}
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
                      folderID={id}
                      folderName={folder}
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
            <div className="radio-techcards-container">
              <div className="radio-techcards">
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
            <button
              style={{ width: "15rem", height: "4rem", fontSize: "1.6rem" }}
              className="btn-solid-small"
            >
              Confirm
            </button>
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
