import axios from "axios";

export const addProduct = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    let body;
    if (details.sub_items.length == 0) {
      body = {
        item_name: details.item_name,
        sub_items: [{ sub_item_name: "N/A" }],
      };
    } else {
      body = details;
    }

    const data = await axios.post(
      `${process.env.REACT_APP_URL}/api/product-master/add-product-master`,
      body,
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error.response;
  }
};
