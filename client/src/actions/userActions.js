import axios from 'axios'

import {
  USER_SERVER,
  PRODUCT_SERVER,
  getErrorPayload,
} from '../components/utils/misc'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_FAIL_RESET,
  USER_REGISTER_FAIL_RESET,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
  USER_AUTH_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_ADD_TO_CART_SUCCESS,
  USER_ADD_TO_CART_FAIL,
  USER_GET_CART_ITEMS_SUCCESS,
  USER_GET_CART_ITEMS_FAIL,
  USER_REMOVE_CART_ITEM_SUCCESS,
  USER_REMOVE_CART_ITEM_FAIL,
  USER_BUY_SUCCESS,
  USER_BUY_FAIL,
  USER_UPDATE_DATA_SUCCESS,
  USER_UDATE_DATA_FAIL,
  USER_CLEAR_UPDATE_FORM_SUCCESS,
} from '../constants/userConstants'

export const loginUser = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const { data } = await axios.post(`${USER_SERVER}/login`, dataToSubmit)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const registerUser = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const { data } = await axios.post(`${USER_SERVER}/register`, dataToSubmit)
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.registerSuccess,
    })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const authUser = () => async (dispatch) => {
  try {
    await dispatch({
      type: USER_AUTH_REQUEST,
    })
    const { data } = await axios.get(`${USER_SERVER}/auth`)

    await dispatch({
      type: USER_AUTH_SUCCESS,
      payload: data,
    })
  } catch (error) {
    await dispatch({
      type: USER_AUTH_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    })

    const { data } = await axios.get(`${USER_SERVER}/logout`)

    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const addToCart = (_id) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${USER_SERVER}/addToCart?productId=${_id}`
    )
    dispatch({
      type: USER_ADD_TO_CART_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_ADD_TO_CART_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const getCartItems = (cartItems, cart) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${PRODUCT_SERVER}/articles_by_ids?id=${cartItems}&type=array`
    )

    const cartDetails = data.products
    cart.forEach((item) => {
      cartDetails.forEach((k, i) => {
        if (item.id === k._id) {
          cartDetails[i].quantity = item.quantity
        }
      })
    })

    dispatch({
      type: USER_GET_CART_ITEMS_SUCCESS,
      payload: cartDetails,
    })
  } catch (error) {
    dispatch({
      type: USER_GET_CART_ITEMS_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const removeCartItem = (id) => async (dispatch) => {
  try {
    const { data } = await axios(`${USER_SERVER}/removeFromCart?_id=${id}`)

    const { cart, cartDetails } = data

    cart.forEach((item) => {
      cartDetails.forEach((k, i) => {
        if (item._id === k._id) {
          cartDetails[i].quantity = item.quantity
        }
      })
    })

    dispatch({
      type: USER_REMOVE_CART_ITEM_SUCCESS,
      payload: { cart, cartDetails },
    })
  } catch (error) {
    dispatch({
      type: USER_REMOVE_CART_ITEM_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const successBuy = (productData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${USER_SERVER}/successBuy`, productData)

    dispatch({
      type: USER_BUY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_BUY_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const updateUserData = (dataToSubmit) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${USER_SERVER}/update_profile`,
      dataToSubmit
    )

    dispatch({
      type: USER_UPDATE_DATA_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: USER_UDATE_DATA_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const clearUpdateUserForm = () => async (dispatch) => {
  dispatch({
    type: USER_CLEAR_UPDATE_FORM_SUCCESS,
    payload: false,
  })
}

export const userLoginFailReset = () => ({ type: USER_LOGIN_FAIL_RESET })

export const userRegisterFailReset = () => ({ type: USER_REGISTER_FAIL_RESET })
