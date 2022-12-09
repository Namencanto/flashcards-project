import classes from "./UploadIllustration.module.scss";
import classNames from "classnames/bind";

import { useEffect, useState } from "react";

import { handleFileSelect } from "../../../UserTechcardsList/UserTechcardsListContent/UserTechcardsListContentHelpers";
import axios from "axios";
import { useRef } from "react";
function UploadIllustration() {
  const defaultImage =
    "https://miro.medium.com/max/250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg";

  const cx = classNames.bind(classes);

  const imageInLinkRef = useRef();
  const [image, setImage] = useState(defaultImage);
  const [imageFormTypeIsFile, setImageFormTypeIsFile] = useState(true);
  const [imageChangeDefaultValue, setImageChangeDefaultValue] = useState("");
  const [isImageInForm, setIsImageInForm] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  // const formListHandler = async (e) => {
  //   e.preventDefault();

  //   // * VARIABLES FROM INPUTS
  //   const imageInLink = imageInLinkRef.current?.value;
  //   const image = e.target.file?.files[0];

  //   let imagePath;
  //   if (image) {
  //     const data = new FormData();
  //     data.append("file", image);
  //     try {
  //       if (isImageInForm) {
  //         const resImage = await axios.post("/techcards/lists/upload", data);
  //         imagePath = resImage.data;
  //       }
  //     } catch (err) {
  //       // * IMAGE UPLOAD ERROR MESSAGES
  //       const filetypes = /jpeg|jpg|png|gif/;
  //       if (filetypes.test(image.name.toLowerCase()) === false)
  //         return messageError(
  //           "The file can only be a (.jpeg, .jpg, .png, .gif)"
  //         );
  //       else if (image.size > 25000000)
  //         return messageError("The file can be a maximum of 25MB");
  //       else return messageError("Something went wrong in file upload...");
  //     }
  //   }

  //   // * FORM TYPE IS ADD LOGIC
  //   if (formType === "ADD") {
  //     techcardsToAdd = {
  //       image: imagePath ? imagePath : imageInLink ? imageInLink : false,
  //     };
  //   }

  //   // * FORM TYPE IS CHANGE LOGIC
  //   if (formType === "CHANGE") {
  //     if (!deleteImage && !imagePath)
  //       return messageError("Change something before you update");

  //     techcardsToUpdate = {
  //       image: imagePath ? imagePath : imageInLink ? imageInLink : false,
  //       deleteImage,
  //       oldImage: techcardsImages[techcardIndex],
  //       techcardID,
  //     };
  //   }

  //   // * FORM TYPE IS CHANGE DELETE
  //   if (formType === "DELETE") {
  //     const techcardToDeleteToIterable = techcardsToDeleteInputs.length
  //       ? techcardsToDeleteInputs
  //       : [techcardsToDeleteInputs];
  //     let images = [];
  //     let techcardsIDS = [];

  //     for (const techcardToDeleteInput of techcardToDeleteToIterable) {
  //       if (techcardToDeleteInput.checked === true) {
  //         images.push(
  //           techcardsImages[techcardToDeleteInput.attributes.index.value]
  //         );
  //         techcardsIDS.push(techcardToDeleteInput.value);
  //       }

  //       techcardsToDelete = {
  //         techcardsIDS,
  //         images,
  //       };
  //     }
  //   }
  //   try {
  //     const resData = await axios.post("/techcards/lists/upload", {
  //       folderID,
  //       id,
  //       techcardsToAdd,
  //       techcardsToUpdate,
  //       techcardsToDelete,
  //     });
  //     fetchTechcards();
  //     setDeleteImage(false);
  //     setMessageToUser({});

  //     if (resData.status === 200) {
  //       setFormIsVisible(false);
  //     }
  //   } catch (err) {
  //     // * TECHCARDS ERROR MESSAGES
  //     console.log(err);
  //     return messageError("Something went wrong...");
  //   }
  // };

  return (
    <div className={classNames(cx("image"))}>
      <label>
        {imageFormTypeIsFile ? (
          <input
            onChange={(e) => {
              handleFileSelect(e, setImage);
              setIsImageInForm(true);
            }}
            type="file"
            id="file"
            defaultValue={imageChangeDefaultValue}
          />
        ) : (
          ""
        )}

        <figure>
          <img
            style={{
              cursor: imageFormTypeIsFile ? "pointer" : "default",
            }}
            src={image}
            alt="techcard illustration"
          />
          {imageFormTypeIsFile ? (
            <figcaption>
              <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
            </figcaption>
          ) : (
            ""
          )}
        </figure>
      </label>
      {image !== defaultImage ? (
        <button
          style={{ color: "darkred" }}
          onClick={() => {
            setImage(defaultImage);
            setIsImageInForm(false);
            setDeleteImage(true);
          }}
          type="button"
        >
          Delete illustration
        </button>
      ) : (
        <button
          style={{ color: "#333" }}
          onClick={() => {
            imageFormTypeIsFile
              ? setImageFormTypeIsFile(false)
              : setImageFormTypeIsFile(true);
          }}
          type="button"
        >
          {imageFormTypeIsFile
            ? "I want to add image by link"
            : "I want to add image by file"}
        </button>
      )}
      {!imageFormTypeIsFile ? (
        <div className={classNames(cx("image-link-input"))}>
          <input
            ref={imageInLinkRef}
            placeholder="Enter image url"
            type="text"
            id="imageInLink"
          />
          <button
            type="button"
            onClick={() => {
              setImage(imageInLinkRef.current.value);
            }}
          >
            Check
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default UploadIllustration;
