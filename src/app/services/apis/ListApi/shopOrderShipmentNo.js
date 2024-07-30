import axios from "axios";

export const getShopOrderShipmentNo = async (page) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/shop-order-dispatch/dispatch-shipment-no-list `,
      config
    );
    return data?.data;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
