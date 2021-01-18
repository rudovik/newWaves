import {
  GET_PRODUCTS_BY_SELL_SUCCESS,
  GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
  GET_BRANDS_SUCCESS,
  GET_WOODS_SUCCESS,
  GET_PRODUCTS_TO_SHOP_SUCCESS,
} from '../constants/productConstants'

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL_SUCCESS:
      return { ...state, productsBySell: action.payload.products }
    case GET_PRODUCTS_BY_ARRIVAL_SUCCESS:
      return { ...state, productsByArrival: action.payload.products }
    case GET_BRANDS_SUCCESS:
      return { ...state, brands: action.payload }
    case GET_WOODS_SUCCESS:
      return { ...state, woods: action.payload }
    case GET_PRODUCTS_TO_SHOP_SUCCESS:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size,
      }
    default:
      return state
  }
}
