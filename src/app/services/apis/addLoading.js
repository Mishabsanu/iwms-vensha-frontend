import axios from "axios";

export const addLoading = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/loading/add-loading`,
      details,
      config
    );

    return data;
  } catch (error) {
    return error.response;
  }
};
