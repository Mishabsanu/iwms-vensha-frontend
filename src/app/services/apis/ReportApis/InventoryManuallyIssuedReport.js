import axios from "axios";

export const downloadRawManuallyIssuedReport = async (inputs) => {
  if (inputs.kc_fabric_code == undefined) {
    inputs.kc_fabric_code = "";
  }
  if (inputs.raw_manually_order_no == undefined) {
    inputs.raw_manually_order_no = "";
  }

  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/raw-inventory/manually-raw-download-excel?kc_fabric_code=${inputs.kc_fabric_code}&raw_manually_order_no=${inputs.raw_manually_order_no}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
