import React, { Component } from "react";
import { Link } from "react-router-dom";
import account from "./account";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAccount } from "../../../actions/accountActions";

class recipientBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    //通过这个吧account得到到redux store里面，然后下面的映射到props里面  然后就是展示
    const { id } = this.props.match.params;
    this.props.getAccount(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      //把下一个的props的error给这个的state
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { recipient_tasks } = this.props.account;
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (errors, recipient_tasks) => {
      if (recipient_tasks.length < 1) {
        if (errors.recipientNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.recipientNotFound}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No recipient Tasks on this board
            </div>
          );
        }
      } else {
        //原来返回的
        return <account recipient_tasks_prop={recipient_tasks} />;
      }
    };

    BoardContent = boardAlgorithm(errors, recipient_tasks);

    return (
      <div className="container">
        <Link to={`/addrecipientTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create recipient Task</i>
        </Link>
        <br />
        <hr />
        {
          BoardContent //给了全部的tasks
        }
      </div>
    );
  }
}

recipientBoard.propTypes = {
  account: PropTypes.object.isRequired,
  getAccount: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
  errors: state.errors,
});

export default connect(mapStateToProps, { getAccount })(recipientBoard);
