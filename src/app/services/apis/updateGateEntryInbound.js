import axios from "axios";

export const updateGateEntryInbound = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/inbound-gate-entry/update-inbound-gate-entry?id=${details.id}`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
