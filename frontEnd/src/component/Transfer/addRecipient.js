import React, { Component } from "react";
import { PropTypes } from "prop-types";
import classnames from "classnames";
//state to props
import { connect } from "react-redux";

//get actions
import { createRecipient } from "../../actions/transferActions";


//form and post adding recipient API
class Addrecipient extends Component {
  constructor() {
    super();
    this.state = {
      recipientName: "",
      recipientIdentifier: "",
      user_id: "",
      start_Date: "",
      type: "",
      errors: {},
    };
  }

  //load state from props
  componentWillReceiveProps(nextProps) {
    //如果props现在有errors了，改动state
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    //prevent for refresh
    e.preventDefault();

    const newrecipient = {
      recipientName: this.state.recipientName,
      recipientIdentifier: this.state.recipientIdentifier,
      description: this.state.description,
      start_Date: this.state.start_Date,
      type: this.state.type,
    };

    //调用action
    this.props.createRecipient(newrecipient, this.props.history);

    console.log(newrecipient);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="transfer">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create transfer form</h5>
              <hr />
              <form onSubmit={this.onSubmit.bind(this)}>
                {
                  //这个form要和spring的transfer对应
                  //name 和 value需要和spring里面的一样
                  //onchange是form需要的，没有的话无法写东西
                  //每次改变表格内容，同步到state内容  根据setstate来表示的
                  //onsubmit
                }
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.recipientName,
                    })}
                    placeholder="transfer Name"
                    name="recipientName"
                    value={this.state.recipientName}
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.recipientName && (
                    <div className="invalid-feedback">{errors.recipientName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.recipientIdentifier,
                    })}
                    placeholder="Unique transfer ID"
                    name="recipientIdentifier"
                    value={this.state.recipientIdentifier}
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.recipientIdentifier && (
                    <div className="invalid-feedback">
                      {errors.recipientIdentifier}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="transfer Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange.bind(this)}
                  ></textarea>
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
                    onChange={this.onChange.bind(this)}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="type"
                    className="form-control form-control-lg"
                    name="type"
                    value={this.state.type}
                    onChange={this.onChange.bind(this)}
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

//与主逻辑无关
Addrecipient.propTypes = {
  createRecipient: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

//map state to props
//这里的猜想是让store中的state传给props。因为没有 this.state.errors
//所以后续才需要把props给到state
const mapStateToProps = (state) => ({
  errors: state.errors,
});

//使用connect   store根据action的属性调用reducer。 返回新的state放入store
//同时监听 state的改变
export default connect(mapStateToProps, { createRecipient })(Addrecipient);
