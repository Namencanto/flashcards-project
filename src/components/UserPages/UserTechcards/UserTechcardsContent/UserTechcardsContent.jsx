import "../../../../assets/Global.scss";

import classes from "../UserTechcards.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

import axios from "axios";

function UserTechcardsContent() {
  const { currentUser } = useContext(AuthContext);

  const [techcards, setTechcards] = useState();
  const [techcardsFolders, setTechcardsFolders] = useState([]);
  const [techcardsLists, setTechcardsLists] = useState();
  const [techcardsFirstSide, setTechcardsFirstSide] = useState();
  const [techcardsSecondSide, setTechcardsSecondSide] = useState();

  const cx = classNames.bind(classes);

  const changeAboutMeTextSubmitHandler = async () => {
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
      setTechcardsLists(lists);
      setTechcardsFirstSide(firstSides);
      setTechcardsSecondSide(secondSides);
    } catch (err) {
      console.log(err);
    }
  };

  const userTechcardsObj = {
    0: {
      name: "English",
      lists: {
        0: {
          name: "Phrasal Verbs",
          techcards: {
            firstSide: {
              0: "Dupa",
              1: "Kupa",
              2: "Sraka",
            },
            secondSide: {
              0: "Trupa",
              1: "Kamieni",
              2: "Kwaka",
            },
          },
        },
        1: {
          name: "Grammar",
          techcards: {
            firstSide: {
              0: "Dupa",
              1: "Kupa",
              2: "Sraka",
            },
            secondSide: {
              0: "Trupa",
              1: "Kamieni",
              2: "Kwaka",
            },
          },
        },
        2: {
          name: "Vocabulary",
          techcards: {
            firstSide: {
              0: "Dupa",
              1: "Kupa",
              2: "Sraka",
            },
            secondSide: {
              0: "Trupa",
              1: "Kamieni",
              2: "Kwaka",
            },
          },
        },
      },
    },
    1: {
      name: "Spanish",
      lists: {
        0: {
          name: "Phrasal Verbs",
          techcards: {
            firstSide: {
              0: "Dupa",
              1: "Kupa",
              2: "Sraka",
            },
            secondSide: {
              0: "Trupa",
              1: "Kamieni",
              2: "Kwaka",
            },
          },
        },
        1: {
          name: "Grammar",
          techcards: {
            firstSide: {
              0: "Dupa",
              1: "Kupa",
              2: "Sraka",
            },
            secondSide: {
              0: "Trupa",
              1: "Kamieni",
              2: "Kwaka",
            },
          },
        },
        2: {
          name: "Vocabulary",
          techcards: {
            firstSide: {
              0: "Dupa",
              1: "Kupa",
              2: "Sraka",
            },
            secondSide: {
              0: "Trupa",
              1: "Kamieni",
              2: "Kwaka",
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    changeAboutMeTextSubmitHandler();
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
  // console.log(uniqPerFolderList[0]);

  const uniqLists = [...new Set(techcardsLists)];
  const counts =
    techcards &&
    techcardsFolders.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {}
    );

  let newList = [];
  let toLearnList = [];
  let hardList = [];

  uniqLists.forEach((list, i) => {
    let listArr = [];
    techcards.forEach((arr, i) => {
      return arr.list === list ? listArr.push(arr.new) : "";
    });
  });

  function findData(data, id) {
    const found = data.filter((element) => element.id === id);
    return found;
  }

  let countFolder = [[], [], []];
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
          newSum = newSum + arr.new;
          toLearnSum = toLearnSum + arr.to_learn;
          hardSum = hardSum + arr.hard;
          learnedSum = learnedSum + arr.learned;
        }
        if (i === techcards.length - 1) {
          countFolderNew += newSum;
          countFolderToLearn += toLearnSum;
          countFolderHard += hardSum;
          countFolderLearned += learnedSum;

          countFolderNew += "|";
          countFolderToLearn += "|";
          countFolderHard += "|";
          countFolderLearned += "|";
        }
      });
    });
  };

  techcards && counterFunction();
  countFolderNew = countFolderNew.slice(0, -1).split("|");
  countFolderToLearn = countFolderToLearn.slice(0, -1).split("|");
  countFolderHard = countFolderHard.slice(0, -1).split("|");
  countFolderLearned = countFolderLearned.slice(0, -1).split("|");

  console.log(
    "tobylmaj",
    countFolderNew,
    countFolderToLearn,
    countFolderHard,
    countFolderLearned
  );
  console.log("tobylmaj", countFolderNew[0]);
  return (
    <div className={classNames(cx("techcards-container"))}>
      <div className={classNames(cx("techcards-title"))}>
        <h1>TECHCARDS</h1>
      </div>
      {uniqFolders.map((folder, iFolder) => {
        return (
          <div key={folder} className={classNames(cx("techcards-main"))}>
            <h2>{folder}</h2>
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
                {countFolderToLearn[iFolder]}
              </div>
              <div
                className={classNames(
                  cx("techcards-main-progress-bar-to-learn")
                )}
              >
                {countFolderHard[iFolder]}
              </div>
              <div
                className={classNames(cx("techcards-main-progress-bar-hard"))}
              ></div>
            </div>
            <ul>
              {techcards.map((arr, i) => {
                const techcardsCount = arr.first_side.split("/").length;

                return arr.folder === folder ? (
                  <li key={i}>
                    <Link to={`${arr.folder}/${arr.list}`}>{arr.list}</Link>

                    <div>
                      <div
                        className={classNames(
                          cx("techcards-main-progress-bar-list")
                        )}
                      >
                        <div
                          style={{ width: `${arr.new * 100}%` }}
                          className={classNames(
                            cx("techcards-main-progress-bar-list-new")
                          )}
                        >
                          //TODO
                          <span className="tooltiptext">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Est ex ipsam hic enim
                          </span>
                        </div>
                        <div
                          style={{ width: `${arr.learned * 100}%` }}
                          className={classNames(
                            cx("techcards-main-progress-bar-list-learned")
                          )}
                        ></div>
                        <div
                          style={{ width: `${arr.to_learn * 100}%` }}
                          className={classNames(
                            cx("techcards-main-progress-bar-list-to-learn")
                          )}
                        ></div>
                        <div
                          style={{ width: `${arr.hard * 100}%` }}
                          className={classNames(
                            cx("techcards-main-progress-bar-list-hard")
                          )}
                        ></div>
                      </div>

                      <p></p>
                    </div>
                  </li>
                ) : (
                  ""
                );
              })}
            </ul>
          </div>
        );
      })}
      <div className={classNames(cx("techcards-main"))}></div>
    </div>
  );
}

export default UserTechcardsContent;

// {uniqLists.map((list, i) => {
//   let counterList = [];

//   return (
//     <>
//       {techcards.map((arr, i) => {
//         list === arr.list && folder === arr.folder
//           ? counterList.push(arr.new)
//           : (counterList = []);

//         return counterList.length !== 0 ? (
//           <>
//             <div
//               style={{
//                 width: `${counterList.length}rem`,
//               }}
//               className={classNames(
//                 cx(
//                   "techcards-main-progress-bar-learned"
//                 )
//               )}
//             ></div>
//             <div
//               className={classNames(
//                 cx(
//                   "techcards-main-progress-bar-to-learn"
//                 )
//               )}
//             ></div>
//             <div
//               className={classNames(
//                 cx(
//                   "techcards-main-progress-bar-hard"
//                 )
//               )}
//             ></div>
//           </>
//         ) : (
//           ""
//         );
//       })}
//     </>
//   );
// })}
