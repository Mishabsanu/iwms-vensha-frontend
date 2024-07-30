import axios from "axios";

export const updatePurchaseOrder = async (details, id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/api/purchase-order/update-purchase-order?purchase_order_id=${id}`,
      details,
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
