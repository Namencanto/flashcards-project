import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { passwordValidation } from "./server-validations/inputsValidation.js";
import { emailValidation } from "./server-validations/inputsValidation.js";
import { nickValidation } from "./server-validations/inputsValidation.js";
import { checkToken } from "./checkToken.js";
//

export const register = (req, res) => {
  // * CHECK EXISTING USER
  const { email, password, nick } = req.body;

  if (
    !passwordValidation(password) ||
    !emailValidation(email) ||
    !nickValidation(nick)
  ) {
    return res.status(422).json("Invalid credentials");
  }
  const qEmail = "SELECT * FROM users WHERE email = ?;";
  const qNick = "SELECT * FROM users WHERE nick = ?";

  db.query(qEmail, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email already exists!");

    db.query(qNick, [nick], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("Nick already exists!");

      // * HASH THE PASSWORD AND CREATE A USER
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const q = "INSERT INTO users(`email`,`password`,`nick`) VALUES (?)";
      const values = [email, hash, nick];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        // CREATE CREATE JWT

        db.query(
          "SELECT * FROM users WHERE id = ?",
          [data.insertId],
          (err, data) => {
            if (err) return res.status(500).json(err);

            const token = jwt.sign({ id: data[0].id }, "jwtkey", {
              expiresIn: "7d", // expires in 7 days
            });
            const { password, ...other } = data[0];

            // CREATE USER DESCRIPTION IN DB
            db.query(
              "INSERT INTO user_description(`uid`) VALUES (?)",
              [data[0].id],
              (err, data) => {
                if (err) return res.status(500).json(err);
              }
            );
            res
              .cookie("jwt", token, {
                maxAge: 7 * 60 * 60 * 60 * 1000,
                httpOnly: true,
              })
              .status(200)
              .json(other);
          }
        );
      });
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Wrong email or password");

    // * Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(404).json("Wrong email or password");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("jwt", {
      sameSite: "none",
      secure: true,
    })
    .clearCookie("jwtTime", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

// * CHANGE LOGIN DATA
export const changeUserLoginData = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    const { newEmail, newPassword, email, password } = req.body;
    console.log(newEmail, newPassword, email, password);
    // const q = "SELECT `notifications`, `public` FROM `users` WHERE `id` = ?";

    const qEmailSearch = "SELECT `id` FROM `users` WHERE `email` = ? LIMIT 1";
    const qVerifyUserLoginData =
      "SELECT `password` FROM `users` WHERE `email` = ? AND `id` = ?";

    db.query(qVerifyUserLoginData, [email, userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);
      if (data.length === 0)
        return res.status(404).json("Wrong email or password");

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!isPasswordCorrect)
        return res.status(404).json("Wrong email or password");

      // Change email and password case
      if (newEmail && newPassword) {
        console.log("ALL CASE");

        db.query(qEmailSearch, newEmail, (err, data) => {
          if (err) return res.status(500).send(err);
          if (data.length) return res.status(409).json("Email already exists!");

          // * HASH THE PASSWORD
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(newPassword, salt);

          const qAllCase =
            "UPDATE `users` SET `email` = ?, `password` = ? WHERE `id` = ?";

          db.query(qAllCase, [newEmail, hash, userInfo.id], (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).json("success");
          });
        });
      }

      // Change email case
      if (newEmail && !newPassword) {
        console.log("EMAIL CASE");

        db.query(qEmailSearch, newEmail, (err, data) => {
          if (err) return res.status(500).send(err);
          if (data.length) return res.status(409).json("Email already exists!");

          const qEmailCase = "UPDATE `users` SET `email` = ? WHERE `id` = ?";

          db.query(qEmailCase, [newEmail, userInfo.id], (err) => {
            if (err) return res.status(500).send(err);
            return res.status(200).json("Successfully changed email");
          });
        });
      }
      // Change password case
      if (newPassword && !newEmail) {
        console.log("PASSWORD CASE");

        // HASH THE PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        const qPasswordCase =
          "UPDATE `users` SET `password` = ? WHERE `id` = ?";

        db.query(qPasswordCase, [hash, userInfo.id], (err, data) => {
          if (err) return res.status(500).send(err);
          return res.status(200).json("Successfully changed password");
        });
      }
    });
  });
};

// * DELETE ACCOUNT PART
export const deleteAccount = (req, res) => {
  checkToken(req, res, async (userInfo) => {
    const { email, password } = req.body;
    const qVerifyUserLoginData =
      "SELECT `password` FROM `users` WHERE `email` = ? AND `id` = ?";

    const qDeleteAccount = "DELETE FROM `users` WHERE `id` = ?";

    db.query(qVerifyUserLoginData, [email, userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);
      if (data.length === 0)
        return res.status(404).json("Wrong email or password");

      const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);

      if (!isPasswordCorrect)
        return res.status(404).json("Wrong email or password");

      db.query(qDeleteAccount, [userInfo.id], (err, data) => {
        if (err) return res.status(500).send("Something went wrong...");

        res.cookie("account-deleted", true);
        res.clearCookie("jwt");
        res.clearCookie("jwtTime");
        return res.status(200).json(data);
      });
    });
  });
};

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

// * Send user their information
import nodemailer from "nodemailer";

export const postSendUserInformation = (req, res) => {
  try {
    const q = "SELECT * FROM users WHERE email = ?";
    const { userEmail, userPassword } = req.body;

    db.query(q, [userEmail], (err, data) => {
      if (data.length === 0)
        return res.status(404).json("Wrong email or password");

      //  Check password
      const isPasswordCorrect = bcrypt.compareSync(
        userPassword,
        data[0].password
      );

      if (!isPasswordCorrect)
        return res.status(404).json("Wrong email or password");

      const transporter = nodemailer.createTransport({
        // for bigger app better use something like mailgun or sendgrid than gmail
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Collect user premium data
      const collectUserPremiumData =
        "SELECT * FROM users_premium WHERE user_uid = ?;";

      db.query(
        collectUserPremiumData,
        [data[0].id, data[0].id],
        (err, userPremiumData) => {
          const userProfileData = data[0];

          let userProfileHTML = "<h3>User Profile Data</h3><ul>";

          // Create email syntax
          for (const key in userProfileData) {
            if (key !== "id" && key !== "password") {
              userProfileHTML += `<li>${key}: ${
                userProfileData[key].toString().startsWith("user-avatar-")
                  ? `${process.env.REACT_APP_URL}/${userProfileData[key]}`
                  : userProfileData[key]
              }</li>`;
            }
          }
          userProfileHTML += "</ul>";

          let userPremiumHTML = "";

          for (const userPremiumDataObject of userPremiumData) {
            userPremiumHTML += "<h3>User Premium Data</h3><ul>";
            for (const key in userPremiumDataObject) {
              if (key !== "id" && key !== "user_uid") {
                userPremiumHTML += `<li>${key}: ${userPremiumDataObject[key]}</li>`;
              }
            }
            userPremiumHTML += "</ul>";
          }

          // Email data
          const mailOptions = {
            from: "Techcards",
            to: "mateusz.ordon22@gmail.com",
            subject: "Please, these are all your data",
            text: "Check it out!",
            html: userProfileHTML + userPremiumHTML,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              return res.status(200).json("Data has been sent to your email");
            }
          });
        }
      );
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
