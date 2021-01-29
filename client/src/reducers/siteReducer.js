import {
  SITE_GET_DATA_SUCCESS,
  SITE_UPDATE_DATA_SUCCESS,
  SITE_RESET_SUCCESS_UPDATE_SUCCESS,
} from '../constants/siteConstants'

export const siteReducer = (
  state = { siteData: [], success: false },
  action
) => {
  switch (action.type) {
    case SITE_GET_DATA_SUCCESS:
      return { ...state, siteData: action.payload }
    case SITE_UPDATE_DATA_SUCCESS:
      return {
        ...state,
        siteData: action.payload.siteData,
        success: action.payload.success,
      }
    case SITE_RESET_SUCCESS_UPDATE_SUCCESS:
      return { ...state, success: false }
    default:
      return state
  }
}
