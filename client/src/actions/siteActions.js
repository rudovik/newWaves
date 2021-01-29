import axios from 'axios'
import {} from '../constants/siteConstants'
import { SITE_SERVER, getErrorPayload } from '../components/utils/misc'

import {
  SITE_GET_DATA_START,
  SITE_GET_DATA_SUCCESS,
  SITE_GET_DATA_FAIL,
  SITE_UPDATE_DATA_SUCCESS,
  SITE_UPDATE_DATA_FAIL,
  SITE_RESET_SUCCESS_UPDATE_SUCCESS,
} from '../constants/siteConstants'

export const getSiteData = () => async (dispatch) => {
  try {
    dispatch({
      type: SITE_GET_DATA_START,
    })

    const { data } = await axios.get(`${SITE_SERVER}/site_data`)

    dispatch({
      type: SITE_GET_DATA_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SITE_GET_DATA_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const updateSiteData = (dataToSubmit) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${SITE_SERVER}/site_data`, dataToSubmit)
    const { siteData, success } = data

    dispatch({
      type: SITE_UPDATE_DATA_SUCCESS,
      payload: { siteData, success },
    })
  } catch (error) {
    dispatch({
      type: SITE_UPDATE_DATA_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const resetSuccessUpdate = () => async (dispatch) => {
  dispatch({
    type: SITE_RESET_SUCCESS_UPDATE_SUCCESS,
  })
}
