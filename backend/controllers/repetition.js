import { db } from "../config/db.js";
import { checkToken } from "./checkToken.js";

export const getRepetitionData = (req, res) => {
  checkToken(req, res, ({ id }) => {
    const qTechcardsData =
      "SELECT `id`, `status`, `when_the_status_can_be_changed`, `next_repetition_date` FROM `techcards` WHERE `user_uid` = ?;";
    const qUserLearningDifficult =
      "SELECT `learning_difficult` FROM `users` WHERE `id` = ?;";
    db.query(qTechcardsData + qUserLearningDifficult, [id, id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json([
        {
          repetitionsData: data[0],
          learningDifficult: data[1][0].learning_difficult,
        },
      ]);
    });
  });
};
export const postRepetitionData = (req, res) => {
  checkToken(req, res, ({ id }) => {
    const qTechcardsData =
      "SELECT `status`, `when_the_status_can_be_changed`, `next_repetition_date` FROM `techcards` WHERE `user_uid` = ?";
    const qUserLearningDifficult =
      "SELECT `learning_difficult` FROM `users` WHERE `user_uid` = ?";

    db.query(qTechcardsData + qUserLearningDifficult, [id, id], (err, data) => {
      if (err) return res.status(500).send(err);
      console.log(data);

      return res.status(200).json([
        {
          statuses: [],
          whenTheDataCanBeChanged: [],
          learningDifficult: [],
          nextRepetitionDate: [],
        },
      ]);
    });
  });
};
