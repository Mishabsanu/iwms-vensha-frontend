import axios from "axios";

export const getSuppliersListDropDown = async () => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/list/supplier-list`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
