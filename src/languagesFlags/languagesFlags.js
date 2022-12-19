import { languagesArray } from "./languagesArray";
const Languages = new (function () {
  const codes = {};

  for (const i = 0; i < languagesArray.length; ++i) {
    const entry = languagesArray[i];
    codes[entry.code] = entry;
  }

  this.getList = function () {
    return languagesArray;
  };

  this.getEntry = function (code) {
    return codes[code] || null;
  };
})();
