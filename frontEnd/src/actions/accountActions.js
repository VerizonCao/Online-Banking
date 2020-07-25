import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

//actions 才是真正需要干的事，而reducer其实并没啥逻辑
//这里是做一个post的操作。catch error
//async 异步操作   a fucntion that return the dispatch fucntion
export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post("/api/project", project);
    //use history here
    //如果成功，就去/dashboard
    //消除了errors始终存在的问题
    history.push("/dashboard");
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

export const getProjects = () => async (dispatch) => {
  const res = await axios.get("/api/project/all"); //目前这个url还有bug 没法显示在post。只能得到东西
  dispatch({
    type: GET_PROJECTS,
    payload: res.data, //这里吧project的iterator给了这个array
  });
};

export const getProject = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/${id}`); //目前这个url还有bug 没法显示在post。只能得到东西
    dispatch({
      type: GET_PROJECT,
      payload: res.data, //这里吧project的iterator给了这个array
    });
  } catch (errors) {
    history.push("/dashboard");
  }
};

export const deleteProject = (id, history) => async (dispatch) => {
  if (window.confirm("Are you sure to delete the prokect?")) {
    try {
      await axios.delete(`/api/project/${id}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: id, //这里给了这个id
      });
    } catch (errors) {
      history.push("/dashboard");
    }
  }
};
