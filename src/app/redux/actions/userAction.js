import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "app/utils/constants/userConstants";

import axios from "axios";
import Cookies from "js-cookie";

export const login =
  (employee_id, password, setSubmitting) => async (dispatch) => {
    try {
      setSubmitting(true);
      dispatch({ type: LOGIN_REQUEST });
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const data = await axios.post(
        `${process.env.REACT_APP_URL}/auth/signin`,
        { employee_id, password },
        config
      );

      let user_details = data?.data?.result;
      let token = data?.data?.token;

      dispatch({ type: LOGIN_SUCCESS, payload: user_details });
      sessionStorage.setItem("isAuthenticated", true);
      sessionStorage.setItem(
        "permissions",
        JSON.stringify(user_details?.role_id?.permissions)
      );
      sessionStorage.setItem(
        "role_name",
        JSON.stringify(user_details?.role_id?.role_name)
      );
      Cookies.set("token", token);

      // sessionStorage.setItem("role", data.data.user.role);
    } catch (error) {
      // console.log(error);
      dispatch({ type: LOGIN_FAIL, payload: error?.response?.data?.message });
      sessionStorage.setItem("isAuthenticated", false);
    } finally {
      setSubmitting(false);
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    dispatch({ type: LOAD_USER_REQUEST });
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/profile/list-user-profile`,
      config
    );
    dispatch({ type: LOAD_USER_SUCCESS, payload: data?.data?.result });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error?.response?.data?.description,
    });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_SUCCESS });
    sessionStorage.setItem("isAuthenticated", false);
    sessionStorage.clear();
    localStorage.clear();
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error,
    });
  }
};

export const getAllUsers =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const body = {
        filters: {},
        searchFields: {
          string: [
            "first_name",
            "last_name",
            "gender",
            "role_id.role_name",
            "country",
            "state",
            "city",
            "email_id",
            "user_remarks",
            "created_employee_id.first_name",
            "created_employee_id.last_name",
            "status",
            "dob",
          ],
          numbers: ["age", "mobile_no", "employee_id", "pincode"],
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
      dispatch({ type: ALL_USERS_REQUEST });

      const data = await axios.post(
        `${process.env.REACT_APP_URL}/user/list-user?${urlParams.toString()}`,
        body,
        config
      );
      dispatch({
        type: ALL_USERS_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_USERS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
