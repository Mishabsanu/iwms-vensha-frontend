import axios from "axios";

export const downloadInventoryAddOnsReport = async (inputs) => {
  // console.log(inputs);
  if (inputs.order_item_name == undefined) {
    inputs.order_item_name = "";
  }
  if (inputs.order_no == undefined) {
    inputs.order_no = "";
  }

  if (inputs.order_item_job_work_id == undefined) {
    inputs.order_item_job_work_id = "";
  }
  if (inputs.order_item_factory_name == undefined) {
    inputs.order_item_factory_name = "";
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
      }/api/production/addons-download-excel?order_no=${
        inputs.order_no
      }&order_item_job_work_id=${
        inputs.order_item_job_work_id
      }&order_item_name=${inputs.order_item_name.replace(
        / /g,
        "+"
      )}&order_item_factory_name=${inputs.order_item_factory_name.replace(
        / /g,
        "+"
      )}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
