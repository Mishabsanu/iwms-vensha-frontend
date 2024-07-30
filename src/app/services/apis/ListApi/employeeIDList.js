import axios from "axios";

export const employeeIDListApi = async () => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/list-order/get-all-employee_id-list`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
