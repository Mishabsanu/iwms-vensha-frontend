import axios from "axios";

export const updateProduction = async (details, id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/production/update-production?id=${id}`,
      details,
      config
    );
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
