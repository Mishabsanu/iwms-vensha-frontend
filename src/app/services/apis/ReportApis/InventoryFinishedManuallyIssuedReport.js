import axios from "axios";

export const downloadFinishedManuallyIssuedReport = async (inputs) => {
  if (inputs.finished_item_name == undefined) {
    inputs.finished_item_name = "";
  }
  if (inputs.finished_manually_order_no == undefined) {
    inputs.finished_manually_order_no = "";
  }

  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/finished-good-inventory/manually-finished-download-excel?finished_item_name=${inputs.finished_item_name}&finished_manually_order_no=${inputs.finished_manually_order_no}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
