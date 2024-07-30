import axios from "axios";

export const getRatePerMeter = async (
  fabric_code,
  supplier_master_id,
  purchase_item_name
) => {
  try {
    const parameter = {
      fabric_code: fabric_code ? fabric_code : "",
      supplier_master_id: supplier_master_id ? supplier_master_id : "",
      purchase_item_name: purchase_item_name ? purchase_item_name : "",
    };
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/purchase-order/fetch-latest-rate?supplier_fabric_code=${parameter.fabric_code}&supplier_master_id=${parameter.supplier_master_id}&purchase_item_name=${parameter.purchase_item_name}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
