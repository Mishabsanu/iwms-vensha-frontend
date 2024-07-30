import { dateFun } from "app/utils/constants/functions";
import axios from "axios";

export const updateExpDeliveryDate = async (id, date, orderType) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    if (orderType == "shop") {
      const res = await axios.patch(
        `${process.env.REACT_APP_URL}/api/shop-order-dispatch/update-shop-order-dispath-est-delivery-date?id=${id}`,
        { shop_order_dispatch_est_delivery_date: dateFun(date) },
        config
      );
      return res?.data;
    } else {
      const res = await axios.patch(
        `${process.env.REACT_APP_URL}/api/dispatch/update-exp-delivery-date?dispatch_id=${id}`,
        { dispatch_est_delivery_date: dateFun(date) },
        config
      );
      return res?.data;
    }
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
