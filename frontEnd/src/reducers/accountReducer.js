import { GET_ACCOUNTS, GET_ACCOUNT, DELETE_ACCOUNT } from "../actions/types";

//初始的state 在redux里面的
const initialState = {
  accounts: [],
  account: {},
};

//array
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };
    case GET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          //因为传来的是id，所以打配合
          (account) => account.accountIdentifier !== action.payload
        ),
      };

    default:
      return state;
  }
}
