import axios from "axios";

export const sendKnownTechcardToChange = async (
  id,
  round,
  fetchRepetitions
) => {
  try {
    const res = await axios.post("/learnings/changeTechcardStatus", {
      id,
      round,
      type: "KNOWED",
    });
    console.log(res);
    console.log(res);
    fetchRepetitions();
  } catch (err) {
    console.log(err);
  }
};
export const sendUnknownTechcardToChange = async (
  id,
  round,
  fetchRepetitions
) => {
  console.log(id);
  try {
    const res = await axios.post("/learnings/changeTechcardStatus", {
      id,
      round,
      type: "UNKNOWED",
    });
    console.log(res);
    fetchRepetitions();
  } catch (err) {
    console.log(err);
  }
};
