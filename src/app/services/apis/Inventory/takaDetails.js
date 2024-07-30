import axios from "axios";

export const takaDetails = async (PO_id, PO_item_id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/taka/taka-details?purchase_order_id=${PO_id}&po_item_details_id=${PO_item_id}`,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const itemDetailss = async (PO_id, PO_item_id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/finished-item/finished-details?purchase_order_id=${PO_id}&po_item_details_id=${PO_item_id}`,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
