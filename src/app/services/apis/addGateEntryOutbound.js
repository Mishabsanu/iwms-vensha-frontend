import axios from "axios";

export const addGateEntryOutbound = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/outbound/add-outbound-gate-entry`, details,
      // { ...details, role_name: details.role_name.role_name },
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error.response;
  }
};
