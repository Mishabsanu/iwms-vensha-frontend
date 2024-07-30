import {
  ALL_GRADE_MASTER_FAIL,
  ALL_GRADE_MASTER_REQUEST,
  ALL_GRADE_MASTER_SUCCESS,
  ALL_ITEM_CODE_MASTER_FAIL,
  ALL_ITEM_CODE_MASTER_REQUEST,
  ALL_ITEM_CODE_MASTER_SUCCESS,
  ALL_ITEM_NAME_MASTER_FAIL,
  ALL_ITEM_NAME_MASTER_REQUEST,
  ALL_ITEM_NAME_MASTER_SUCCESS,
  ALL_PALLETE_MASTER_FAIL,
  ALL_PALLETE_MASTER_REQUEST,
  ALL_PALLETE_MASTER_SUCCESS,
  ALL_PARTY_MASTER_FAIL,
  ALL_PARTY_MASTER_REQUEST,
  ALL_PARTY_MASTER_SUCCESS,
  ALL_SUPPLIER_MASTER_SUCCESS,
  ALL_UNIT_MASTER_FAIL,
  ALL_UNIT_MASTER_REQUEST,
  ALL_UNIT_MASTER_SUCCESS,
  LOAD_SUPPLIER_MASTER_FAIL,
  LOAD_SUPPLIER_MASTER_REQUEST,
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
export const getAllGrade =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        filters: {},
        // searchFields: {
        //   string: [
        //     "Production_Line",
        //     "SKU_Code",
        //     "SUT",
        //     "UOM",
        //     "Bin",
        //     "SUT",
        //     "Assigned_To",
        //     "Batch",
        //     "Three_Digit_Codes",
        //     "status",
        //   ],
        // },
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

      dispatch({ type: ALL_GRADE_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/production/list-production?${urlParams.toString()}`,
        { ...body },
        config
      );
      // console.log(data);
      dispatch({
        type: ALL_GRADE_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_GRADE_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//party master
export const getAllParty =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      if (!search_value) {
        search_value = "";
      }

      const urlParams = new URLSearchParams({
        search: search_value.trim(),
        page: page,
        sort: sort,
        sortBy: sortBy,
      });

      dispatch({ type: ALL_PARTY_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/production/list-bin?${urlParams.toString()}`,
        config
      );

      dispatch({
        type: ALL_PARTY_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_PARTY_MASTER_FAIL,
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
        // searchFields: {
        //   string: [
        //     "Production_Line",
        //     "SKU_Code",
        //     "SUT",
        //     "UOM",
        //     "Bin",
        //     "SUT",
        //     "Assigned_To",
        //     "Batch",
        //     "Three_Digit_Codes",
        //     "status",
        //   ],
        // },
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
export const getAllItemName =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        searchFields: {
          string: ["item_name", "item_name_remarks", "status"],
          numbers: ["created_employee_id.employee_id"],
          arrayField: [
            "created_employee_id.first_name",
            "created_employee_id.last_name",
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

      dispatch({ type: ALL_ITEM_NAME_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/item-name-master/list-item-name-master?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_ITEM_NAME_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_ITEM_NAME_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//item Type master
export const getAllItemCode =
  (search_value, sort, sortBy, page) => async (dispatch) => {
    try {
      const body = {
        searchFields: {
          string: ["item_code", "item_code_remarks", "status"],
          numbers: ["created_employee_id._id", "item_code"],
          arrayField: [
            "created_employee_id.first_name",
            "created_employee_id.last_name",
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
      dispatch({ type: ALL_ITEM_CODE_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/item-code-master/list-item-code-master?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_ITEM_CODE_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_ITEM_CODE_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
