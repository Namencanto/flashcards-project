import classes from "../PaymentMethods.module.scss";
import classNames from "classnames/bind";

import React, { useState } from "react";
import paypalButton from "../../../../../images/paypal-btn.png";
const Paypal = ({ total }) => {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("payment-methods-paypal"))}>
      {<img src={paypalButton} alt="Pay with PayPal" />}
    </div>
  );
};

export default Paypal;
