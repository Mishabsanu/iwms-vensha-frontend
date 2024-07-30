import axios from "axios";

export const getDetailsByOrderNo = async (order_no) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/inventory/list/manually-form-details?order_no=${order_no}`,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
