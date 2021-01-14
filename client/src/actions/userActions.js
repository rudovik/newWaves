import axios from 'axios'

import { USER_SERVER, getErrorPayload } from '../components/utils/misc'
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

export const userLoginFailReset = () => ({ type: USER_LOGIN_FAIL_RESET })

export const userRegisterFailReset = () => ({ type: USER_REGISTER_FAIL_RESET })
