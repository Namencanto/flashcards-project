import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { passwordValidation } from "./server-validations/inputsValidation.js";
import { emailValidation } from "./server-validations/inputsValidation.js";
import { nickValidation } from "./server-validations/inputsValidation.js";

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
  const qEmail = "SELECT * FROM users WHERE email = '" + email + "';";
  const qNick = "SELECT * FROM users WHERE nick = '" + nick + "'";

  db.query(qEmail, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email already exists!");

    db.query(qNick, (err, data) => {
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
    if (data.length === 0) return res.status(404).json("User not found!");

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
