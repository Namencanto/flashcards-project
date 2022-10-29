import axios from "axios";
export default axios.create({
  baseURL:
    "https://doomy-backend-techcards-default-rtdb.europe-west1.firebasedatabase.app/",
});
