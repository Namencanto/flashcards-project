import classNames from "classnames/bind";
import classes from "./Premium.module.scss";

import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";

import { premiumTypes } from "../../../../MainPage/Price/Price";

import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "./InvoiceDocument/InvoiceDocument";

import { AuthContext } from "../../../../../context/AuthContext";

import { saveAs } from "file-saver";
import UserSettingsHeader from "../UserSettingsHeader";

function Premium() {
  const cx = classNames.bind(classes);
  const [displayDropdown, setDisplayDropdown] = useState("");

  const { currentUser } = useContext(AuthContext);

  const [isFetched, setIsFetched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userPremiumHistory, setUserPremiumHistory] = useState({});

  const dropdownRef = useRef(null);

  const handleDownload = (blob, pdfName) => {
    saveAs(blob, pdfName);
  };
  const fetchPremiumBuyHistory = async () => {
    setIsFetched(false);
    try {
      const res = await axios.get("/premium/");
      setUserPremiumHistory(res.data);
    } catch (err) {
      setErrorMessage(err.response.data);
      setIsFetched(true);
      console.log(err);
    }
    setIsFetched(true);
  };
  useEffect(() => {
    fetchPremiumBuyHistory();
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.tagName !== "SPAN") {
        setDisplayDropdown(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setDisplayDropdown]);

  const unsubscribe = async () => {
    try {
      const res = await axios.post("/premium/unsubscribe");
      console.log(res);
      fetchPremiumBuyHistory();
    } catch (err) {
      console.log(err);
    }
  };
  function compareDates(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }
  return (
    <div className={classNames(cx("premium"))}>
      <UserSettingsHeader title={"Premium settings"} />

      {isFetched ? (
        <>
          <div className={classNames(cx("premium-content"))}>
            <h2>Premium buy history:</h2>
            {userPremiumHistory.length ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Premium Type</th>
                      <th>Date</th>
                      <th>Payment method</th>
                      <th>Expiry</th>
                      <th>Payment amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userPremiumHistory.map((transaction, i) => {
                      const purchaseDate = new Date(transaction.date);
                      const currentDate = new Date();
                      let stringTransactionDate = new Date(transaction.date);
                      stringTransactionDate =
                        stringTransactionDate.toLocaleString(
                          navigator.language
                        );
                      let stringExpiryDate = new Date(transaction.expiry);
                      stringExpiryDate = stringExpiryDate.toLocaleString(
                        navigator.language
                      );

                      return (
                        <tr key={i}>
                          <td>{transaction.premium_type}</td>
                          <td>{stringTransactionDate}</td>
                          <td>{transaction.payment_method}</td>
                          <td>
                            {stringExpiryDate}
                            {transaction.unsubscribed && (
                              <p
                                className={classNames(
                                  cx("premium-unsubscribed")
                                )}
                              >
                                (unsubscribed)
                              </p>
                            )}
                          </td>
                          <td>{transaction.payment_amount}</td>

                          <td
                            ref={dropdownRef}
                            className={classNames(cx("premium-dropdown"))}
                          >
                            <div
                              className={classNames(
                                cx("premium-dropdown-dots")
                              )}
                              onClick={() => {
                                if (displayDropdown === i + 1) {
                                  setDisplayDropdown(false);
                                } else {
                                  setDisplayDropdown(i + 1);
                                }
                              }}
                            >
                              <span>&#8942;</span>
                            </div>
                            {displayDropdown === i + 1 && (
                              <ul
                                className={classNames(
                                  cx("premium-dropdown-menu")
                                )}
                              >
                                {displayDropdown ? (
                                  <>
                                    {transaction.premium_type !==
                                      premiumTypes[0].premiumType &&
                                    compareDates(purchaseDate, currentDate) ? (
                                      <li onClick={unsubscribe}>Unsubscribe</li>
                                    ) : (
                                      ""
                                    )}
                                    {transaction ? (
                                      <PDFDownloadLink
                                        document={
                                          <InvoiceDocument
                                            invoice={{
                                              id: transaction.id,
                                              invoice_no: transaction.id,
                                              vatNumber: transaction.vat_number,
                                              paymentMethod:
                                                transaction.payment_method,
                                              company: transaction.company,
                                              email: currentUser.email,
                                              address: `${transaction.zip_code} ${transaction.address} ${transaction.country}`,
                                              trans_date: stringTransactionDate,
                                              items: [
                                                {
                                                  sno: 1,
                                                  desc: `${transaction.premium_type} premium account purchase`,
                                                  qty: 1,
                                                  rate: transaction.payment_amount,
                                                },
                                              ],
                                            }}
                                          />
                                        }
                                      >
                                        {({ blob, url, loading, error }) =>
                                          loading ? (
                                            <li>loading...</li>
                                          ) : (
                                            <li
                                              className={classNames(
                                                cx("premium-dropdown-button")
                                              )}
                                              onClick={(e) => {
                                                e.preventDefault();

                                                handleDownload(
                                                  blob,
                                                  transaction.vat_number
                                                    ? "invoice.pdf"
                                                    : "receipt.pdf"
                                                );
                                              }}
                                            >
                                              {transaction.vat_number
                                                ? "Invoice"
                                                : "Receipt"}
                                            </li>
                                          )
                                        }
                                      </PDFDownloadLink>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ) : (
                                  ""
                                )}
                              </ul>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p style={{ color: "red", marginTop: "0.5rem" }}>
                  {errorMessage}
                </p>
              </>
            ) : (
              <p>
                Purchase history is currently empty, purchase something in our
                app to see the history here
              </p>
            )}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default Premium;
