import axios from "axios";

export const addOutbound = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/outbound/add-outbound`,
      details,
      config
    );
   

    return data;
  } catch (error) {
    return error.response;
  }
};
