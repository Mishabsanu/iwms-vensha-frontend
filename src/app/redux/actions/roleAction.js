import {
  ALL_ROLE_SUCCESS,
  LOAD_ROLE_FAIL,
  LOAD_ROLE_REQUEST
} from "app/utils/constants/roleConstants";
import axios from "axios";

export const getAllRoles =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        searchFields: {
          string: [
            "role_name",
            "created_employee_id.first_name",
            "created_employee_id.last_name",
          ],
          numbers: ["created_employee_id"],
        },
      };
      if (!search_value) {
        search_value = "";
      }

      const urlParams = new URLSearchParams({
        search: search_value.trim(),
        page: page,
        sort: sort,
        sortBy: sortBy,
      });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      dispatch({
        type: LOAD_ROLE_REQUEST,
      });
      const data = await axios.post(
        `${process.env.REACT_APP_URL}/role/list-role?${urlParams.toString()}`,
        body,
        config
      );
      dispatch({
        type: ALL_ROLE_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: LOAD_ROLE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
