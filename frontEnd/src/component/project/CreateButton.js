import React from "react";
import { Link } from "react-router-dom";

const CreateButton = () => {
  //link 就像是a tag
  return (
    <React.Fragment>
      <Link to="/addProject" className="btn btn-lg btn-info">
        Create a Project
      </Link>
    </React.Fragment>
  );
};

export default CreateButton;
