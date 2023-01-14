import classes from "../PaymentMethods.module.scss";
import classNames from "classnames/bind";

import React, { useState, useEffect } from "react";
import { premiumTypes } from "../../Price";

const Bitcoin = ({ membership }) => {
  const cx = classNames.bind(classes);

  const date = new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const [bitcoinValue, setBitcoinValue] = useState(0);

  useEffect(() => {
    if (membership.price > 0) {
      // Pobierz aktualną wartość bitcoina w dolarach za pomocą jakiejś API
      // Przykładowo, można użyć API https://api.coindesk.com/v1/bpi/currentprice.json
      fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((response) => response.json())
        .then((data) => {
          const bitcoinPrice = data.bpi.USD.rate_float;
          setBitcoinValue(membership.price / bitcoinPrice);
        });
    } else {
      setBitcoinValue(0);
    }
  }, [membership.price]);

  return (
    <div className={classNames(cx("payment-methods-bitcoin"))}>
      {/* <header className={classNames(cx("payment-methods-bitcoin-header"))}>
        <div>
          <div className={classNames(cx("payment-methods-bitcoin-1"))}>
            <img
              src="https://apirone.com/static/promo/bitcoin_logo_vector.svg"
              width="95"
              alt=""
            />
          </div>
        </div>
        <div style={{ textAlign: "center", backgroundColor: "#fff" }}>
          <span>
            {" "}
            <img
              src="https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=bitcoin%3MeSHt5CCBMoq14BNYjfCfp81ugFVjwZeC%3Famount%3D0.04656914&choe=UTF-8"
              style={{ display: "inline" }}
              alt="QR code for payment"
            />{" "}
          </span>{" "}
        </div>
      </header> */}
      <main>
        <div className={classNames(cx("payment-methods-bitcoin-1"))}>
          Please send{" "}
          <strong>
            <span>{bitcoinValue.toFixed(8)}</span>
          </strong>{" "}
          BTC to address:{" "}
        </div>
        <div className={classNames(cx("payment-methods-bitcoin-address"))}>
          3G4jREW4ATp8ez7WGVjh3UMPBtYTVLcmai
        </div>
        <div className={classNames(cx("payment-methods-bitcoin-topline"))}>
          <div>
            <div className={classNames(cx("payment-methods-bitcoin-item"))}>
              <div className={classNames(cx("payment-methods-bitcoin-label"))}>
                Merchant:
              </div>
              <div className={classNames(cx("payment-methods-bitcoin-value"))}>
                Techcards
              </div>
            </div>
            <div className={classNames(cx("payment-methods-bitcoin-item"))}>
              <div className={classNames(cx("payment-methods-bitcoin-label"))}>
                Amount to pay:
              </div>
              <div className={classNames(cx("payment-methods-bitcoin-value"))}>
                <span>{bitcoinValue.toFixed(8)}</span> BTC
              </div>
            </div>
            <div className={classNames(cx("payment-methods-bitcoin-item"))}>
              <div className={classNames(cx("payment-methods-bitcoin-label"))}>
                Arrived amount:
              </div>
              <div className={classNames(cx("payment-methods-bitcoin-value"))}>
                <span>0.00000000</span> BTC
              </div>
            </div>
            <div className={classNames(cx("payment-methods-bitcoin-item"))}>
              <div className={classNames(cx("payment-methods-bitcoin-label"))}>
                Remains to pay:
              </div>
              <div className={classNames(cx("payment-methods-bitcoin-value"))}>
                <b>
                  <span>{bitcoinValue.toFixed(8)}</span> BTC
                </b>
              </div>
            </div>
            <div className={classNames(cx("payment-methods-bitcoin-item"))}>
              <div className={classNames(cx("payment-methods-bitcoin-label"))}>
                Date:
              </div>
              <div className={classNames(cx("payment-methods-bitcoin-value"))}>
                {date}
              </div>
            </div>
            <div className={classNames(cx("payment-methods-bitcoin-item"))}>
              <div className={classNames(cx("payment-methods-bitcoin-label"))}>
                Transaction(s):
              </div>
              <div>
                <div>
                  <a
                    href="https://apirone.com/btc/tx/7915799c224327bc9a89cc44e8a98e09aca3ace17bd1f6f5a8423c69b6511b84"
                    target="_blank"
                  >
                    4115499c22...a6111b80
                  </a>
                  <div
                    className={classNames(
                      cx("payment-methods-bitcoin-confirm")
                    )}
                    title="Confirmations count"
                  >
                    1
                  </div>
                </div>
              </div>
            </div>
            <div className={classNames(cx("payment-methods-bitcoin-item"))}>
              <div className={classNames(cx("payment-methods-bitcoin-label"))}>
                Status:
              </div>
              <div className={classNames(cx("payment-methods-bitcoin-value"))}>
                <b>
                  <span>Waiting payment</span>
                </b>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bitcoin;
