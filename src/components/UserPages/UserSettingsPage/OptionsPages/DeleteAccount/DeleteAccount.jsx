import classNames from "classnames/bind";
import classes from "./DeleteAccount.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

function DeleteAccount() {
  const cx = classNames.bind(classes);
  return (
    <div className={classNames(cx("delete-account"))}>
      <h1>Delete account</h1>
      <div className={classNames(cx("delete-account-container"))}>
        <div className={classNames(cx("delete-account-content"))}>
          <div className="input-default">
            <input id="email" type="email" placeholder=" " />
            <label htmlFor="email">E-mail</label>
          </div>
          <div className="input-default" style={{ marginTop: "1.5rem" }}>
            <input id="password" type="password" placeholder=" " />
            <label htmlFor="password">Password</label>
          </div>
          <div className={classNames(cx("delete-account-content-checkbox"))}>
            <label htmlFor="delete-account">
              Account will be deleted permamently
            </label>
            <input id="delete-account" type="checkbox" />
          </div>
        </div>
        <button className="btn-solid-large">Submit</button>
      </div>
    </div>
  );
}

export default DeleteAccount;
