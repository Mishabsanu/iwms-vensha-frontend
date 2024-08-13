import axios from "axios";

export const addProduction = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/production/add-production`,
      details,
      config
    );
    console.log(data,'data');
    

    return data;
  } catch (error) {
    return error.response;
  }
};
