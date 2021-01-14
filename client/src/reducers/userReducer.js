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
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_LOADING_RESET,
  USER_LOGOUT_REQUEST,
} from '../constants/userConstants'

const userLoginReducer = (
  state = {
    loading: null,
    loginError: null,
    loginSuccess: null,
    user: null,
    authError: null,
  },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_AUTH_REQUEST:
    case USER_LOGOUT_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
    case USER_AUTH_SUCCESS:
      const { user, loginSuccess } = action.payload
      return {
        ...state,
        loading: false,
        loginSuccess,
        user,
        authError: false,
        loginError: false,
      }
    case USER_AUTH_FAIL:
      return {
        ...state,
        loading: false,
        loginSuccess: false,
        authError: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loginSuccess: false,
        loginError: action.payload,
      }
    case USER_LOGIN_FAIL_RESET:
      return { ...state, loginError: false }
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: false,
        loginSuccess: false,
        authError: false,
        loginError: false,
        loading: false,
      }
    case USER_LOGIN_LOADING_RESET:
      return { ...state, loading: null }

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

export { userLoginReducer, userRegisterReducer }
