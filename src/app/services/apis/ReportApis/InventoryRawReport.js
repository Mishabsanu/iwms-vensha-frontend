import axios from "axios";

export const downloadInventoryRawReport = async (inputs) => {
  if (inputs.kc_fabric_code == undefined) {
    inputs.kc_fabric_code = "";
  }
  if (inputs.supplier_name == undefined) {
    inputs.supplier_name = "";
  }
  if (inputs.purchase_order_no == undefined) {
    inputs.purchase_order_no = "";
  }
  if (inputs.raw_rack_details == undefined) {
    inputs.raw_rack_details = "";
  }

  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/raw-inventory/raw-download-excel?kc_fabric_code=${inputs.kc_fabric_code}&supplier_name=${inputs.supplier_name}&purchase_order_no=${inputs.purchase_order_no}&raw_rack_details=${inputs.raw_rack_details}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
