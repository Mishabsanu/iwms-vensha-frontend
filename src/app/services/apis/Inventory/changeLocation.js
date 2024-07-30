import axios from "axios";

export const changeLocation = async (item, id, type) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    if (type == "rawMaterial") {
      const data = await axios.post(
        `${process.env.REACT_APP_URL}/api/taka/update-taka?id=${id}`,
        { raw_rack_details: item },
        config
      );
      return data;
    } else if (type == "finishedGoods") {
      const data = await axios.patch(
        `${process.env.REACT_APP_URL}/api/finished-item/update-finisheditem?id=${id}`,
        { finished_rack_details: item },
        config
      );
      return data;
    } else if (type == "wastage") {
      const data = await axios.post(
        `${process.env.REACT_APP_URL}/api/taka/update-taka?id=${id}`,
        {
          raw_rack_details: item,
          taka_type: "Wastage Inventory",
        },
        config
      );
      return data;
    }
  } catch (error) {
    return error.response.data;
  }
};
