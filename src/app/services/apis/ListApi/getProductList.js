import axios from "axios";

export const getProductList = async (gender) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    if (gender != "Select") {
      const data = await axios.get(
        `${process.env.REACT_APP_URL}/api/list/product-${gender}-list`,
        config
      );
      return data?.data?.result.map((item) => {
        return {
          ...item,
          sub_items: JSON.parse(item.sub_items),
        };
      });
    }
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
