import classes from "./LoadingSpinner.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { didYouKnowPhrases, loadingPhrases } from "./phrases";
function LoadingSpinner() {
  const cx = classNames.bind(classes);

  const [currentLoadingPhrase, setCurrentLoadingPhrase] = useState(
    loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]
  );
  const [currentDidYouKnowPhras, setCurrentDidYouKnowPhras] = useState(
    didYouKnowPhrases[Math.floor(Math.random() * didYouKnowPhrases.length)]
  );

  let uniqueDidYouKnowPhrases = didYouKnowPhrases;
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(uniqueDidYouKnowPhrases);
      console.log("uniqueDidYouKnowPhrases");
      const randomLoadingPhrase =
        loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
      const randomDidYouKnowPhrase =
        uniqueDidYouKnowPhrases[
          Math.floor(Math.random() * uniqueDidYouKnowPhrases.length)
        ];
      setCurrentLoadingPhrase(randomLoadingPhrase);
      setCurrentDidYouKnowPhras(randomDidYouKnowPhrase);

      uniqueDidYouKnowPhrases = uniqueDidYouKnowPhrases.filter(
        (word) => word !== randomDidYouKnowPhrase
      );

      if (uniqueDidYouKnowPhrases.length === 0) {
        uniqueDidYouKnowPhrases = didYouKnowPhrases;
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classNames(cx("spinner"))}>
      <div className={classNames(cx("spinner-text"))}>
        <p>{currentLoadingPhrase}</p>
        <p>{currentDidYouKnowPhras}</p>
      </div>

      <div className={classNames(cx("spinner-container"))}>
        <div className={classNames(cx("spinner-bounce"))}></div>
        <div
          style={{ animationDelay: "0.16s" }}
          className={classNames(cx("spinner-bounce"))}
        ></div>
        <div
          style={{ animationDelay: "0.32s" }}
          className={classNames(cx("spinner-bounce"))}
        ></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
