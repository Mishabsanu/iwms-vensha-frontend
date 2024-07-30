import axios from "axios";

export const supplierList = async () => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/supplier-master/list-supplier-master-without-permission`,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
