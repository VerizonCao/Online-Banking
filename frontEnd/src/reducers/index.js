//uced for reducers total
//一句话解释reducer：reducer用来修改state

import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import backlogReducer from "./backlogReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  //for in mapstatetoprops
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer,
  security: securityReducer, //security 里面有user和token
});
