import axios from "axios";

export const updateBin = async (item, id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    const data = await axios.post(
      `${process.env.REACT_APP_URL}/bin/update-bin?id=${id}`,
      item,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
