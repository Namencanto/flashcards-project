import { db } from "../config/db.js";
import { checkToken } from "./checkToken.js";

export const getPremiumData = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const q = "SELECT * FROM `users_premium` WHERE `user_uid` = ?";
    db.query(q, userInfo.id, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });
  });
};
export const postPremiumData = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const { premiumType, paymentMethod, paymentAmount, invoiceData } = req.body;

    let expiry = new Date();
    let currentDate = new Date();

    if (premiumType === "Trial") {
      expiry.setDate(expiry.getDate() + 14);
    }
    if (premiumType === "Advanced") {
      expiry.setFullYear(expiry.getFullYear() + 1);
    }
    if (premiumType === "Complete") {
      expiry.setFullYear(expiry.getFullYear() + 1);
    }

    expiry = expiry.toISOString();
    expiry = expiry.split("T")[0] + " " + expiry.split("T")[1].slice(0, 8);

    currentDate = currentDate.toISOString();
    currentDate =
      currentDate.split("T")[0] + " " + currentDate.split("T")[1].slice(0, 8);

    let q = "";
    let dataToMySql = [
      premiumType,
      currentDate,
      paymentMethod,
      expiry,
      paymentAmount,
      userInfo.id,
    ];

    if (invoiceData) {
      for (const value in invoiceData) {
        if (invoiceData[value] !== "" || invoiceData[value]) {
          dataToMySql.push(invoiceData[value]);
        }
        if (invoiceData[value] === "" || !invoiceData[value]) {
          return res.status(400).send("Invalid invoice credentials");
        }
      }
    }

    const invoiceQuery =
      ", `vat_number` = ?, `company` = ?, `first_name` = ?, `last_name` = ?, `zip_code` = ?, `address` = ?, `country` = ?";
    const qDefault =
      "INSERT INTO `users_premium` SET `premium_type` = ?, `date` = ?, `payment_method` = ?, `expiry` = ?, `payment_amount` = ?, `user_uid` = ?";

    if (invoiceData) {
      q = qDefault + invoiceQuery;
    } else {
      q = qDefault;
    }
    db.query(q, dataToMySql, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json("Payment successful");
    });
  });
};
export const postUnsubscribePremium = (req, res) => {
  checkToken(req, res, (userInfo) => {
    try {
      function compareDates(date1, date2) {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
      }
      const qCheckDate =
        "SELECT * FROM `users_premium` WHERE `user_uid` = ? ORDER BY `date` DESC LIMIT 1;";

      db.query(qCheckDate, [userInfo.id], (err, checkData) => {
        const purchaseDate = new Date(checkData[0].date);
        const currentDate = new Date();

        if (!compareDates(purchaseDate, currentDate)) {
          res.status(400).send("The time for unsubscribe has passed");
        } else {
          const qUnsubscribe =
            "UPDATE `users_premium` SET `unsubscribed` = ?, `expiry` = ? WHERE (`id` = ?);";
          db.query(
            qUnsubscribe,
            [currentDate, currentDate, checkData[0].id],
            (err, unsubscribeData) => {
              return res.status(200).json("Successfully unsubscribed");
            }
          );
        }
      });
    } catch (err) {
      if (err) return res.status(500).send(err);
    }
  });
};
export const getCheckUserPremium = (req, res) => {
  checkToken(req, res, (userInfo) => {
    const q =
      "SELECT `expiry` FROM `users_premium` WHERE `user_uid` = ? ORDER BY `date` DESC LIMIT 1; ";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data[0].expiry);
    });
  });
};
