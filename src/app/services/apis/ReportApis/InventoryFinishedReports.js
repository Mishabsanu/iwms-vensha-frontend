import axios from "axios";

export const downloadInventoryFinishedReport = async (inputs) => {
  // console.log(inputs);
  if (inputs.finished_item_name == undefined) {
    inputs.finished_item_name = "";
  }
  if (inputs.finished_rack_details == undefined) {
    inputs.finished_rack_details = "";
  }
  if (inputs.purchase_order_no == undefined) {
    inputs.purchase_order_no = "";
  }
  if (inputs.supplier_name == undefined) {
    inputs.supplier_name = "";
  }
  if (inputs.finished_size == undefined) {
    inputs.finished_size = "";
  }

  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/finished-good-inventory/finished-download-excel?supplier_name=${inputs.supplier_name}&finished_size=${inputs.finished_size}&finished_item_name=${inputs.finished_item_name}&finished_rack_details=${inputs.finished_rack_details}&purchase_order_no=${inputs.purchase_order_no}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
