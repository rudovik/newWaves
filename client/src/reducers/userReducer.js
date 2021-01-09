import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_FAIL_RESET,
} from '../constants/userConstants'

const userLoginReducer = (
  state = { loading: null, error: null, loginSuccess: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        loginSuccess: action.payload,
        error: false,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        loginSuccess: false,
        error: action.payload,
      }
    case USER_LOGIN_FAIL_RESET:
      return { ...state, error: false }
    default:
      return state
  }
}

export { userLoginReducer }
