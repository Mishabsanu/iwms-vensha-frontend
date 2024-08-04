import {
  ALL_VENDOR_MASTER_FAIL,
  ALL_VENDOR_MASTER_REQUEST,
  ALL_VENDOR_MASTER_SUCCESS,
  ALL_BIN_MASTER_FAIL,
  ALL_BIN_MASTER_REQUEST,
  ALL_BIN_MASTER_SUCCESS,
  ALL_VEHICLE_MASTER_FAIL,
  ALL_VEHICLE_MASTER_REQUEST,
  ALL_VEHICLE_MASTER_SUCCESS,
  ALL_CUSTOMER_MASTER_FAIL,
  ALL_CUSTOMER_MASTER_REQUEST,
  ALL_CUSTOMER_MASTER_SUCCESS,
  ALL_PALLETE_MASTER_FAIL,
  ALL_PALLETE_MASTER_REQUEST,
  ALL_PALLETE_MASTER_SUCCESS,
  ALL_STORAGE_TYPE_MASTER_FAIL,
  ALL_STORAGE_TYPE_MASTER_REQUEST,
  ALL_STORAGE_TYPE_MASTER_SUCCESS,
  ALL_SUPPLIER_MASTER_SUCCESS,
  ALL_UNIT_MASTER_FAIL,
  ALL_UNIT_MASTER_REQUEST,
  ALL_UNIT_MASTER_SUCCESS,
  ALL_STORAGE_SEARCH_MASTER_FAIL,
  ALL_STORAGE_SEARCH_MASTER_REQUEST,
  ALL_STORAGE_SEARCH_MASTER_SUCCESS,
  LOAD_SUPPLIER_MASTER_FAIL,
  LOAD_SUPPLIER_MASTER_REQUEST,
  ALL_LOADING_MASTER_FAIL,
  ALL_LOADING_MASTER_REQUEST,
  ALL_LOADING_MASTER_SUCCESS,
  ALL_UNLOADING_MASTER_REQUEST,
  ALL_UNLOADING_MASTER_SUCCESS,
  ALL_UNLOADING_MASTER_FAIL,
} from "app/utils/constants/masterConstants";
import axios from "axios";

//supplier master

export const getAllSuppliers =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        filters: {},
        searchFields: {
          string: [
            "supplier_name",
            "email_id",
            "pan_no",
            "contact_Person_name",
            "bill_address",
            "city",
            "state",
            "country",
            "gst_no",
            "created_employee_id.first_name",
            "created_employee_id.last_name",
            "status",
            "supplier_remarks",
          ],
          numbers: ["contact_Person_number", "pincode", "gst_no"],
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
      dispatch({ type: LOAD_SUPPLIER_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/material-master/list-material-master?${urlParams.toString()}`,
        body,
        config
      );
      // const data = await axios.post(
      //   `${process.env.REACT_APP_URL}/supplier-master/list-supplier-master?search=${searchFields}&page=${page}`,
      //   {
      //     // SEARCH: {
      //     string: ["supplier_name"],
      //     numbers: [],
      //     // }
      //   },
      //   config
      // );

      // console.log(data);
      dispatch({
        type: ALL_SUPPLIER_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: LOAD_SUPPLIER_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//grade master
export const getAllVendor =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        filters: {},
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

      dispatch({ type: ALL_VENDOR_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
          // }/production/list-production?${urlParams.toString()}`,
        }/vendor/list-vendor?${urlParams.toString()}`,
        { ...body },
        config
      );
      // console.log(data);
      dispatch({
        type: ALL_VENDOR_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_VENDOR_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//STORAGE_TYPE master
export const getAllStorageType =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {};
      if (!search_value) {
        search_value = "";
      }

      const urlParams = new URLSearchParams({
        search: search_value.trim(),
        page: page,
        sort: sort,
        sortBy: sortBy,
      });

      dispatch({ type: ALL_STORAGE_TYPE_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/storage-type/list-storage-type?${urlParams.toString()}`,
        body,
        config
      );

      dispatch({
        type: ALL_STORAGE_TYPE_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_STORAGE_TYPE_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//unit master
export const getAllUnit =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        filters: {},
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
      dispatch({ type: ALL_UNIT_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/inbound/list-inbound?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_UNIT_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_UNIT_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
export const getAllStorageSearch =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        filters: {},
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
      dispatch({ type: ALL_STORAGE_SEARCH_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/storage-search/list-storage-search?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_STORAGE_SEARCH_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_STORAGE_SEARCH_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//pallete master
export const getAllPallete =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        filters: {},
        searchFields: {
          string: [
            "production_line_name",
            "created_employee_id.first_name",
            "created_employee_id.last_name",
            "status",
            "production_line_description",
          ],
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
      dispatch({ type: ALL_PALLETE_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/production-line/list-produntion-line-master?${urlParams.toString()}`,
        body,
        config
      );

      dispatch({
        type: ALL_PALLETE_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_PALLETE_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//Item name master
export const getAllCustomer =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {};
      if (!search_value) {
        search_value = "";
      }

      const urlParams = new URLSearchParams({
        search: search_value.trim(),
        page: page,
        sort: sort,
        sortBy: sortBy,
      });

      dispatch({ type: ALL_CUSTOMER_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/customer/list-customer?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_CUSTOMER_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_CUSTOMER_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//getAllVehicle master
export const getAllVehicle =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {};
      if (!search_value) {
        search_value = "";
      }
      const urlParams = new URLSearchParams({
        search: search_value.trim(),
        page: page,
        sort: sort,
        sortBy: sortBy,
      });
      dispatch({ type: ALL_VEHICLE_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/vehicle/list-vehicle?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_VEHICLE_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_VEHICLE_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//Bin master
export const getAllBin =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {};
      if (!search_value) {
        search_value = "";
      }
      const urlParams = new URLSearchParams({
        search: search_value.trim(),
        page: page,
        sort: sort,
        sortBy: sortBy,
      });
      dispatch({ type: ALL_BIN_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${process.env.REACT_APP_URL}/bin/list-bin?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_BIN_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_BIN_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//LOADING master
export const getAllLoading =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        filters: {},
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

      dispatch({ type: ALL_LOADING_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
          // }/production/list-production?${urlParams.toString()}`,
        }/loading/list-loading?${urlParams.toString()}`,
        { ...body },
        config
      );
      // console.log(data);
      dispatch({
        type: ALL_LOADING_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_LOADING_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
//uN LOADING master
export const getAllUnLoading =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        filters: {},
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

      dispatch({ type: ALL_UNLOADING_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
          // }/production/list-production?${urlParams.toString()}`,
        }/unloading/list-unloading?${urlParams.toString()}`,
        { ...body },
        config
      );
      // console.log(data);
      dispatch({
        type: ALL_UNLOADING_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_UNLOADING_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
