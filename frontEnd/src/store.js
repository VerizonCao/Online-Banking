import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//get reducers
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

// will change
let store;

//create a store
if (window.navigator.userAgent.includes("Chrome")) {
  //根据 reducer和 initial state 来创建store
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  //other browser
} else {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;
