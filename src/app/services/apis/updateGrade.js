import axios from "axios";

export const updateGrade = async (details, id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/grade-master/update-grade-master?id=${id}`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
