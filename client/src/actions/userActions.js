import axios from 'axios'

import { USER_SERVER } from '../components/utils/misc'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_FAIL_RESET,
} from '../constants/userConstants'

export const loginUser = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const { data } = await axios.post(`${USER_SERVER}/login`, dataToSubmit)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.loginSuccess,
    })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data
          : error.message || error.request,
    })
  }
}

export const userLoginFailReset = () => ({ type: USER_LOGIN_FAIL_RESET })
