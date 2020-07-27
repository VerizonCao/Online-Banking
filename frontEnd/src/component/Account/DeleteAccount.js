import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { deleteAccount } from "../../actions/projectAction";

class AccountItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteAccount(id);
  };

  render() {
    const project = this.props.account;

    return (
      // <!-- Project Item Component -->
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{project.accountIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{project.accountName}</h3>
              <p>{project.description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/projectBoard/${project.accountIdentifier}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                  </li>
                </Link>
                <Link to={`/updateProject/${project.accountIdentifier}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Project Info</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(
                    this,
                    project.accountIdentifier
                  )}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      // <!-- End of Project Item Component -->
    );
  }
}

//因为之前传入了一个project 通过props ，所以这里不需要自己从redux的store拿取
AccountItem.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
};

export default connect(null, { deleteAccount })(AccountItem);
