import axios from "axios";

export const getOrderNoList = async (orderType) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    if (orderType == "shop") {
      const data = await axios.get(
        `${process.env.REACT_APP_URL}/api/shop-order-dispatch/get-all-shop-order-no-list`,
        config
      );
      return data?.data?.result;
    } else {
      const data = await axios.get(
        `${process.env.REACT_APP_URL}/api/list-order/get-all-order_no-list`,
        config
      );
      return data?.data?.result;
    }
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
