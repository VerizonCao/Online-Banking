import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//根据得到的 返回一个route
//会替换所有的private route 所以他们在跳转之前都会check
const SecuredRoute = ({ component: Component, security, ...otherProps }) => (
  <Route
    {...otherProps}
    render={(props) =>
      security.validToken === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

SecuredRoute.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(SecuredRoute);
