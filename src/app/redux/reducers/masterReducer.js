import {
  ALL_COSTING_MASTER_SUCCESS,
  ALL_FABRIC_COLOR_MASTER_FAIL,
  ALL_FABRIC_COLOR_MASTER_REQUEST,
  ALL_FABRIC_COLOR_MASTER_SUCCESS,
  ALL_FABRIC_MASTER_FAIL,
  ALL_FABRIC_MASTER_REQUEST,
  ALL_FABRIC_MASTER_SUCCESS,
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
  ALL_PRODUCT_MASTER_SUCCESS,
  ALL_SUPPLIER_MASTER_SUCCESS,
  ALL_UNIT_MASTER_FAIL,
  ALL_UNIT_MASTER_REQUEST,
  ALL_UNIT_MASTER_SUCCESS,
  LOAD_COSTING_MASTER_FAIL,
  LOAD_COSTING_MASTER_REQUEST,
  LOAD_PRODUCT_MASTER_FAIL,
  LOAD_PRODUCT_MASTER_REQUEST,
  LOAD_SUPPLIER_MASTER_FAIL,
  LOAD_SUPPLIER_MASTER_REQUEST,
} from "app/utils/constants/masterConstants";

const INIT_STATE = {
  loading: false,
  error: null,
  supplierMaster: [],
  gradeMaster: [],
  partyMaster: [],
  unitMaster: [],
  palleteMaster: [],
  itemNameMaster: [],
  itemCodeMaster: [],
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

    //grade master
    case ALL_GRADE_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_GRADE_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        gradeMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_GRADE_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        gradeMaster: [],
        error: action.payload,
      };
    //party master
    case ALL_PARTY_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_PARTY_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        partyMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_PARTY_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        partyMaster: [],
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

    //fabricColor master
    case ALL_FABRIC_COLOR_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_FABRIC_COLOR_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        fabricColorMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_FABRIC_COLOR_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        fabricColorMaster: [],
        error: action.payload,
      };

    //item name master
    case ALL_ITEM_NAME_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_ITEM_NAME_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        itemNameMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_ITEM_NAME_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        itemNameMaster: [],
        error: action.payload,
      };


    //item Type  master
    case ALL_ITEM_CODE_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_ITEM_CODE_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        itemCodeMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_ITEM_CODE_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        itemCodeMaster: [],
        error: action.payload,
      };


      
    //fabric master
    case ALL_FABRIC_MASTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_FABRIC_MASTER_SUCCESS:
      return {
        ...state,
        loading: false,
        fabricMaster: action.payload.data,
        TotalPage: action.payload.totalPage,
      };

    case ALL_FABRIC_MASTER_FAIL:
      return {
        ...state,
        loading: false,
        fabricMaster: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
