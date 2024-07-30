import axios from "axios";

export const updateUserDetailsAdmin = async (details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/user/update-user?id=${details.id}`, details,
      // { ...details, role_name: details.role_name.role_name },
      config
    );
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
