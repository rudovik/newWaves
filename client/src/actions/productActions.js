import axios from 'axios'
import { PRODUCT_SERVER, getErrorPayload } from '../components/utils/misc'
import {
  GET_PRODUCTS_BY_SELL_SUCCESS,
  GET_PRODUCTS_BY_SELL_FAIL,
  GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
  GET_PRODUCTS_BY_ARRIVAL_FAIL,
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAIL,
  GET_WOODS_SUCCESS,
  GET_WOODS_FAIL,
  GET_PRODUCTS_TO_SHOP_SUCCESS,
  GET_PRODUCTS_TO_SHOP_FAIL,
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

export const getBrands = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${PRODUCT_SERVER}/brands`)
    dispatch({
      type: GET_BRANDS_SUCCESS,
      payload: data.brands,
    })
  } catch (error) {
    dispatch({
      type: GET_BRANDS_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const getWoods = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${PRODUCT_SERVER}/woods`)
    dispatch({
      type: GET_WOODS_SUCCESS,
      payload: data.woods,
    })
  } catch (error) {
    dispatch({
      type: GET_WOODS_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const getProductsToShop = (skip, limit, filters) => async (dispatch) => {
  try {
    const params = { limit, skip, filters }

    const { data } = await axios.post(`${PRODUCT_SERVER}/shop`, params)

    dispatch({
      type: GET_PRODUCTS_TO_SHOP_SUCCESS,
      payload: { size: data.size, articles: data.articles },
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_TO_SHOP_FAIL,
      payload: getErrorPayload(error),
    })
  }
}
