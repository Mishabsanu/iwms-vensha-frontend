import axios from "axios";

export const updatePurchaseStatus = async (purchase_order_id, id, details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.patch(
      `${process.env.REACT_APP_URL}/api/purchase-order/change-po-item-status?id=${id}&purchase_order_id=${purchase_order_id}`,
      { po_item_status: details },
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
