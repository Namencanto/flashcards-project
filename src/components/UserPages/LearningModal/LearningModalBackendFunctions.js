import axios from "axios";

export const sendKnowedTechcardToChange = async (id, round) => {
  try {
    const res = await axios.post("/learnings/changeTechcardStatus", {
      id,
      round,
      type: "KNOWED",
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
export const sendUnknowedTechcardToChange = async (id, round) => {
  console.log(id);
  try {
    const res = await axios.post("/learnings/changeTechcardStatus", {
      id,
      round,
      type: "UNKNOWED",
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
