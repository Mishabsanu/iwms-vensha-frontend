import axios from "axios";

export const addCatalogue = async (formData) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };

    const data = await axios.post(
      `${process.env.REACT_APP_URL}/api/catalogue-master/add-catalogue-master`,
      formData,
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error.response;
  }
};
