import axios from "axios";

export const getFactoryNameList = async (id) => {
  try {
    if (id == undefined) {
      id = "";
    }
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/list/factory-list?id=${id}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
