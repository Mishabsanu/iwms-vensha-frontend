import axios from "axios";

export const getInvoiceNoByID = async (order_items_id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/production/get-receive-based-on-item_id?order_items_id=${order_items_id}`,
      config
    );
    return data.data.result;
  } catch (error) {
    return error.response.data.result;
  }
};
