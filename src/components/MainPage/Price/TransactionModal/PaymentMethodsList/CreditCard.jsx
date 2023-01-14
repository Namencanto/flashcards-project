import classes from "../PaymentMethods.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import axios from "axios";
import Invoice from "./Invoice/Invoice";
function CreditCard({ membership }) {
  const cx = classNames.bind(classes);

  const [invoiceIsVisible, setInvoiceIsVisible] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [serverMessageClassName, setServerMessageClassName] = useState();
  const [cardNumberErrorMessage, setCardNumberErrorMessage] = useState();
  const [cvcErrorMessage, setCvcErrorMessage] = useState();
  const [dateErrorMessage, setDateErrorMessage] = useState();
  const [invoiceErrorMessage, setInvoiceErrorMessage] = useState("");

  function validateYear(year) {
    const currentYear = new Date().getFullYear();

    if (year >= currentYear && year <= 2031) {
      return true;
    } else {
      return false;
    }
  }

  const completePurchasePremiumAccount = async (e) => {
    e.preventDefault();
    try {
      const cardNumber = e.target["card-number"].value;
      const cvc = e.target.cvc.value;
      const month = e.target.month.value;
      const year = e.target.year.value;

      const invoiceData = {
        vatNumber: e.target["vat-number"]?.value,
        company: e.target.company?.value,
        firstName: e.target["first-name"]?.value,
        lastName: e.target["last-name"]?.value,
        zipCode: e.target["zip-code"]?.value,
        address: e.target.address?.value,
        country: e.target.country?.value,
      };

      let validInvoice = false;
      for (const value in invoiceData) {
        if (invoiceData[value] !== "" || invoiceData[value]) {
          validInvoice = true;
        }
        if (invoiceData[value] === "" || !invoiceData[value]) {
          validInvoice = false;
          break;
        }
      }

      if (cardNumber.length < 13)
        // dummy validation
        setCardNumberErrorMessage("Please enter valid card number");
      else setCardNumberErrorMessage("");
      if (cvc.length < 3 || cvc.length > 5)
        setCvcErrorMessage("Please enter valid cvc number");
      else setCvcErrorMessage("");
      if (!month >= 1 && !month.length <= 12 && !validateYear(year))
        setDateErrorMessage("Please enter valid date");
      else setDateErrorMessage("");

      // place for send to gateway ...

      // after, send to backend

      if (invoiceIsVisible && !validInvoice) {
        return setInvoiceErrorMessage("Invalid credentials");
      }
      if (
        cardNumber.length >= 13 &&
        cardNumber.length <= 19 &&
        cvc.length >= 3 &&
        cvc.length <= 5 &&
        month >= 1 &&
        month <= 12 &&
        validateYear(year)
      ) {
        const postData = validInvoice
          ? {
              premiumType: membership.premiumType,
              paymentMethod: "Credit card",
              paymentAmount: membership.price,
              invoiceData,
            }
          : {
              premiumType: membership.premiumType,
              paymentMethod: "Credit card",
              paymentAmount: membership.price,
            };
        const res = await axios.post("/premium/", postData);
        console.log(res);
        setServerMessage(res.data);
        setServerMessageClassName("server-accepted-large");
      }
    } catch (err) {
      setServerMessage(err.response.data);

      setServerMessageClassName("server-denied-large");
    }
  };

  return (
    <div className={classNames(cx("payment-methods-card"))}>
      <h2>Pay with card</h2>
      <form onSubmit={completePurchasePremiumAccount}>
        <div className="input-default">
          <input
            id="card-number"
            type="tel"
            placeholder=" "
            inputmode="numeric"
            autocomplete="cc-number"
            maxlength="19"
          />
          <label htmlFor="card-number">Card Number</label>
          <p style={{ color: "red" }}>{cardNumberErrorMessage}</p>
        </div>
        <div className={classNames(cx("payment-methods-card-input-box"))}>
          <div style={{ marginRight: "1rem" }} className="input-default">
            <input placeholder=" " id="cvc" type="number" max="99999" />
            <label htmlFor="cvc">CVC</label>
            <p style={{ color: "red" }}>{cvcErrorMessage}</p>
          </div>

          <div className="input-default">
            <input
              type="text"
              id="month"
              placeholder=" "
              maxlength="2"
              size="2"
            />
            <label htmlFor="month">Month</label>
          </div>
          <div style={{ marginLeft: "1rem" }} className="input-default">
            <input
              type="text"
              id="year"
              placeholder=" "
              maxlength="4"
              size="4"
            />
            <label htmlFor="year">Year</label>
            <p style={{ color: "red", marginLeft: "-50%" }}>
              {dateErrorMessage}
            </p>
          </div>
        </div>

        <div className="input-checkbox">
          <input
            type="checkbox"
            id="name"
            onClick={(e) => {
              if (e.target.checked) {
                setInvoiceIsVisible(true);
              } else {
                setInvoiceIsVisible(false);
              }
            }}
          />
          <label htmlFor="name"> I want got an invoice</label>
        </div>
        {invoiceIsVisible ? (
          <Invoice invoiceErrorMessage={invoiceErrorMessage} />
        ) : (
          ""
        )}

        <button className="btn-solid-large">Make payment</button>
      </form>
      <p style={{ marginTop: "1rem" }} className={serverMessageClassName}>
        {serverMessage}
      </p>
    </div>
  );
}

export default CreditCard;
