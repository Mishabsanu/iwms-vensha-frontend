import axios from "axios";

export const updatePassword = async (item) => {
  try {
    // console.log(item)
    const password_data = {
      oldPassword: item.oldPassword,
      password: item.password,
      confirmPassword: item.confirmPassword,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.put(
      `/api/v1/users/password/update`,
      password_data,
      config
    );
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
