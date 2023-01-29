import nodemailer from "nodemailer";

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

const transporter = nodemailer.createTransport({
  // for bigger app better use something like mailgun or sendgrid than gmail
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export function sendMail(mailOptions, res, message) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json("Something went wrong...");
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json(message);
    }
  });
}
