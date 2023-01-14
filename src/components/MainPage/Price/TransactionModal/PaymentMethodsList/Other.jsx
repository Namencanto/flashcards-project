import classes from "../PaymentMethods.module.scss";
import classNames from "classnames/bind";

import blikImage from "../../../../../images/blik.png";
import traditionalBankTransfer from "../../../../../images/Przelew.png";

function Other() {
  const cx = classNames.bind(classes);
  return (
    <div className={classNames(cx("payment-methods-other"))}>
      <img src={blikImage} alt="blik payment" />
      <img src={traditionalBankTransfer} alt="traditional bank transfer" />
    </div>
  );
}

export default Other;
