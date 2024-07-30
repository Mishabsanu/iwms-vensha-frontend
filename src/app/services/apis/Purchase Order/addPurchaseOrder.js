import axios from "axios";

export const addPurchaseOrder = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/api/purchase-order/add-purchase-order`,
      details,
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
