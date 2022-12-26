import classNames from "classnames/bind";
import classes from "../General.module.scss";
import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";

import MediaQueries from "../../../../../../HelperComponents/MediaQueries";
const GeneralAvatar = ({
  postGeneralAvatar,
  currentAvatar,
  setCurrentAvatar,
}) => {
  const cx = classNames.bind(classes);
  const { minWidth1000 } = MediaQueries();
  let editor = "";
  const fileInput = useRef();
  const [picture, setPicture] = useState({
    cropperOpen: false,
    img: null,
    zoom: 1,
    croppedImg: currentAvatar,
    name: "default.jpg",
  });

  const handleSliderZoom = (event, value) => {
    setPicture({
      ...picture,
      zoom: event.target.value,
    });
  };
  const handleSliderRotate = (event, value) => {
    setPicture({
      ...picture,
      rotate: event.target.value,
    });
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false,
    });
  };

  const setEditorRef = (ed) => {
    editor = ed;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (setEditorRef) {
      const canvasScaled = editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      setCurrentAvatar(croppedImg);
      const blob = await fetch(croppedImg).then((response) => response.blob());
      setPicture({
        ...picture,
        img: null,
        cropperOpen: false,
        croppedImg: croppedImg,
      });
      const formData = new FormData();
      formData.append("file", blob, picture.name);
      postGeneralAvatar(formData);
    }
  };

  const handleFileChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setPicture({
      ...picture,
      img: url,
      cropperOpen: true,
      name: e.target.files[0].name,
    });
  };

  function handleImageClick() {
    fileInput.current.click();
  }
  console.log(minWidth1000);

  return (
    <>
      <div>
        {picture.cropperOpen || (
          <div className={classNames(cx("settings-general-avatar"))}>
            <img onClick={handleImageClick} src={currentAvatar} />
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInput}
            />
          </div>
        )}
        {picture.cropperOpen && (
          <div className={classNames(cx("settings-general-avatar-edit"))}>
            <form action="">
              <AvatarEditor
                border={0}
                borderRadius={125}
                ref={setEditorRef}
                image={picture.img}
                width={minWidth1000 ? 150 : 250}
                height={minWidth1000 ? 150 : 250}
                color={[0, 0, 0, 0.5]} // RGBA
                rotate={picture.rotate}
                scale={picture.zoom}
              />
              <div
                className={classNames(cx("settings-general-avatar-edit-panel"))}
              >
                <div>
                  <label htmlFor="zoom">Zoom:</label>
                  <input
                    id="zoom"
                    type="range"
                    value={picture.zoom}
                    min={1}
                    max={10}
                    step={0.1}
                    onChange={handleSliderZoom}
                  ></input>
                </div>
                <div>
                  <label htmlFor="rotate">Rotate:</label>
                  <input
                    id="rotate"
                    type="range"
                    value={picture.rotate}
                    min={0}
                    max={360}
                    step={1}
                    onChange={handleSliderRotate}
                  ></input>
                </div>
              </div>
              <div
                className={classNames(
                  cx("settings-general-avatar-edit-buttons")
                )}
              >
                <button className="btn-solid-small" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn-solid-small" onClick={handleSave}>
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default GeneralAvatar;
