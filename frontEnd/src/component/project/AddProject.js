import React, { Component } from "react";
import { PropTypes } from "prop-types";
import classnames from "classnames";
//state to props
import { connect } from "react-redux";

//get actions
import { createProject } from "../../actions/projectAction";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_Date: "",
      end_Date: "",
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

    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_Date: this.state.start_Date,
      end_Date: this.state.end_Date,
    };

    //调用action
    this.props.createProject(newProject, this.props.history);

    console.log(newProject);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit.bind(this)}>
                {
                  //这个form要和spring的project对应
                  //name 和 value需要和spring里面的一样
                  //onchange是form需要的，没有的话无法写东西
                  //每次改变表格内容，同步到state内容  根据setstate来表示的
                  //onsubmit
                }
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.state.projectIdentifier}
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.projectIdentifier && (
                    <div className="invalid-feedback">
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Project Description"
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
                    type="date"
                    className="form-control form-control-lg"
                    name="end_Date"
                    value={this.state.end_Date}
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
AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, { createProject })(AddProject);
