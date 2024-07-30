import axios from "axios";

export const updateRole = async (item) => {
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
      status: item.status,
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}/role/update-role?id=${item.id}`,
      role_data,
      config
    );
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
