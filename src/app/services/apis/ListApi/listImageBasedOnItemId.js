import AllApis from "app/Apis";
import axios from "axios";

export const listImageBasedOnItemId = async (GroupNo) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.get(
      `${process.env.REACT_APP_URL}${AllApis.images.listImageBasedOnItemId(
        GroupNo
      )}`,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};

export const UpdateImages = async (id, details) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.post(
      `${process.env.REACT_APP_URL}${AllApis.images.updateImage(id)}`,
      details,
      config
    );
    return data?.data?.result;
  } catch (error) {
    console.log(error);
    return error.response.data.result;
  }
};
