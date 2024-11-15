import axios from "axios";

export const updateDelivery = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/delivery/update-delivery?id=${details.id}`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
