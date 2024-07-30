import axios from "axios";

export const updateParty = async (details, id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/party-name-master/update-party-name-master?id=${id}`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
