import axios from 'axios'
import { PRODUCT_SERVER, getErrorPayload } from '../components/utils/misc'
import {
  GET_PRODUCTS_BY_SELL_SUCCESS,
  GET_PRODUCTS_BY_SELL_FAIL,
  GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
  GET_PRODUCTS_BY_ARRIVAL_FAIL,
  GET_BRANDS_SUCCESS,
  ADD_BRAND_SUCCESS,
  GET_BRANDS_FAIL,
  GET_WOODS_SUCCESS,
  GET_WOODS_FAIL,
  GET_PRODUCTS_TO_SHOP_SUCCESS,
  GET_PRODUCTS_TO_SHOP_FAIL,
  GET_PRODUCT_DETAILS_SUCCESS,
  CLEAR_PRODUCT_DETAILS,
  ADD_PRODUCT_SUCCESS,
  CLEAR_PRODUCT,
  ADD_WOOD_SUCCESS,
} from '../constants/productConstants'

export const getProductDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${PRODUCT_SERVER}/articles_by_ids?id=${id}&type=single`
    )

    dispatch({
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: data.products[0],
    })
  } catch (error) {}
}

export const clearProductDetails = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT_DETAILS,
    payload: null,
  })
}

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

export const getProductsToShop = (
  skip,
  limit,
  filters,
  previousState = []
) => async (dispatch) => {
  try {
    const params = { limit, skip, filters }

    const { data } = await axios.post(`${PRODUCT_SERVER}/shop`, params)

    const newState = [...previousState, ...data.articles]

    dispatch({
      type: GET_PRODUCTS_TO_SHOP_SUCCESS,
      payload: { size: data.size, articles: newState },
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_TO_SHOP_FAIL,
      payload: getErrorPayload(error),
    })
  }
}

export const addProduct = (dataToSubmit) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)

    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {}
}

export const clearProduct = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT,
    payload: null,
  })
}

export const addBrand = (dataToSubmit, existingBrands) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit)

    dispatch({
      type: ADD_BRAND_SUCCESS,
      payload: {
        brands: [...existingBrands, data.brand],
        success: data.success,
      },
    })
  } catch (error) {}
}

export const addWood = (dataToSubmit, existingWoods) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit)

    dispatch({
      type: ADD_WOOD_SUCCESS,
      payload: {
        woods: [...existingWoods, data.wood],
        success: data.success,
      },
    })
  } catch (error) {}
}
