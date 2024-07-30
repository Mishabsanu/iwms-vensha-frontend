import axios from "axios";

export const downloadSalesListReport = async (inputs) => {
  if (inputs?.order_port_no_and_name == undefined) {
    inputs.order_port_no_and_name = "";
  }
  if (inputs?.order_no == undefined) {
    inputs.order_no = "";
  }
  if (inputs?.order_item_name == undefined) {
    inputs.order_item_name = "";
  }

  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/sales/sales-download-excel?order_port_no_and_name=${inputs.order_port_no_and_name}&order_no=${inputs.order_no}&order_item_name=${inputs.order_item_name}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
