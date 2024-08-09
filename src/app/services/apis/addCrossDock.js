import axios from "axios";

export const addCrossDock = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/cross-dock/add-cross-dock-master`,
      details,
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error.response;
  }
};
