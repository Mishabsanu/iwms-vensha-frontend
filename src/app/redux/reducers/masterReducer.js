import {
  ALL_BIN_MASTER_FAIL,
  ALL_BIN_MASTER_REQUEST,
  ALL_BIN_MASTER_SUCCESS,
  ALL_CUSTOMER_MASTER_FAIL,
  ALL_CUSTOMER_MASTER_REQUEST,
  ALL_CUSTOMER_MASTER_SUCCESS,
  ALL_PALLETE_MASTER_FAIL,
  ALL_PALLETE_MASTER_REQUEST,
  ALL_PALLETE_MASTER_SUCCESS,
  ALL_STORAGE_TYPE_MASTER_FAIL,
  ALL_STORAGE_TYPE_MASTER_REQUEST,
  ALL_STORAGE_TYPE_MASTER_SUCCESS,
  ALL_STORAGE_SEARCH_MASTER_FAIL,
  ALL_STORAGE_SEARCH_MASTER_REQUEST,
  ALL_STORAGE_SEARCH_MASTER_SUCCESS,
  ALL_PRODUCT_MASTER_SUCCESS,
  ALL_SUPPLIER_MASTER_SUCCESS,
  ALL_UNIT_MASTER_FAIL,
  ALL_UNIT_MASTER_REQUEST,
  ALL_UNIT_MASTER_SUCCESS,
  ALL_VENDOR_MASTER_FAIL,
  ALL_VENDOR_MASTER_REQUEST,
  ALL_VENDOR_MASTER_SUCCESS,
  ALL_VEHICLE_MASTER_FAIL,
  ALL_VEHICLE_MASTER_REQUEST,
  ALL_VEHICLE_MASTER_SUCCESS,
  ALL_COSTING_MASTER_SUCCESS,
  LOAD_COSTING_MASTER_FAIL,
  LOAD_COSTING_MASTER_REQUEST,
  LOAD_PRODUCT_MASTER_FAIL,
  LOAD_PRODUCT_MASTER_REQUEST,
  LOAD_SUPPLIER_MASTER_FAIL,
  LOAD_SUPPLIER_MASTER_REQUEST,
  ALL_LOADING_MASTER_FAIL,
  ALL_LOADING_MASTER_REQUEST,
  ALL_LOADING_MASTER_SUCCESS,
  ALL_UNLOADING_MASTER_FAIL,
  ALL_UNLOADING_MASTER_REQUEST,
  ALL_UNLOADING_MASTER_SUCCESS,
  ALL_PRODUCTION_FAIL,
  ALL_PRODUCTION_REQUEST,
  ALL_PRODUCTION_SUCCESS,
} from "app/utils/constants/masterConstants";

const INIT_STATE = {
  loading: false,
  error: null,
  supplierMaster: [],
  binMaster: [],
  storageTypeMaster: [],
  storageSearchMaster: [],
  vendorMaster: [],
  unitMaster: [],
  palleteMaster: [],
  customerMaster: [],
  vehicleMaster: [],
  loadingMaster: [],
  unLoadingMaster: [],
  production:[],
  TotalPage: null,
};

export const masterReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_SUPPLIER_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_SUPPLIER_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        supplierMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case LOAD_SUPPLIER_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        supplierMaster: [],
        error: action.payload,
      };

    case LOAD_COSTING_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_COSTING_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        costingMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case LOAD_COSTING_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        costingMaster: [],
        error: action.payload,
      };

    case LOAD_PRODUCT_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_PRODUCT_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        productMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case LOAD_PRODUCT_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        productMaster: [],
        error: action.payload,
      };
    //LAODING master
    case ALL_LOADING_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_LOADING_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_LOADING_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        loadingMaster: [],
        error: action.payload,
      };
    //production master
    case ALL_PRODUCTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_PRODUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        production: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_PRODUCTION_FAIL:
      return {
        ...state,
        loading: false,
        production: [],
        error: action.payload,
      };
    //LAODING master
    case ALL_UNLOADING_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_UNLOADING_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        unLoadingMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_UNLOADING_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        unLoadingMaster: [],
        error: action.payload,
      };
    //BIN master
    case ALL_BIN_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_BIN_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        binMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_BIN_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        binMaster: [],
        error: action.payload,
      };

    //vehicleMaster master
    case ALL_VEHICLE_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_VEHICLE_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicleMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_VEHICLE_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        vehicleMaster: [],
        error: action.payload,
      };

    //vendor master
    case ALL_VENDOR_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_VENDOR_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        vendorMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_VENDOR_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        vendorMaster: [],
        error: action.payload,
      };

    //storage Type  master
    case ALL_STORAGE_TYPE_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_STORAGE_TYPE_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        storageTypeMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_STORAGE_TYPE_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        storageTypeMaster: [],
        error: action.payload,
      };

    //storage Search master
    case ALL_STORAGE_SEARCH_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_STORAGE_SEARCH_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        storageSearchMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_STORAGE_SEARCH_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        storageSearchMaster: [],
        error: action.payload,
      };

    //unit master
    case ALL_UNIT_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_UNIT_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        unitMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_UNIT_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        unitMaster: [],
        error: action.payload,
      };

    //pallete master
    case ALL_PALLETE_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_PALLETE_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        palleteMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_PALLETE_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        palleteMaster: [],
        error: action.payload,
      };

    // customer Master
    case ALL_CUSTOMER_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_CUSTOMER_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        customerMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_CUSTOMER_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        customerMaster: [],
        error: action.payload,
      };

    // //item Type  master

    default:
      return state;
  }
};
