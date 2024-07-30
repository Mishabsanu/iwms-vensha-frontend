import axios from "axios";

export const getKcFabricCode = async (code) => {
  try {
    // console.log(code);
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/purchase-order/fetch-details?kc_fabric_code=${code}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
