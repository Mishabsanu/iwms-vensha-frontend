import axios from "axios";

export const getFabricAvailability = async (data) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/api/order/check-inventory`,
      data,
      config
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
