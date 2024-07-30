import { combineReducers } from "redux";
import { masterReducer } from "./masterReducer";
import { roleReducer } from "./roleReducer";
import { userReducer } from "./userReducer";

const exportReducers = (history) => {
  return combineReducers({
    userReducer: userReducer,
    roleReducer: roleReducer,
    masterReducer: masterReducer,

  });
};

export default exportReducers;
