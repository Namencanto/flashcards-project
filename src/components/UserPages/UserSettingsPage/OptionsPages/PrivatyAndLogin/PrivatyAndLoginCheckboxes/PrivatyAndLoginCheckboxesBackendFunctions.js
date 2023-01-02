import axios from "axios";

export const emailNotificationsHandler = async (checked) => {
  try {
    const res = await axios.post("/users/privaty-login-public-notifications", {
      notifications: checked ? 1 : 0,
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
export const publicProfileHandler = async (checked) => {
  try {
    const res = await axios.post("/users/privaty-login-public-notifications", {
      public: checked ? 1 : 0,
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
