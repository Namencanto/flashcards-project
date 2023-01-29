import { db } from "../config/db.js";
import { sendMail } from "./emailBotConfig.js";

export const postNewsletter = (req, res) => {
  try {
    const emailToNewsletter = req.body.email;

    // Email data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailToNewsletter,
      subject: "Welcome to Techcards Newsletter",
      text: "Dear Customer, Thank you for joining the Techcards newsletter. We are thrilled that you want to stay updated on the latest promotions and new releases on our website. We will be sending you regular updates on new products, sales, and special offers, so you will have the first pick on the latest and greatest products. If you have any questions or suggestions regarding our website or offerings, please don't hesitate to contact us. We will be happy to answer any and all of your questions. Thank you for choosing Techcards and we look forward to more transactions with you. Sincerely, The Techcards Team",
      html: '<div style="background-color: #5f4dee; color: white; padding: 20px; "><h1 style="color: white;margin-bottom: 20px;">Welcome to Techcards Newsletter</h1><p style="font-size: 18px; margin-bottom: 20px;">Dear Customer,</p><p style="font-size: 16px; margin-bottom: 20px; ">Thank you for joining the Techcards newsletter. We are thrilled that you want to stay updated on the latest promotions and new releases on our website.</p><p style="font-size: 16px; margin-bottom: 20px;">We will be sending you regular updates on new products, sales, and special offers, so you will have the first pick on the latest and greatest products.</p><p style="font-size: 16px; margin-bottom: 20px;">If you have any questions or suggestions regarding our website or offerings, please don&apos;t hesitate to contact us. We will be happy to answer any and all of your questions.</p><p style="font-size: 16px; margin-bottom: 20px;">Thank you for choosing Techcards and we look forward to more transactions with you.</p><p style="font-size: 18px; margin-bottom: 20px; ">Sincerely,</p><div style="margin-top: 50px; text-align: center;">  <p style="font-size: 18px;">The Techcards Team</p><img src="https://em-content.zobj.net/source/skype/289/white-heart_1f90d.png" alt="heart" style="width: 100px;"></div></div>',
    };

    const qCheckEmailExist = "SELECT `email` FROM `users` WHERE `email` = ?";
    const qSetNewsletter =
      "UPDATE `users` SET `notifications` = 1 WHERE `email` = ? AND `notifications` = 0";
    db.query(qCheckEmailExist, [emailToNewsletter], (err, dataCheck) => {
      if (dataCheck.length > 0) {
        db.query(
          qSetNewsletter,
          [emailToNewsletter],
          (err, dataSetNewsletter) => {
            if (dataSetNewsletter) {
              sendMail(
                mailOptions,
                res,
                "Successfully added email to newsletter"
              );
            }
            if (dataSetNewsletter.changedRows === 0) {
              return res.status(400).json("Email is already in the newsletter");
            }
          }
        );
      }

      if (dataCheck.length === 0) {
        console.log("dataCheck.length === 0");
        const qSetEmailToNewsletter =
          "INSERT INTO `newsletter_emails` SET `email` = ?";
        db.query(qSetEmailToNewsletter, [emailToNewsletter], (err, data) => {
          if (!data) {
            return res.status(400).json("Email is already in the newsletter");
          }
          if (data) {
            sendMail(
              mailOptions,
              res,
              "Successfully added email to newsletter"
            );
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).json("Something went wrong...");
  }
};
