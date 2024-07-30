import axios from "axios";

export const addRole = async (item) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const role_data = {
      role_name: item.name,
      roles_remarks: item.roles_remarks,
      permissions: item.permissions,
      role_status: item.status,
    };

    const data = await axios.post(
      `${process.env.REACT_APP_URL}/role/add-role`,
      role_data,
      config
    );
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
