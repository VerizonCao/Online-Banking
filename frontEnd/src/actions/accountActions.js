import axios from "axios";
import { GET_ERRORS, GET_ACCOUNTS, GET_ACCOUNT, DELETE_ACCOUNT } from "./types";

//actions 才是真正需要干的事，而reducer其实并没啥逻辑
//这里是做一个post的操作。catch error
//async 异步操作   a fucntion that return the dispatch fucntion
export const createAccount = (account, history) => async (dispatch) => {
  try {
    await axios.post("/api/account", account);
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

export const getAccount = () => async (dispatch) => {
  const res = await axios.get("/api/account/all"); //目前这个url还有bug 没法显示在post。只能得到东西
  dispatch({
    type: GET_ACCOUNTS,
    payload: res.data, //这里吧project的iterator给了这个array
  });
};

export const getAccount = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/account/${id}`); //目前这个url还有bug 没法显示在post。只能得到东西
    dispatch({
      type: GET_ACCOUNT,
      payload: res.data, //这里吧project的iterator给了这个array
    });
  } catch (errors) {
    history.push("/dashboard");
  }
};

export const deleteAccount = (id, history) => async (dispatch) => {
  if (window.confirm("Are you sure to delete the prokect?")) {
    try {
      await axios.delete(`/api/account/${id}`);
      dispatch({
        type: DELETE_ACCOUNT,
        payload: id, //这里给了这个id
      });
    } catch (errors) {
      history.push("/dashboard");
    }
  }
};
