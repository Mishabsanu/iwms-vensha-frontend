import axios from "axios";

export const cancelOrderItem = async (data) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const res = await axios.patch(
      `${process.env.REACT_APP_URL}/api/order/cancelled-order_item?order_items_id=${data.order_items_id}`,
      data,
      config
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
