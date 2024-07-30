import axios from "axios";

export const addShopOrder = async (item) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    const data = await axios.post(
      `${process.env.REACT_APP_URL}/api/shop-order/add-shop-order`,
      item,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
