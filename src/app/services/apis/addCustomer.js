import axios from "axios";

export const addCustomer = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/customer/add-customer`,
      details,
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error.response;
  }
};

export const UpdateCustomer = async (item, id) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    const data = await axios.post(
      `${process.env.REACT_APP_URL}/customer/update-customer?id=${id}`,
      item,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
