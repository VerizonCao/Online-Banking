import {
  //得到actions的type
  GET_RECIPIENT,
  TRANSFERIN,
  TRANSFEROUT,
} from "../actions/types";

//初始状态
const initialState = {
  account_tasks: [],
  account_task: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RECIPIENT:
      return {
        ...state,
        account_tasks: action.payload, //这里的payload是从后端得到的一系列tasks
      };

    case TRANSFERIN:
      return {
        ...state,
        account_task: action.payload,
      };

    case TRANSFEROUT:
      return {
        ...state,
        account_tasks: state.account_tasks.filter(
          (account_task) => account_task.accountSequence !== action.payload
        ),
      };

    default:
      return state;
  }
}
