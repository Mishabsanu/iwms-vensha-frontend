import axios from "axios";

export const getUserLogList = async (page) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/user/list-user-logs?page=${page}`,
      config
    );
    return data?.data;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
