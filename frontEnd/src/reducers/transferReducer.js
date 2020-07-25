import {
  //得到actions的type
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
} from "../actions/types";

//初始状态
const initialState = {
  project_tasks: [],
  project_task: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        project_tasks: action.payload, //这里的payload是从后端得到的一系列tasks
      };

    case GET_PROJECT_TASK:
      return {
        ...state,
        project_task: action.payload,
      };

    case DELETE_PROJECT_TASK:
      return {
        ...state,
        project_tasks: state.project_tasks.filter(
          (project_task) => project_task.projectSequence !== action.payload
        ),
      };

    default:
      return state;
  }
}
