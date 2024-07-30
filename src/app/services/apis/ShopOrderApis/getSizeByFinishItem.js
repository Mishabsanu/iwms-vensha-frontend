import axios from "axios";

export const getFinishedItemSize = async (item) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/shop-order/list-size-based-on-item_name?finished_item_name=${item}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
