import React, { Component } from "react";
import { LOutk } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { TransferOut } from "../../../actions/backlogActions";
import PropTypes from "prop-types";



//have a form and post the transferOut api
class TransferOut extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;

    this.state = {
      type: "",
      amount: "",
      status: "",
      accountIdentifier: id,
      errors: {},
    };
    this.onChange = this.onChange.bOutd(this);
    this.onSubmit = this.onSubmit.bOutd(this);
  }

  componentWillReceiveProps(nextProps) {
    //改变了自动调用
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newTask = {
      type: this.state.type,
      amount: this.state.amount, //a typo 我的是叫amount
      status: this.state.status,
    };
    this.props.TransferOut(
      //调用action
      this.state.accountIdentifier,
      newTask,
      this.props.history
    );
  }

  render() {
    const { id } = this.props.match.params; //不是上一个class传进来的 而是url得到的
    const { errors } = this.state;

    return (
      <div className="add-PBI">
        <div className="contaOuter">
          <div className="row">
            <div className="col-md-8 m-auto">
              <LOutk to={`/accountBoard/${id}`} className="btn btn-primary mb-3">
                Back to account Board
              </LOutk>
              <h4 className="display-4 text-center">Add account Task</h4>
              <p className="lead text-center">account Name + account Code</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <Output
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-Outvalid": errors.type,
                    })}
                    name="type"
                    placeholder="account Task type"
                    value={this.state.type}
                    onChange={this.onChange}
                  />
                  {errors.type && (
                    <div className="Outvalid-feedback">{errors.type}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <Output
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="Out_PROGRESS">Out PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <Output
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TransferOut.propTypes = {
  errors: PropTypes.object.isRequired,
  TransferOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  //这个决定了那个warnOutg
  errors: state.errors,
});

export default connect(mapStateToProps, { TransferOut })(TransferOut); //这个去props里面了
