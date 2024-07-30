import axios from "axios";

export const resetPassword = async (item) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/auth/reset-password`,
      { employee_id: item.employee_id, password: item.new_password },
      config
    );
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
