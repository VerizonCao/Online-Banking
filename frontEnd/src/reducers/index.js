//uced for reducers total
//一句话解释reducer：reducer用来修改state

import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import transferReducer from "./transferReducer";
import accountReducer from "./accountReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  //for in mapstatetoprops
  errors: errorReducer,
  transfer: transferReducer,
  account: accountReducer,
  security: securityReducer, //security 里面有user和token
});
