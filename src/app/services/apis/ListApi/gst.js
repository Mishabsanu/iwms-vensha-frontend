import axios from "axios";

export const getGstListNoPem = async () => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/list/gst-list`,
      config
    );
    return data?.data?.result.map((item) => item.gst_value);
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
