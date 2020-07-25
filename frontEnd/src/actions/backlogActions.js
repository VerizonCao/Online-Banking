import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  DELETE_PROJECT_TASK,
  GET_PROJECT_TASK,
} from "./types";

export const addProjectTask = (backlog_id, project_task, history) => async (
  dispatch
) => {
  try {
    await axios.post(`/api/backlog/${backlog_id}`, project_task);
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getBacklog = (backlog_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteProjectTask = (backlog_id, pt_id) => async (dispatch) => {
  if (
    window.confirm(
      `You are deleting project task ${pt_id}, this action cannot be undone`
    )
  ) {
    //这里很关键 第一步是delete后端的东西 然后需要dispatch来使得redux store更新
    await axios.delete(`/api/backlog/${backlog_id}/${pt_id}`);
    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: pt_id,
    });
  }
};

export const getProjectTask = (backlog_id, pt_id, history) => async (
  dispatch
) => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}/${pt_id}`);
    dispatch({
      type: GET_PROJECT_TASK,
      payload: res.data,
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const updateProjectTask = (
  backlog_id,
  project_task_id,
  project_task,
  history
) => async (dispatch) => {
  try {
    await axios.patch(
      `/api/backlog/${backlog_id}/${project_task_id}`,
      project_task
    );
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
