import axios from 'axios'
import { PRODUCT_SERVER, getErrorPayload } from '../components/utils/misc'
import {
  GET_PRODUCTS_BY_SELL_SUCCESS,
  GET_PRODUCTS_BY_SELL_FAIL,
  GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
  GET_PRODUCTS_BY_ARRIVAL_FAIL,
} from '../constants/productConstants'

export const getProductsBySell = () => async (dispatch) => {
  try {
    // BY SELL
    // /articles?sortBy=sold&order=desc&limit=100
    const { data } = await axios.get(
      `${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`
    )

    dispatch({
      type: GET_PRODUCTS_BY_SELL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_BY_SELL_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const getProductsByArrival = () => async (dispatch) => {
  try {
    // BY ARRIVAL
    // /articles?sortBy=createdAt&order=desc&limit=4
    const { data } = await axios.get(
      `${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`
    )

    dispatch({
      type: GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
      payload: getErrorPayload(error),
    })
  }
}
