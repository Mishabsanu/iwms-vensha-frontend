import axios from "axios";

export const sendResetMail = async (email) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/auth/forget-password`,
      email,
      config
    );
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
