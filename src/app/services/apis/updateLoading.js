import axios from "axios";

export const updateLoading = async (details, id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/loading/update-loading?id=${id}`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
