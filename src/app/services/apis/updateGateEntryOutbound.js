import axios from "axios";

export const updateGateEntryOutbound = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/outbound/update-outbound-gate-entry?id=${details.id}`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
