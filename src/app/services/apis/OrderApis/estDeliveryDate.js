import { dateFun } from "app/utils/constants/functions";
import axios from "axios";

export const updateEstExpDeliveryDate = async (id, date, order_type) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    if (order_type == "shop") {
      const res = await axios.patch(
        `${process.env.REACT_APP_URL}/api/shop-order-dispatch/update-shop-order-exp-delivery-date?id=${id}`,
        { shop_order_item_est_delivery_date: dateFun(date) },
        config
      );
      return res?.data;
    } else {
      const res = await axios.patch(
        `${process.env.REACT_APP_URL}/api/dispatch/update-est-delivery-date-order?order_items_id=${id}`,
        { order_item_est_delivery_date: dateFun(date) },
        config
      );
      return res?.data;
    }
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
