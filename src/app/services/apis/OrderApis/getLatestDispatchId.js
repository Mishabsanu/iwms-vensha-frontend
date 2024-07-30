import axios from "axios";

export const getLatestDispatchId = async (orderType) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    if (orderType == "shop") {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/shop-order-dispatch/get-dispatch-id`,
        config
      );
      return res?.data?.result.shop_order_dispatch_id;
    } else {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/dispatch/get-dispatch-id`,
        config
      );
      return res?.data?.result.dispatch_id;
    }
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
