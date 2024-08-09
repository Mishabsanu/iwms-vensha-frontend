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
  ALL_FORKLIFT_OPERATOR_MASTER_FAIL,
  ALL_FORKLIFT_OPERATOR_MASTER_REQUEST,
  ALL_FORKLIFT_OPERATOR_MASTER_SUCCESS,
  ALL_CROSS_DOCK_MASTER_FAIL,
  ALL_CROSS_DOCK_MASTER_REQUEST,
  ALL_CROSS_DOCK_MASTER_SUCCESS,
  ALL_PRODUCTION_FAIL,
  ALL_PRODUCTION_REQUEST,
  ALL_PRODUCTION_SUCCESS,
  ALL_BIN_TABLE_FAIL,
  ALL_BIN_TABLE_REQUEST,
  ALL_BIN_TABLE_SUCCESS,
  ALL_STOCK_REPORT_FAIL,
  ALL_STOCK_REPORT_REQUEST,
  ALL_STOCK_REPORT_SUCCESS,
  ALL_TRANSACTION_FAIL,
  ALL_TRANSACTION_REQUEST,
  ALL_TRANSACTION_SUCCESS,
  ALL_OUTBOUND_FAIL,
  ALL_OUTBOUND_REQUEST,
  ALL_OUTBOUND_SUCCESS,
} from "app/utils/constants/masterConstants";

const INIT_STATE = {
  loading: false,
  error: null,
  supplierMaster: [],
  binMaster: [],
  binTableMaster: [],
  storageTypeMaster: [],
  storageSearchMaster: [],
  vendorMaster: [],
  unitMaster: [],
  palleteMaster: [],
  customerMaster: [],
  vehicleMaster: [],
  loadingMaster: [],
  unLoadingMaster: [],
  production: [],
  forkliftOperator: [],
  crossDock: [],
  stockReport: [],
  transaction: [],
  outbound: [],
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
    //OUTBOUND master
    case ALL_OUTBOUND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_OUTBOUND_SUCCESS:
      return {
        ...state,
        loading: false,
        outbound: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_OUTBOUND_FAIL:
      return {
        ...state,
        loading: false,
        outbound: [],
        error: action.payload,
      };
    //LAODING master
    case ALL_STOCK_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_STOCK_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        stockReport: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_STOCK_REPORT_FAIL:
      return {
        ...state,
        loading: false,
        stockReport: [],
        error: action.payload,
      };
    //TRANSACTION master
    case ALL_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_TRANSACTION_FAIL:
      return {
        ...state,
        loading: false,
        transaction: [],
        error: action.payload,
      };
    //LAODING master
    case ALL_FORKLIFT_OPERATOR_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_FORKLIFT_OPERATOR_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        forkliftOperator: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_FORKLIFT_OPERATOR_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        forkliftOperator: [],
        error: action.payload,
      };
    //binTableMaster master
    case ALL_BIN_TABLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_BIN_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        binTableMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_BIN_TABLE_FAIL:
      return {
        ...state,
        loading: false,
        binTableMaster: [],
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
    //crossDock master
    case ALL_CROSS_DOCK_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_CROSS_DOCK_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        crossDock: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_CROSS_DOCK_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        crossDock: [],
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
