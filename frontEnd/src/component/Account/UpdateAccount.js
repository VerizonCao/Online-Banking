import React, { Component } from "react";
import { getaccount, createaccount } from "../../actions/accountAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class Updateaccount extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      accountName: "",
      accountIdentifier: "",
      description: "",
      start_Date: "",
      type: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //每次render被调用传送给props,在这里update state
  componentWillReceiveProps(nextProps) {
    //get from next props
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      accountName,
      accountIdentifier,
      description,
      start_Date,
      type,
    } = nextProps.account;

    this.setState({
      id,
      accountName,
      accountIdentifier,
      description,
      start_Date,
      type,
    });
  }

  componentDidMount() {
    // id从这个params得到
    const { id } = this.props.match.params;
    //直接调这个函数
    this.props.getaccount(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateaccount = {
      id: this.state.id,
      accountName: this.state.accountName,
      accountIdentifier: this.state.accountIdentifier,
      description: this.state.description,
      start_Date: this.state.start_Date,
      type: this.state.type,
    };

    this.props.createaccount(updateaccount, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="account">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update account form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.accountName,
                    })}
                    placeholder="account Name"
                    value={this.state.accountName}
                    name="accountName"
                    onChange={this.onChange}
                  />
                  {errors.accountName && (
                    <div className="invalid-feedback">{errors.accountName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.accountIdentifier,
                    })}
                    placeholder="Unique account ID"
                    name="accountIdentifier"
                    value={this.state.accountIdentifier}
                    onChange={this.onChange}
                    disabled //限制了不能修改
                  />
                  {errors.accountIdentifier && (
                    <div className="invalid-feedback">
                      {errors.accountIdentifier}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="account Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_Date"
                    value={this.state.start_Date}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="type"
                    value={this.state.type}
                    onChange={this.onChange}
                  />
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

Updateaccount.propTypes = {
  account: PropTypes.object.isRequired,
  getaccount: PropTypes.func.isRequired,
  createaccount: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account.account,
  errors: state.errors,
});

export default connect(mapStateToProps, { getaccount, createaccount })(
  Updateaccount
);
