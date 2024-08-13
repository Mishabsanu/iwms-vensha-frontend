import axios from "axios";

export const productionReport = async (detsils) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/production/production-report`,
      detsils,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
