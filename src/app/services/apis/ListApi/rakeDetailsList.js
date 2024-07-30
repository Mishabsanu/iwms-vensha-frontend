import axios from "axios";

export const getRakeDetailsList = async (type) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    let data;
    if (type == "Raw") {
      data = await axios.get(
        `${process.env.REACT_APP_URL}/api/inventory/list/raw-rack-details-uniq-list`,
        config
      );
      return data?.data?.result;
    } else {
      data = await axios.get(
        `${process.env.REACT_APP_URL}/api/inventory/list/finished-rack-uniq-list`,
        config
      );
      return data?.data?.result;
    }
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
