import { GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "../actions/types";

//初始的state 在redux里面的
const initialState = {
  projects: [],
  project: {},
};

//array
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          //因为传来的是id，所以打配合
          (project) => project.projectIdentifier !== action.payload
        ),
      };

    default:
      return state;
  }
}
