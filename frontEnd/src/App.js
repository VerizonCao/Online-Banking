import React from "react";
import "./App.css";
import Dashboard from "./component/Dashboard";
import Header from "./component/Layout/Header";

//install bootstrap in npm
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./component/project/AddProject";
import UpdateProject from "./component/project/UpdateProject";
import ProjectBoard from "./component/ProjectBoard/ProjectBoard";
import AddProjectTask from "./component/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./component/ProjectBoard/ProjectTasks/UpdateProjectTask";

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

import SecuredRoute from ".//securityUtils/SecurityRoute";
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
    //route 只是规定了，如果访问这个route，就被传动到{addProject}
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
            <SecurityRoute exact path="/addProject" component={AddProject} />
            <SecurityRoute
              exact
              path="/updateProject/:id"
              component={UpdateProject}
            />
            <SecurityRoute
              exact
              path="/projectBoard/:id"
              component={ProjectBoard}
            />
            <SecurityRoute
              exact
              path="/addProjectTask/:id"
              component={AddProjectTask}
            />
            <SecurityRoute
              exact
              path="/updateProjectTask/:backlog_id/:pt_id"
              component={UpdateProjectTask}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
