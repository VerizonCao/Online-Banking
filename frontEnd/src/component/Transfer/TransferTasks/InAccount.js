import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { TransferIn } from "../../../actions/backlogActions";
import PropTypes from "prop-types";



//have a form and post the transferIn api
class TransferIn extends Component {
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
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.props.TransferIn(
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
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/accountBoard/${id}`} className="btn btn-primary mb-3">
                Back to account Board
              </Link>
              <h4 className="display-4 text-center">Add account Task</h4>
              <p className="lead text-center">account Name + account Code</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.type,
                    })}
                    name="type"
                    placeholder="account Task type"
                    value={this.state.type}
                    onChange={this.onChange}
                  />
                  {errors.type && (
                    <div className="invalid-feedback">{errors.type}</div>
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
                  <input
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
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
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

TransferIn.propTypes = {
  errors: PropTypes.object.isRequired,
  TransferIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  //这个决定了那个warning
  errors: state.errors,
});

export default connect(mapStateToProps, { TransferIn })(TransferIn); //这个去props里面了
