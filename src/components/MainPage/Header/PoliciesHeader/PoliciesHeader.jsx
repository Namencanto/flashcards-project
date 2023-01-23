import classes from "./PoliciesHeader.module.scss";
import classNames from "classnames/bind";

import { useRef, useEffect } from "react";
function PoliciesHeader({ title, giveHeaderContentRef }) {
  const cx = classNames.bind(classes);

  const headerContentRef = useRef();

  useEffect(() => {
    giveHeaderContentRef(headerContentRef);
  }, [headerContentRef]);

  return (
    <article className={classNames(cx("policies-header"))}>
      <h1 ref={headerContentRef}>{title}</h1>
    </article>
  );
}

export default PoliciesHeader;
