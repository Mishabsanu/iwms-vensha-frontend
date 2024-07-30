import axios from "axios";

export const getReplaceOrderByNo = async (data) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const res = await axios.patch(
      `${process.env.REACT_APP_URL}/api/order/list-replacement-order?order_no=${data.order_no}`,
      data,
      config
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
