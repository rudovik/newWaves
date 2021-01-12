import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_FAIL_RESET,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_FAIL_RESET,
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
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

const userRegisterReducer = (
  state = { loading: null, error: null, registerSuccess: null },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        registerSuccess: action.payload,
        error: false,
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        registerSuccess: false,
        error: action.payload,
      }
    case USER_REGISTER_FAIL_RESET:
      return { ...state, error: false }
    default:
      return state
  }
}

const userAuthReducer = (
  state = { loading: null, error: null, user: null },
  action
) => {
  switch (action.type) {
    case USER_AUTH_REQUEST:
      return { ...state, loading: true }
    case USER_AUTH_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: false,
      }
    case USER_AUTH_FAIL:
      return {
        loading: false,
        user: {},
        error: action.payload,
      }
    default:
      return state
  }
}

export { userLoginReducer, userRegisterReducer, userAuthReducer }
