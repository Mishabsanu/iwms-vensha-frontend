import axios from "axios";

export const getDispatchIdList = async (OrderType) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    if (OrderType == "shop") {
      const data = await axios.get(
        `${process.env.REACT_APP_URL}/api/shop-order-dispatch/dispatch-id-list`,
        config
      );
      return data?.data?.result;
    } else {
      const data = await axios.get(
        `${process.env.REACT_APP_URL}/api/dispatch/dispatch-id-list`,
        config
      );
      return data?.data?.result;
    }
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
