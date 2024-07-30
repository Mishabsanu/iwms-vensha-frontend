import { loadUser } from "app/redux/actions/userAction";
import axios from "axios";
import { useDispatch } from "react-redux";

export const updateUserDetails = async (user, userId) => {

  try {
    const formData = new FormData();
    formData.append("name", user?.name);
    formData.append("email", user?.email);

    if (user?.thumbnail) {
      // Convert Blob URL to File object
      const response = await fetch(user.thumbnail);
      const blob = await response.blob();
      const file = new File([blob], "thumbnail.jpg");

      formData.append("thumbnail", file);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.put(`/api/v1/users/details/update`, formData, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

