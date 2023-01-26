import "../../../../assets/Global.scss";

import classes from "../UserTechcards.module.scss";
import classNames from "classnames/bind";

import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRef, useContext } from "react";
import { countStatus } from "../../../../HelperComponents/countStatus";

import LanguagesDataList from "./LanguagesDataList/LanguagesDataList";
import { isArray } from "highcharts";

import StartButtons from "../../UserTechcardsList/UserTechcardsListContent/StartButtons";
import { RepetitionsContext } from "../../../../context/RepetitionsContext";

function UserTechcardsContent({
  deleteFormIsSelected,
  changeFormIsSelected,
  addFormIsSelected,
  techcardsFolders,
  techcardsLists,
  techcardsAllSides,
  userMessage,
  techcardsChangeIcon,
  fetchTechcards,
  changeTechcardsIsVisible,
  setUserMessage,
  setAddFormIsSelected,
  setDeleteFormIsSelected,
  setChangeFormIsSelected,
  clearFormStates,
  changeTechcardsconHandler,
  displayFolderStatisticsModal,
  displayListStatisticsModal,
  isFetched,
  displayLearningModal,
}) {
  const cx = classNames.bind(classes);

  const { filteredRepetitions } = useContext(RepetitionsContext);

  const addFormRadio = useRef();
  const changeFormRadio = useRef();
  const deleteFormRadio = useRef();

  const techcardAddFolderRef = useRef();

  const firstSidesFlag = techcardsFolders.map((d) => d.first_sides_flag);
  const secondSidesFlag = techcardsFolders.map((d) => d.second_sides_flag);

  // Count all techcards to one arr to give possibility to learn whole user content at once
  const allTechcardsIDS = [];
  const allTechcardsFirstSides = [];
  const allTechcardsSecondSides = [];
  const allTechcardsImages = [];
  const allTechcardsStatuses = [];
  for (let i = 0; i < techcardsAllSides.length; i++) {
    for (let j = 0; j < techcardsAllSides[i].length; j++) {
      allTechcardsIDS.push(techcardsAllSides[i][j].id);
      allTechcardsFirstSides.push(techcardsAllSides[i][j].first_side);
      allTechcardsSecondSides.push(techcardsAllSides[i][j].second_side);
      allTechcardsImages.push(techcardsAllSides[i][j].image);
      allTechcardsStatuses.push(techcardsAllSides[i][j].status);
    }
  }

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
            arr.forEach(({ list, folder_uid }) => {
              if (+input.attributes.folderID.value === folder_uid) {
                if (list === input.value) {
                  return (listExists = true);
                }
              }
            });
          });

          if (input.value.length > 0)
            if (!listExists)
              listsToAdd.push([input.attributes.folderID.value, input.value]);
            else
              setUserMessage([
                "server-denied-medium",
                "List name already exists",
              ]);
          else
            setUserMessage([
              "server-denied-medium",
              "List name cannot be empty",
            ]);
        });

        // * LIST ADD
        if (listsToAdd.length > 0) {
          try {
            const res = await axios.post("/techcards/add", {
              list: listsToAdd,
            });
            fetchTechcards();
            setUserMessage(["server-accepted-medium", res.data]);

            // vanish fields after submit
            for (const list of allInputs) {
              list.value = "";
            }

            setUserMessage(["server-accepted-medium", res.data]);
          } catch (err) {
            setUserMessage(["server-denied-medium", "Something went wrong..."]);
          }
        }
      }
      // * FOLDER ADD
      const firstSidesFlag = e.target.firstSidesLanguage.value;
      const secondSidesFlag = e.target.secondSidesLanguage.value;
      const newFolder = techcardAddFolderRef.current.value;
      if (techcardsFolders.find(({ folder }) => folder === newFolder))
        return setUserMessage([
          "server-denied-medium",
          "Folder name already exists",
        ]);

      if (newFolder.length > 0 && newFolder.length < 30) {
        try {
          const res = await axios.post("/techcards/add", {
            folder: newFolder,
            firstSidesFlag,
            secondSidesFlag,
          });
          fetchTechcards();
          setUserMessage(["server-accepted-medium", res.data]);
          techcardAddFolderRef.current.value = "";
        } catch (err) {
          setUserMessage(["server-denied-medium", "Something went wrong..."]);
        }
      }
    }

    /////////////////////////////////////////////////

    // * CHANGE
    else if (changeFormIsSelected) {
      const allLists = Array.from(e.target.changeList);
      const allFolders = Array.from(e.target.changeFolder);
      const allFirstSidesFlag = Array.from(e.target.firstSidesLanguage);
      const allSecondSidesFlag = Array.from(e.target.secondSidesLanguage);

      let listsToChange = [];
      let foldersToChange = [];
      let firstSidesFlagToChange = [];
      let secondSidesFlagToChange = [];

      // function needed for two cases when there is 1 input and when there is more than 1
      const changeListHandler = (inputList) => {
        if (inputList.value.length === 0)
          return setUserMessage([
            "server-denied-medium",
            "List name cannot be empty",
          ]);

        // check if list name already exists
        let listExists = false;
        techcardsLists.forEach((arr) => {
          arr.forEach(({ list, folder_uid }) => {
            if (+inputList.attributes.folderID.value === folder_uid) {
              if (list === inputList.value) {
                return (listExists = true);
              }
            }
          });
        });

        if (inputList.value === inputList.attributes.oldList.value) return;
        if (listExists)
          return setUserMessage([
            "server-denied-medium",
            "List name arleady exists",
          ]);
        listsToChange.push([
          inputList.attributes.listID.value,
          inputList.value,
        ]);
      };
      const changeFolderHandler = (inputFolder, i) => {
        if (inputFolder.value.length === 0)
          return setUserMessage([
            "server-denied-medium",
            "Folder name cannot be empty",
          ]);

        if (
          NodeList.prototype.isPrototypeOf(e.target.firstSidesLanguage) &&
          inputFolder.value === inputFolder.attributes.oldFolder.value &&
          allFirstSidesFlag[i].value === firstSidesFlag[i] &&
          allSecondSidesFlag[i].value === secondSidesFlag[i]
        )
          return;
        if (
          !NodeList.prototype.isPrototypeOf(e.target.firstSidesLanguage) &&
          inputFolder.value === inputFolder.attributes.oldFolder.value &&
          e.target.firstSidesLanguage.value === firstSidesFlag[i] &&
          e.target.secondSidesLanguage.value === secondSidesFlag[i]
        )
          return;

        foldersToChange.push([
          inputFolder.attributes.folderID.value,
          inputFolder.value,
        ]);
        firstSidesFlagToChange.push(
          NodeList.prototype.isPrototypeOf(e.target.firstSidesLanguage)
            ? allFirstSidesFlag[i].value
            : e.target.firstSidesLanguage.value
        );
        secondSidesFlagToChange.push(
          NodeList.prototype.isPrototypeOf(e.target.secondSidesLanguage)
            ? allSecondSidesFlag[i].value
            : e.target.secondSidesLanguage.value
        );
        for (const { folder } of techcardsFolders) {
          if (
            folder === foldersToChange[foldersToChange.length - 1][1] &&
            foldersToChange[foldersToChange.length - 1][1] !==
              inputFolder.attributes.oldFolder.value
          )
            return (folderExists = true);
        }
      };

      if (allLists.length > 0) {
        allLists.forEach((inputList) => {
          changeListHandler(inputList);
        });
      } else {
        changeListHandler(e.target.changeList);
      }

      let folderExists = false;
      if (allFolders.length > 0) {
        allFolders.forEach((inputFolder, i) => {
          changeFolderHandler(inputFolder, i);
        });
      } else {
        changeFolderHandler(e.target.changeFolder, 0);
      }

      if (listsToChange.length > 0) {
        try {
          const res = await axios.post("/techcards/update", {
            list: listsToChange,
          });
          fetchTechcards();
          setUserMessage(["server-accepted-medium", res.data]);
        } catch (err) {
          setUserMessage(["server-denied-medium", err.response.data]);
        }
      }

      if (foldersToChange.length > 0) {
        if (folderExists)
          return setUserMessage([
            "server-denied-medium",
            "Folder name already exists",
          ]);
        try {
          const res = await axios.post("/techcards/update", {
            folder:
              foldersToChange.length > 0
                ? foldersToChange
                : e.target.changeFolder,
            firstSidesFlag: firstSidesFlagToChange,
            secondSidesFlag: secondSidesFlagToChange,
          });
          fetchTechcards();
          setUserMessage(["server-accepted-medium", res.data]);
        } catch (err) {
          setUserMessage(["server-denied-medium", err.response.data]);
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
          return setUserMessage(["server-accepted-medium", res.data]);
        } catch (err) {
          setUserMessage(["server-denied-medium", "Something went wrong..."]);
        }
      }
      if (folderToDelete.length > 0) {
        try {
          const res = await axios.post("/techcards/delete", {
            folder: folderToDelete,
          });
          fetchTechcards();
          return setUserMessage(["server-accepted-medium", res.data]);
        } catch (err) {
          setUserMessage(["server-denied-medium", "Something went wrong..."]);
        }
      }
    } else return;
  };

  let allSidesStatus = [];

  for (let firstI = 0; firstI < techcardsAllSides?.length; firstI++) {
    let newCard = 0;
    let toLearnCard = 0;
    let knownCard = 0;
    let learnedCard = 0;
    let hardCard = 0;
    let uidCard;
    const oneListCase = !isArray(techcardsAllSides[0]);

    for (const { status, list_uid } of oneListCase
      ? techcardsAllSides
      : techcardsAllSides[firstI]) {
      if (status === 5) newCard += 1;
      if (status === 0) learnedCard += 1;
      if (status === 1 || status === 2 || status === 3 || status === 4)
        knownCard += 1;
      if (status === 6 || status === 7 || status === 8) toLearnCard += 1;
      if (status === 9 || status === 10) hardCard += 1;
      uidCard = list_uid;
    }
    allSidesStatus.push([
      uidCard,
      newCard,
      learnedCard,
      knownCard,
      toLearnCard,
      hardCard,
    ]);
  }

  return (
    <div className={classNames(cx("techcards-container"))}>
      {isFetched ? (
        <>
          <div className={classNames(cx("techcards-title"))}>
            <FontAwesomeIcon
              className={classNames(cx("techcards-title-icon"))}
              onClick={changeTechcardsconHandler}
              icon={techcardsChangeIcon}
            />
            <h1>Techcards</h1>
            {!changeTechcardsIsVisible && techcardsFolders.length !== 0 ? (
              <div className={classNames(cx("techcards-title-repeat-all"))}>
                <StartButtons
                  techcardsIDS={allTechcardsIDS}
                  firstSides={allTechcardsFirstSides}
                  secondSides={allTechcardsSecondSides}
                  techcardsImages={allTechcardsImages}
                  list={"All techcards"}
                  displayLearningModal={displayLearningModal}
                  statuses={allTechcardsStatuses}
                  filteredRepetitions={filteredRepetitions}
                  shortType={true}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          {!changeTechcardsIsVisible && techcardsFolders.length === 0 ? (
            <h3 style={{ textAlign: "center" }}>
              It looks like you don't have any techcards, click gear to add some
            </h3>
          ) : (
            ""
          )}
          <form onSubmit={techcardsSubmitHandler}>
            {techcardsFolders.map(({ folder, id }, iFolder) => {
              const folderID = id;

              // Filtering to the folder reps
              const currentFolderIDS = [];
              const currentFolderFirstSides = [];
              const currentFolderSecondSides = [];
              const currentFolderStatuses = [];
              const currentFolderImages = [];
              for (let i = 0; i < techcardsAllSides.length; i++) {
                for (let j = 0; j < techcardsAllSides[i].length; j++) {
                  if (folderID === techcardsAllSides[i][j].folder_uid) {
                    currentFolderIDS.push(techcardsAllSides[i][j].id);
                    currentFolderFirstSides.push(
                      techcardsAllSides[i][j].first_side
                    );
                    currentFolderSecondSides.push(
                      techcardsAllSides[i][j].second_side
                    );
                    currentFolderImages.push(techcardsAllSides[i][j].image);
                    currentFolderStatuses.push(techcardsAllSides[i][j].status);
                  }
                }
              }

              let counter = [];
              if (techcardsAllSides) {
                const oneListCase = !isArray(techcardsAllSides[0]);

                for (const techcardAllSides of oneListCase
                  ? [techcardsAllSides]
                  : techcardsAllSides) {
                  for (const { folder_uid, status } of techcardAllSides) {
                    if (folder_uid === id) counter.push(status);
                  }
                }
              }

              const status = countStatus(counter);
              const count = counter.length;
              return (
                <div key={folder} className={classNames(cx("techcards-main"))}>
                  <div
                    className={classNames(cx("techcards-main-folder-title"))}
                  >
                    {changeFormIsSelected ? (
                      <>
                        <input
                          id="changeFolder"
                          type="text"
                          defaultValue={folder}
                          folderID={id}
                          oldFolder={folder}
                        ></input>
                        <LanguagesDataList
                          defaultFirstSidesFlag={firstSidesFlag[iFolder]}
                          defaultSecondSidesFlag={secondSidesFlag[iFolder]}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          className={classNames(
                            cx("techcards-main-folder-title-content")
                          )}
                        >
                          <h2
                            onClick={() => {
                              displayFolderStatisticsModal(id);
                            }}
                          >
                            {folder}
                          </h2>
                          <div
                            className={classNames(
                              cx("techcards-main-folder-title-content-repeat")
                            )}
                          >
                            <StartButtons
                              techcardsIDS={currentFolderIDS}
                              firstSides={currentFolderFirstSides}
                              secondSides={currentFolderSecondSides}
                              techcardsImages={currentFolderImages}
                              list={`All techcards from ${folder}`}
                              displayLearningModal={displayLearningModal}
                              statuses={currentFolderStatuses}
                              filteredRepetitions={filteredRepetitions}
                              shortType={true}
                            />
                          </div>
                        </div>
                        <div>
                          <div
                            className={classNames(
                              cx("techcards-main-folder-title-stats")
                            )}
                          >
                            <p
                              onClick={() => {
                                displayFolderStatisticsModal(id);
                              }}
                            >
                              {count}
                            </p>
                            <div
                              style={{ width: "15rem" }}
                              onClick={() => {
                                displayFolderStatisticsModal(id);
                              }}
                              className={classNames(
                                cx("techcards-main-progress-bar-list")
                              )}
                            >
                              <>
                                <div
                                  style={{
                                    width: `${
                                      !status.new ? 0 : status.new * 100
                                    }%`,
                                  }}
                                  className={classNames(
                                    cx("techcards-main-progress-bar-list-new")
                                  )}
                                >
                                  <span>
                                    New techcards:{!status.new ? 0 : status.new}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    width: `${
                                      !status.learned ? 0 : status.learned * 100
                                    }%`,
                                  }}
                                  className={classNames(
                                    cx(
                                      "techcards-main-progress-bar-list-learned"
                                    )
                                  )}
                                >
                                  <span>
                                    Learned techcards:
                                    {!status.learned ? 0 : status.learned}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    width: `${
                                      !status.known ? 0 : status.known * 100
                                    }%`,
                                  }}
                                  className={classNames(
                                    cx("techcards-main-progress-bar-list-known")
                                  )}
                                >
                                  <span>
                                    Known techcards:
                                    {!status.known ? 0 : status.known}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    width: `${
                                      !status.toLearn ? 0 : status.toLearn * 100
                                    }%`,
                                  }}
                                  className={classNames(
                                    cx(
                                      "techcards-main-progress-bar-list-to-learn"
                                    )
                                  )}
                                >
                                  <span>
                                    To learn techcards:
                                    {!status.toLearn ? 0 : status.toLearn}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    width: `${
                                      !status.hard ? 0 : status.hard * 100
                                    }%`,
                                  }}
                                  className={classNames(
                                    cx("techcards-main-progress-bar-list-hard")
                                  )}
                                >
                                  <span>
                                    Hard techcards:
                                    {!status.hard ? 0 : status.hard}
                                  </span>
                                </div>
                              </>
                            </div>
                            {deleteFormIsSelected ? (
                              <input
                                id="folderToDeleteInput"
                                type="checkbox"
                                value={id}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <ul>
                    {techcardsLists[iFolder]?.map(({ list, id }, iList) => {
                      let actualStatus = [];
                      for (const sideStatus of allSidesStatus) {
                        if (sideStatus[0] === id)
                          actualStatus = sideStatus.slice(1);
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
                            <p
                              onClick={() => {
                                displayListStatisticsModal(id);
                              }}
                            >
                              {listCount}
                            </p>

                            <div
                              onClick={() => {
                                displayListStatisticsModal(id);
                              }}
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
                                      cx(
                                        "techcards-main-progress-bar-list-learned"
                                      )
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
                                        "techcards-main-progress-bar-list-known"
                                      )
                                    )}
                                  >
                                    <span>
                                      known techcards:
                                      {actualStatus[2]}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      width: `${actualStatus[3] * 100}%`,
                                    }}
                                    className={classNames(
                                      cx(
                                        "techcards-main-progress-bar-list-to-learn"
                                      )
                                    )}
                                  >
                                    <span>
                                      To learn techcards:
                                      {actualStatus[3]}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      width: `${actualStatus[4] * 100}%`,
                                    }}
                                    className={classNames(
                                      cx(
                                        "techcards-main-progress-bar-list-hard"
                                      )
                                    )}
                                  >
                                    <span>
                                      Hard techcards:{actualStatus[4]}
                                    </span>
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
                  <>
                    <input
                      ref={techcardAddFolderRef}
                      type="text"
                      placeholder="New folder"
                    />
                    <LanguagesDataList />
                  </>
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
                <button
                  style={{
                    marginTop: "0.5rem",
                    width: "15rem",
                    height: "4rem",
                    fontSize: "1.6rem",
                  }}
                  className="btn-solid-small"
                >
                  Confirm
                </button>
                <p className={userMessage[0]}>{userMessage[1]}</p>
              </>
            ) : (
              ""
            )}
          </form>
          <div className={classNames(cx("techcards-main"))}></div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default UserTechcardsContent;
