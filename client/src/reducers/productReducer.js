import {
  GET_PRODUCTS_BY_SELL_SUCCESS,
  GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
} from '../constants/productConstants'

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL_SUCCESS:
      return { ...state, productsBySell: action.payload.products }
    case GET_PRODUCTS_BY_ARRIVAL_SUCCESS:
      return { ...state, productsByArrival: action.payload.products }
    default:
      return state
  }
}
