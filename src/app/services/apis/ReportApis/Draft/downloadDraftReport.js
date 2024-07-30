import axios from "axios";

export const downloadDraftReport = async (inputs) => {
  if (inputs.order_item_name == undefined) {
    inputs.order_item_name = "";
  }
  if (inputs.order_no == undefined) {
    inputs.order_no = "";
  }
  if (inputs.order_port_no_and_name == undefined) {
    inputs.order_port_no_and_name = "";
  }
  if (inputs.order_item_kc_fabric_code == undefined) {
    inputs.order_item_kc_fabric_code = "";
  }
  if (inputs.order_date == undefined) {
    inputs.order_date = "";
  }
  if (inputs.supplier_name == undefined) {
    inputs.supplier_name = "";
  }
  if (inputs.order_est_delivery_date_from == undefined) {
    inputs.order_est_delivery_date_from = "";
  }
  if (inputs.order_est_delivery_date_to == undefined) {
    inputs.order_est_delivery_date_to = "";
  }
  if (inputs.order_item_draft_days == undefined) {
    inputs.order_item_draft_days = "";
  }
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/draft/draft-excel?order_item_name=${inputs.order_item_name}&order_item_kc_fabric_code=${inputs.order_item_kc_fabric_code}&order_port_no_and_name=${inputs.order_port_no_and_name}&order_no=${inputs.order_no}&order_date=${inputs.order_date}&supplier_name=${inputs.supplier_name}&order_item_draft_days=${inputs.order_item_draft_days}&order_est_delivery_date_from=${inputs.order_est_delivery_date_from}&order_est_delivery_date_to=${inputs.order_est_delivery_date_to}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
