import classes from "./LanguagesDataList.module.scss";
import classNames from "classnames/bind";
import ReactCountryFlag from "react-country-flag";
import { languagesArray } from "../../../../../languagesFlags/languagesArray";
import { useState } from "react";
function LanguagesDataList({ defaultFirstSidesFlag, defaultSecondSidesFlag }) {
  const [firstSideFlag, setFirstSideFlag] = useState(defaultFirstSidesFlag);
  const [secondSideFlag, setSecondSideFlag] = useState(defaultSecondSidesFlag);
  const cx = classNames.bind(classes);
  console.log(defaultFirstSidesFlag);
  return (
    <div className={classNames(cx("datalist"))}>
      <div className={classNames(cx("datalist-content"))}>
        <span>First side:</span>
        <div className={classNames(cx("datalist-content-select-box"))}>
          <ReactCountryFlag svg countryCode={firstSideFlag} />
          <select
            oldFlag={defaultFirstSidesFlag}
            defaultValue={defaultFirstSidesFlag}
            onChange={(e) => {
              setFirstSideFlag(e.target.value);
            }}
            id="firstSidesLanguage"
          >
            <option value="">Select language</option>
            {languagesArray.map((lang, i) => (
              <option key={lang.name} value={lang.flag} label={lang.name} />
            ))}
          </select>
        </div>
      </div>
      <div className={classNames(cx("datalist-content"))}>
        <span>Second side:</span>
        <div className={classNames(cx("datalist-content-select-box"))}>
          <ReactCountryFlag svg countryCode={secondSideFlag} />
          <select
            defaultValue={defaultSecondSidesFlag}
            onChange={(e) => {
              setSecondSideFlag(e.target.value);
            }}
            id="secondSidesLanguage"
          >
            <option value="">Select language</option>
            {languagesArray.map((lang) => (
              <option key={lang.name} value={lang.flag} label={lang.name} />
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default LanguagesDataList;
