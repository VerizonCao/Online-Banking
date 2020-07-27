import React from "react";
import "./App.css";
import Dashboard from "./component/Dashboard";
import Header from "./component/Layout/Header";

//install bootstrap in npm
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Addaccount from "./component/account/Addaccount";
import UpdateAccount from "./component/account/Updateaccount";
import RecipientBoard from "./component/Transfer/Recipient/RecipientBoard";
import TransferIn from "./component/Transfer/TransferTasks";
import TransferOut from "./component/Transfer/TransferTasks";

import Landing from "./component/Layout/Landing";
import Register from "./component/UserManagement/Register";
import Login from "./component/UserManagement/login";

//react and redux
import { Provider } from "react-redux";

import store from "./store";

import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";

import { logout } from "./actions/securityActions";

import SecurityRoute from ".//securityUtils/SecurityRoute";

const jwtToken = localStorage.jwtToken;

//如果用户已经登陆了
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  //expired
  if (decoded_jwtToken.exp < currentTime) {
    //handle logout
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    //整个是一个router
    //route 只是规定了，如果访问这个route，就被传动到{addaccount}
    //在这里加入store   provider将store连接组建吗，告诉component state改变了。让他改变props
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            //public routers
          }

          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          {
            //private routers
          }
          <Switch>
            <SecurityRoute exact path="/dashboard" component={Dashboard} />
            <SecurityRoute exact path="/addaccount" component={Addaccount} />
            <SecurityRoute
              exact
              path="/updateaccount/:id"
              component={UpdateAccount}
            />
            <SecurityRoute
              exact
              path="/recipient/:id"
              component={RecipientBoard}
            />
            <SecurityRoute
              exact
              path="/addRecipient/:id"
              component={Addrecipient}
            />
            <SecurityRoute
              exact
              path="/transferTaskIn/:recipient_id/:pt_id"
              component={TransferIn}
            />
            <SecurityRoute
              exact
              path="/transferTaskOut/:recipient_id/:pt_id"
              component={TransferOut}
            />        
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
