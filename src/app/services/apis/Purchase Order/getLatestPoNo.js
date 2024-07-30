import axios from "axios";

export const getLatestPoNo = async () => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/purchase-order/latest-po-no`,
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
