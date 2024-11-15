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
  ALL_CUSTOMER_TYPE_MASTER_FAIL,
  ALL_CUSTOMER_TYPE_MASTER_REQUEST,
  ALL_CUSTOMER_TYPE_MASTER_SUCCESS,
  ALL_STORAGE_TYPE_MASTER_FAIL,
  ALL_STORAGE_TYPE_MASTER_REQUEST,
  ALL_STORAGE_TYPE_MASTER_SUCCESS,
  ALL_SUPPLIER_MASTER_SUCCESS,
  ALL_INBOUND_GATE_ENTRY_FAIL,
  ALL_INBOUND_GATE_ENTRY_REQUEST,
  ALL_INBOUND_GATE_ENTRY_SUCCESS,
  ALL_OUTBOUND_GATE_ENTRY_FAIL,
  ALL_OUTBOUND_GATE_ENTRY_REQUEST,
  ALL_OUTBOUND_GATE_ENTRY_SUCCESS,
  ALL_BIN_TYPE_MASTER_FAIL,
  ALL_BIN_TYPE_MASTER_REQUEST,
  ALL_BIN_TYPE_MASTER_SUCCESS,
  ALL_UOM_MASTER_FAIL,
  ALL_UOM_MASTER_REQUEST,
  ALL_UOM_MASTER_SUCCESS,
  ALL_AUOM_MASTER_FAIL,
  ALL_AUOM_MASTER_REQUEST,
  ALL_AUOM_MASTER_SUCCESS,
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
  ALL_FORKLIFT_OPERATOR_MASTER_REQUEST,
  ALL_FORKLIFT_OPERATOR_MASTER_SUCCESS,
  ALL_FORKLIFT_OPERATOR_MASTER_FAIL,
  ALL_FORKLIFT_OPERATOR_OUTBOUND_MASTER_REQUEST,
  ALL_FORKLIFT_OPERATOR_OUTBOUND_MASTER_SUCCESS,
  ALL_FORKLIFT_OPERATOR_OUTBOUND_MASTER_FAIL,
  ALL_CROSS_DOCK_MASTER_REQUEST,
  ALL_CROSS_DOCK_MASTER_SUCCESS,
  ALL_CROSS_DOCK_MASTER_FAIL,
  ALL_PRODUCTION_REQUEST,
  ALL_PRODUCTION_SUCCESS,
  ALL_PRODUCTION_FAIL,
  ALL_BIN_TABLE_REQUEST,
  ALL_BIN_TABLE_SUCCESS,
  ALL_BIN_TABLE_FAIL,
  ALL_STOCK_REPORT_REQUEST,
  ALL_STOCK_REPORT_SUCCESS,
  ALL_STOCK_REPORT_FAIL,
  ALL_TRANSACTION_REQUEST,
  ALL_TRANSACTION_SUCCESS,
  ALL_TRANSACTION_FAIL,
  ALL_TRANSACTION_OUTBOND_REQUEST,
  ALL_TRANSACTION_OUTBOND_SUCCESS,
  ALL_TRANSACTION_OUTBOND_FAIL,
  ALL_OUTBOUND_REQUEST,
  ALL_OUTBOUND_SUCCESS,
  ALL_OUTBOUND_FAIL,
  ALL_TRUCK_LOADING_REQUEST,
  ALL_TRUCK_LOADING_SUCCESS,
  ALL_TRUCK_LOADING_FAIL,
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

//getAllProduction

