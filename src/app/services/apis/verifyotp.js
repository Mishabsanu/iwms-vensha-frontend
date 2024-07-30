import axios from "axios";

export const verifyOTP = async (details) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/auth/verify-otp`,
      details,
      config
    );
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
