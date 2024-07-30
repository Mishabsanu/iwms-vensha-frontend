import {
  ALL_ROLE_SUCCESS,
  LOAD_ROLE_FAIL,
  LOAD_ROLE_REQUEST,
} from "app/utils/constants/roleConstants";

const INIT_STATE = {
  loading: false,
  error: null,
  allRoles: [],
  TotalPage:null
};

export const roleReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        allRoles: action.payload.data,
        TotalPage:action.payload.totalPage,
      };

    case LOAD_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        allRoles: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
