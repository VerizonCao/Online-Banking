import axios from "axios";
import {
  GET_ERRORS,
  GET_RECIPIENT,
  DELETE_RECIPIENT,
  TRANSFERIN,
  TRANSFEROUT,
} from "./types";

export const addRecipients = (user_id, recipient, history) => async (
  dispatch
) => {
  try {
    await axios.post(`/api/recipient/${user_id}`, recipient);
    history.push(`/recipientBoard/${user_id}`);
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

export const getRecipient = (recipient_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/recipient/${recipient_id}`);
    dispatch({
      type: GET_RECIPIENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteRecipient = (recipient_id, user_id) => async (dispatch) => {
  if (
    window.confirm(
      `You are deleting project task ${recipient_id}, this action cannot be undone`
    )
  ) {
    //这里很关键 第一步是delete后端的东西 然后需要dispatch来使得redux store更新
    await axios.delete(`/api/backlog/${user_id}/${recipient_id}`);
    dispatch({
      type: DELETE_RECIPIENT,
      payload: recipient_id,
    });
  }
};

export const TransferInAccount = (user_id, type, amount) => async (
  dispatch
) => {
  try {
    const res = await axios.get(`/api/trasfer/${user_id}/${type}/${amount}`);
    dispatch({
      type: TRANSFERIN,
      payload: res.data,
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const TransferOutAccount = (
  user_id,
  user1_id,
  amount,
  history
) => async (dispatch) => {
  try {
    await axios.patch(
      `/api/backlog/${user_id}/${user1_id}/${amount}`
    );
    dispatch({
      type: TRANSFEROUT,
      payload: res.data,
    });
    history.push(`/dashboard/${user_id}`);
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
