import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateProjectTask,
  getProjectTask,
} from "../../../actions/backlogActions";
import { Link } from "react-router-dom";
import classnames from "classnames";

class UpdateProjectTask extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceString: "",
      status: "",
      priority: "",
      dueDate: "",
      projectIdentifier: "",
      create_At: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //这里一反常态 竟然直接得到那个，而不是从redux store中获取  然后从redux里面拿到state
  componentDidMount() {
    const { backlog_id, pt_id } = this.props.match.params;
    this.props.getProjectTask(backlog_id, pt_id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      projectSequence,
      summary,
      acceptanceString,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
    } = nextProps.project_task;

    this.setState({
      id,
      projectSequence,
      summary,
      acceptanceString,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const UpdateProjectTask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceString: this.state.acceptanceString,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
      create_At: this.state.create_At,
    };
    console.log(UpdateProjectTask);
    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      UpdateProjectTask,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${this.state.projectIdentifier}`}
                className="btn btn-primary mb-3"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">
                Add /Update Project Task
              </h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary,
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    onChange={this.onChange}
                    value={this.state.summary}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceString"
                    onChange={this.onChange}
                    value={this.state.acceptanceString}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    onChange={this.onChange}
                    value={this.state.dueDate}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    onChange={this.onChange}
                    value={this.state.priority}
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
                    onChange={this.onChange}
                    value={this.state.status}
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

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  project_task: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
  updateProjectTask: state.updateProjectTask,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateProjectTask, getProjectTask })(
  UpdateProjectTask
);