export const getAllProduction =
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
      dispatch({ type: ALL_PRODUCTION_REQUEST });
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
        body,
        config
      );
      dispatch({
        type: ALL_PRODUCTION_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
//Bin Type

export const getAllBinType =
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
      dispatch({ type: ALL_BIN_TYPE_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/bin-type/list-bin-type?${urlParams.toString()}`,
        body,
        config
      );
      dispatch({
        type: ALL_BIN_TYPE_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_BIN_TYPE_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//UOM

export const getAllUom =
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
      dispatch({ type: ALL_UOM_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${process.env.REACT_APP_URL}/uom/list-uom?${urlParams.toString()}`,
        body,
        config
      );
      dispatch({
        type: ALL_UOM_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_UOM_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
//AUOM

export const getAllAuom =
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
      dispatch({ type: ALL_AUOM_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${process.env.REACT_APP_URL}/auom/list-auom?${urlParams.toString()}`,
        body,
        config
      );
      dispatch({
        type: ALL_AUOM_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_AUOM_MASTER_FAIL,
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

//Bin Table
export const getAllBinTable =
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

      dispatch({ type: ALL_BIN_TABLE_REQUEST });
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
        }/production/list-bin?${urlParams.toString()}`,
        { ...body },
        config
      );
      // console.log(data);
      dispatch({
        type: ALL_BIN_TABLE_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_BIN_TABLE_FAIL,
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

//forklift-operator master
export const getAllForkliftOperator =
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

      dispatch({ type: ALL_FORKLIFT_OPERATOR_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/forklift-operator/list-forklift-operator?${urlParams.toString()}`,
        body,
        config
      );

      dispatch({
        type: ALL_FORKLIFT_OPERATOR_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_FORKLIFT_OPERATOR_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
//forklift-operator master
export const getAllForkliftOperatorOutbound =
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

      dispatch({ type: ALL_FORKLIFT_OPERATOR_OUTBOUND_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/forklift-operator/list-forklift-operator-outbound?${urlParams.toString()}`,
        body,
        config
      );

      dispatch({
        type: ALL_FORKLIFT_OPERATOR_OUTBOUND_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_FORKLIFT_OPERATOR_OUTBOUND_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
//CrossDock master
export const getAllCrossDock =
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

      dispatch({ type: ALL_CROSS_DOCK_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/cross-dock/list-cross-dock-master?${urlParams.toString()}`,
        body,
        config
      );

      dispatch({
        type: ALL_CROSS_DOCK_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_CROSS_DOCK_MASTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//GateEntryInbound
export const getAllGateEntryInbound =
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
      dispatch({ type: ALL_INBOUND_GATE_ENTRY_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/inbound-gate-entry/list-inbound-gate-entry?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_INBOUND_GATE_ENTRY_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_INBOUND_GATE_ENTRY_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

// TruckLoading
export const getAllTruckLoading =
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
      dispatch({ type: ALL_TRUCK_LOADING_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/truck-loading/list-truck-loading?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_TRUCK_LOADING_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_TRUCK_LOADING_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//GateEntryoutbound
export const getAllGateEntryOutbound =
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
      dispatch({ type: ALL_OUTBOUND_GATE_ENTRY_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/outbound-gate-entry/list-outbound-gate-entry?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_OUTBOUND_GATE_ENTRY_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_OUTBOUND_GATE_ENTRY_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
//getAllTransaction master
export const getAllTransaction =
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
      dispatch({ type: ALL_TRANSACTION_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/production/list-transaction?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_TRANSACTION_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_TRANSACTION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
export const getAllTransactionOutbond =
  (search_value, sort, sortBy, page, OrderType) => async (dispatch) => {
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
      dispatch({ type: ALL_TRANSACTION_OUTBOND_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const apiUrl =
        OrderType === "SO"
          ? `${
              process.env.REACT_APP_URL
            }/production/list-transaction-outbond-so?${urlParams.toString()}`
          : `${
              process.env.REACT_APP_URL
            }/production/list-transaction-outbond-sto?${urlParams.toString()}`;

      // Make the API request
      const response = await axios.post(apiUrl, body, config);

      dispatch({
        type: ALL_TRANSACTION_OUTBOND_SUCCESS,
        payload: {
          data: response?.data?.result,
          totalPage: response?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_TRANSACTION_OUTBOND_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

//outBond master
export const getAllOutbound =
  (search_value, sort, sortBy, page, OrderType) => async (dispatch) => {
    try {
      // Initialize body and set default search_value if not provided
      const body = {
        filters: {},
      };
      const trimmedSearchValue = search_value ? search_value.trim() : "";

      // Create URL search parameters
      const urlParams = new URLSearchParams({
        search: trimmedSearchValue,
        page: page,
        sort: sort,
        sortBy: sortBy,
      });

      // Dispatch request action
      dispatch({ type: ALL_OUTBOUND_REQUEST });

      // Define API URL based on OrderType
      const apiUrl =
        OrderType === "SO"
          ? `${
              process.env.REACT_APP_URL
            }/outbound/list-outbound-so?${urlParams.toString()}`
          : `${
              process.env.REACT_APP_URL
            }/outbound/list-outbound-sto?${urlParams.toString()}`;

      // Set request configuration
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make the API request
      const response = await axios.post(apiUrl, body, config);

      // Dispatch success action with payload
      dispatch({
        type: ALL_OUTBOUND_SUCCESS,
        payload: {
          data: response.data.result,
          totalPage: response.data.totalPages,
        },
      });
    } catch (error) {
      // Dispatch failure action with error message
      dispatch({
        type: ALL_OUTBOUND_FAIL,
        payload: error.response?.data?.message || "An error occurred",
      });
    }
  };

///stock  master
export const getAllStock =
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
      dispatch({ type: ALL_STOCK_REPORT_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/production/list-stock-table?${urlParams.toString()}`,
        { ...body },
        config
      );

      dispatch({
        type: ALL_STOCK_REPORT_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_STOCK_REPORT_FAIL,
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

//Customer Type master
export const getAllCustomerType =
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
      dispatch({ type: ALL_CUSTOMER_TYPE_MASTER_REQUEST });
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.post(
        `${
          process.env.REACT_APP_URL
        }/customer-type/list-customer-type-master?${urlParams.toString()}`,
        body,
        config
      );

      dispatch({
        type: ALL_CUSTOMER_TYPE_MASTER_SUCCESS,
        payload: {
          data: data?.data?.result,
          totalPage: data?.data?.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_CUSTOMER_TYPE_MASTER_FAIL,
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
      console.log(data, "data");

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
