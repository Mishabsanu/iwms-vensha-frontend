import axios from "axios";

export const addTruckLoading = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/truck-loading/add-truck-loading`,
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
