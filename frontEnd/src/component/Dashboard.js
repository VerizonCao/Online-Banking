import React, { Component } from "react";
import ProjectItem from "./project/ProjectItem";
import CreateButton from "./project/CreateButton";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectAction";

//rcc create a class

class Dashboard extends Component {
  //start
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const projects = this.props.project.projects;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateButton />
              <br />
              <hr />
              {projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
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
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
