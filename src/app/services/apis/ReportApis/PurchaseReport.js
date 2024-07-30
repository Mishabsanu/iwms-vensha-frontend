import axios from "axios";

export const downloadPurchaseReport = async (
  po_status,
  supplier_name,
  poDate,
  estimateDate,
  item_status,
  kc_code,
  po_no
) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/purchase-order/download-excel-Purchase_order?purchase_status=${po_status}&kc_fabric_code=${kc_code}&purchase_order_date=${poDate}&purchase_estimate_delivery_date=${estimateDate}&supplier_name=${supplier_name}&purchase_order_no=${po_no}&po_item_status=${item_status}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
