import axios from "axios";

export const downloadNewOrderReport = async (inputs) => {
  // console.log(inputs);
  if (inputs.order_item_name == undefined) {
    inputs.order_item_name = "";
  }
  if (inputs.order_no == undefined) {
    inputs.order_no = "";
  }
  if (inputs.order_port_no_and_name == undefined) {
    inputs.order_port_no_and_name = "";
  }
  if (inputs.order_item_job_work_id == undefined) {
    inputs.order_item_job_work_id = "";
  }
  if (inputs.order_item_factory_name == undefined) {
    inputs.order_item_factory_name = "";
  }
  if (inputs.order_item_status == undefined) {
    inputs.order_item_status = "";
  }
  if (inputs.order_est_delivery_date_from == undefined) {
    inputs.order_est_delivery_date_from = "";
  }
  if (inputs.order_est_delivery_date_to == undefined) {
    inputs.order_est_delivery_date_to = "";
  }

  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${
        process.env.REACT_APP_URL
      }/api/challan/job-work-not-issued-download-excel?order_no=${
        inputs.order_no
      }&order_item_job_work_id=${
        inputs.order_item_job_work_id
      }&order_item_name=${inputs.order_item_name.replace(
        / /g,
        "+"
      )}&order_item_factory_name=${inputs.order_item_factory_name.replace(
        / /g,
        "+"
      )}&order_port_no_and_name=${
        inputs.order_port_no_and_name
      }&order_item_status=${
        inputs.order_item_status
      }&order_est_delivery_date_from=${
        inputs.order_est_delivery_date_from
      }&order_est_delivery_date_to=${inputs.order_est_delivery_date_to}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
