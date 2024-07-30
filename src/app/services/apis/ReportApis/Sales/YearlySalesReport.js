import axios from "axios";

export const downloadYearlySalesListReport = async (inputs) => {
  if (inputs?.gender == undefined) {
    inputs.gender = "";
  }
  if (inputs?.month_year == undefined) {
    inputs.month_year = "";
  }
  if (inputs?.month == undefined) {
    inputs.month = "";
  }

  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/sales/monthly-sales-download-excel?gender=${inputs.gender}&month_year=${inputs.month_year}&month=${inputs.month}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
