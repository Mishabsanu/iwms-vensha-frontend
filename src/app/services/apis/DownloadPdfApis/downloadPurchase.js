import axios from "axios";

export const downloadPurchase = async (id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/purchase-order/pdf-generate-Purchaser?id=${id}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
