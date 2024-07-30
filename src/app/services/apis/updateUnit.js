import axios from "axios";

export const updateUnit = async (details, id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/unit-master/update-unit-master?id=${id}`,
      details,
      config
    );
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
