import classes from "./PaymentMethods.module.scss";
import classNames from "classnames/bind";

import { FaPaypal, FaBitcoin, FaMoneyBillWave } from "react-icons/fa";
import { ImPaypal } from "react-icons/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faBitcoinSign,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CreditCard from "./PaymentMethodsList/CreditCard";
import Paypal from "./PaymentMethodsList/Paypal";
import Bitcoin from "./PaymentMethodsList/Bitcoin";
import Other from "./PaymentMethodsList/Other";

import { premiumTypes } from "../Price";
function PaymentMethods({ membership }) {
  const [selectedOption, setSelectedOption] = useState(1);
  const cx = classNames.bind(classes);

  return (
    <>
      <div className={classNames(cx("payment-methods"))}>
        <div className={classNames(cx("payment-methods-options"))}>
          <button
            style={
              selectedOption === 1 ? { transform: "translateY(10%)" } : null
            }
            onClick={() => {
              setSelectedOption(1);
            }}
          >
            <FontAwesomeIcon
              style={selectedOption === 1 ? { color: "#5f4dee" } : null}
              icon={faCreditCard}
            />
            <p>Credit card</p>
          </button>
          {membership.premiumType !== premiumTypes[0].premiumType ? (
            <>
              <button
                style={
                  selectedOption === 2 ? { transform: "translateY(10%)" } : null
                }
                onClick={() => {
                  setSelectedOption(2);
                }}
              >
                <FaPaypal
                  style={selectedOption === 2 ? { color: "#5f4dee" } : null}
                />{" "}
                <p>Paypal</p>
              </button>
              <button
                style={
                  selectedOption === 3 ? { transform: "translateY(10%)" } : null
                }
                onClick={() => {
                  setSelectedOption(3);
                }}
              >
                <FaBitcoin
                  style={selectedOption === 3 ? { color: "#5f4dee" } : null}
                />{" "}
                <p>Bitcoin</p>
              </button>
              <button
                style={
                  selectedOption === 4 ? { transform: "translateY(10%)" } : null
                }
                onClick={() => {
                  setSelectedOption(4);
                }}
              >
                <FaMoneyBillWave
                  style={selectedOption === 4 ? { color: "#5f4dee" } : null}
                />
                <p>Other</p>
              </button>{" "}
            </>
          ) : (
            ""
          )}
        </div>

        {selectedOption === 1 ? (
          <CreditCard membership={membership} />
        ) : selectedOption === 2 ? (
          <Paypal />
        ) : selectedOption === 3 ? (
          <Bitcoin membership={membership} />
        ) : selectedOption === 4 ? (
          <Other />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default PaymentMethods;
