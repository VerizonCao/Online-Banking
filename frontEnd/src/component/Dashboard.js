import React, { Component } from "react";
import CreateButton from "./account/CreateButton";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAccounts } from "../actions/accountAction";

//rcc create a class

class Dashboard extends Component {
  //start
  componentDidMount() {
    this.props.getAccounts();
  }

  render() {
    const accounts = this.props.account.accounts;
    return (
      <div className="accounts">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">accounts</h1>
              <br />
              <CreateButton />
              <br />
              <hr />
              {accounts.map((account) => (
                <accountItem key={account.id} account={account} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//与主逻辑无关
Dashboard.propTypes = {
  account: PropTypes.object.isRequired,
  getAccounts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { getAccounts })(Dashboard);
