import "../../../../assets/Global.scss";

import classes from ".././UserTechcardsList.module.scss";
import classNames from "classnames/bind";

import { faRocket } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState } from "react";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faArrowLeft,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useRef } from "react";
function UserTechcardsListContent() {
  const cx = classNames.bind(classes);
  const { folder, list } = useParams();

  const [firstSidesData, setFirstSidesData] = useState();
  const [secondSidesData, setSecondSidesData] = useState();

  const [listData, setListData] = useState();

  const [firstSides, setFirstSides] = useState();
  const [secondSides, setSecondSides] = useState();
  const [techcardsImages, setTechcardsImages] = useState();

  const [renderAll, setRenderAll] = useState(false);
  const [listChangeIcon, setChangeIcon] = useState(faGear);
  const [changeListIsVisible, setListIsVisible] = useState(false);

  const [formIsVisible, setFormIsVisible] = useState(false);
  const [formType, setFormType] = useState();
  const [formDefaultFirstSide, setFormDefaultFirstSide] = useState("");
  const [formDefaultSecondSide, setFormDefaultSecondSide] = useState("");

  const [image, setImage] = useState(
    "https://miro.medium.com/max/250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg"
  );

  const fileInputRef = useRef();
  const fetchTechcards = async () => {
    try {
      const res = await axios.get("/techcards/lists/get", {
        params: {
          folder: folder,
          list: list,
        },
      });
      res.data.forEach(({ first_side, second_side }) => {
        setFirstSidesData(first_side);
        setSecondSidesData(second_side);
        setFirstSides(first_side.split("/"));
        setSecondSides(second_side.split("/"));
      });

      setListData(res.data.first_side.split("/"));
    } catch (err) {
      console.log(err);
    }
  };
  console.log(firstSides);
  useEffect(() => {
    fetchTechcards();

    console.log(listData);
  }, []);

  const changeListHandler = () => {
    if (formIsVisible) return setFormIsVisible(false);
    if (changeListIsVisible === true) {
      setChangeIcon(faGear);
      setListIsVisible(false);
    } else {
      setChangeIcon(faArrowLeft);
      setListIsVisible(true);
    }
  };

  const changeListElementHandler = () => {
    formIsVisible ? setFormIsVisible(false) : setFormIsVisible(true);
  };
  const formListHandler = async (e) => {
    e.preventDefault();

    const image = e.target.file.files[0];
    const firstSide = e.target.firstSide.value;
    const secondSide = e.target.secondSide.value;

    const data = new FormData();
    data.append("file", fileInputRef.current.files[0]);
    try {
      let imagePath;
      if (image) {
        const resImage = await axios.post("/techcards/lists/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imagePath = resImage.data;
      }

      let firstSidesToUpdate;
      let secondSidesToUpdate;
      if (firstSidesData === null && formType === "ADD") {
        firstSidesToUpdate = firstSide;
        secondSidesToUpdate = secondSide;
      }
      if (firstSidesData !== null && formType === "ADD") {
        firstSidesToUpdate = firstSidesData + "/" + firstSide;
        secondSidesToUpdate = secondSidesData + "/" + secondSide;
      }

      console.log(secondSidesToUpdate);
      const resData = await axios.post("/techcards/lists/upload", {
        list,
        folder,
        imagePath,
        firstSidesToUpdate,
        secondSidesToUpdate,
      });
      fetchTechcards();

      if (resData.status === 200) {
        setTechcardsImages(imagePath);
        // setImage(process.env.REACT_APP_URL + imagePath);
        fetchTechcards();
        setFormIsVisible(false);
      }
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileSelect = (event) => {
    console.log("asf");
    let reader = new FileReader();
    reader.onload = (event) => setImage(event.target.result);
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className={classNames(cx("techcards-list-container"))}>
      <div className={classNames(cx("techcards-title"))}>
        <FontAwesomeIcon
          className={classNames(cx("techcards-title-icon"))}
          onClick={changeListHandler}
          icon={listChangeIcon}
        />
        {/* <p>{folder}</p> */}
        <h1>{list}</h1>
      </div>
      <main className={classNames(cx("techcards-list-main"))}>
        {!formIsVisible ? (
          <>
            <div className={classNames(cx("techcards-list-main-header"))}>
              <div>
                First side <ReactCountryFlag svg countryCode={"US"} />
              </div>
              <div>
                Second side <ReactCountryFlag svg countryCode={"PL"} />
              </div>
            </div>
            <ul>
              {firstSides?.map((side, i) => {
                if (!renderAll && i > 15) return;
                return (
                  <li>
                    <div>{side}</div>
                    <div>{secondSides[i]}</div>
                    {changeListIsVisible ? (
                      <FontAwesomeIcon
                        onClick={() => {
                          changeListElementHandler();
                          setFormDefaultFirstSide(side);
                          setFormDefaultSecondSide(secondSides[i]);
                          setFormType("CHANGE");
                        }}
                        icon={faPencil}
                      />
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <form
            className={classNames(cx("techcards-list-main-form"))}
            onSubmit={formListHandler}
            encType="multipart/form-data"
          >
            <div
              className={classNames(cx("techcards-list-main-form-container"))}
            >
              <div className={classNames(cx("techcards-list-main-form-image"))}>
                <label>
                  <input
                    onChange={(e) => {
                      handleFileSelect(e);
                      // setImage(techcardsImages);
                    }}
                    type="file"
                    id="file"
                    ref={fileInputRef}
                  />
                  <figure>
                    <img src={image} alt="techcard illustration" />
                    <figcaption>
                      <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                    </figcaption>
                  </figure>
                </label>
              </div>

              <div
                className={classNames(cx("techcards-list-main-form-element"))}
              >
                <label htmlFor="firstSide">First side</label>
                <input
                  defaultValue={formDefaultFirstSide}
                  type="text"
                  id="firstSide"
                />
              </div>
              <div
                className={classNames(cx("techcards-list-main-form-element"))}
              >
                <label htmlFor="secondSide">Second side</label>
                <input
                  defaultValue={formDefaultSecondSide}
                  type="text"
                  id="secondSide"
                />
              </div>
            </div>
            <button className="btn-solid-medium">Submit</button>
          </form>
        )}

        {!formIsVisible ? (
          changeListIsVisible ? (
            <button
              onClick={() => {
                setFormType("ADD");
                changeListElementHandler();
              }}
              className="btn-solid-small"
            >
              Add new
            </button>
          ) : (
            <button className="btn-solid-small">Start</button>
          )
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default UserTechcardsListContent;
