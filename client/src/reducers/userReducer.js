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
  USER_LOGOUT_REQUEST,
  USER_ADD_TO_CART_SUCCESS,
  USER_ADD_TO_CART_FAIL,
  USER_GET_CART_ITEMS_SUCCESS,
  USER_REMOVE_CART_ITEM_SUCCESS,
  /* USER_REMOVE_CART_ITEM_FAIL,*/
  USER_BUY_SUCCESS,
  USER_UPDATE_DATA_SUCCESS,
  // USER_UDATE_DATA_FAIL,
  USER_CLEAR_UPDATE_FORM_SUCCESS,
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
        user: { ...user, updateUser: false },
        authError: false,
        loginError: false,
      }
    case USER_ADD_TO_CART_SUCCESS:
      return {
        ...state,
        user: { ...state.user, cart: action.payload },
      }
    case USER_REMOVE_CART_ITEM_SUCCESS:
      return { ...state, user: { ...state.user, cart: action.payload.cart } }
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
    case USER_BUY_SUCCESS:
      return {
        ...state,
        successBuy: action.payload.success,
        user: { ...state.user, cart: action.payload.cart },
      }
    case USER_UPDATE_DATA_SUCCESS:
      return { ...state, updateUser: action.payload }
    case USER_CLEAR_UPDATE_FORM_SUCCESS:
      return { ...state, updateUser: action.payload }
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

const userCartReducer = (state = { cart: [], cartDetails: [] }, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
    case USER_AUTH_SUCCESS:
      return { ...state, cart: action.payload.user.cart }
    case USER_ADD_TO_CART_SUCCESS:
      return { ...state, cart: action.payload }
    case USER_ADD_TO_CART_FAIL:
      return { ...state }
    case USER_GET_CART_ITEMS_SUCCESS:
      return { ...state, cartDetails: action.payload }
    case USER_REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartDetails: action.payload.cartDetails,
        cart: action.payload.cart,
      }
    case USER_BUY_SUCCESS:
      return {
        ...state,
        cart: action.payload.cart,
        cartDetails: action.payload.cartDetails,
      }
    // case USER_REMOVE_CART_ITEM_FAIL:
    //   return console.log(action.payload)
    default:
      return state
  }
}

export { userLoginReducer, userRegisterReducer, userCartReducer }
