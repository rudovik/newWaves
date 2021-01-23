import {
  GET_PRODUCTS_BY_SELL_SUCCESS,
  GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
  GET_BRANDS_SUCCESS,
  ADD_BRAND_SUCCESS,
  GET_WOODS_SUCCESS,
  GET_PRODUCTS_TO_SHOP_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  CLEAR_PRODUCT,
  ADD_WOOD_SUCCESS,
} from '../constants/productConstants'

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL_SUCCESS:
      return { ...state, productsBySell: action.payload.products }
    case GET_PRODUCTS_BY_ARRIVAL_SUCCESS:
      return { ...state, productsByArrival: action.payload.products }
    case ADD_BRAND_SUCCESS:
      return {
        ...state,
        addBrand: action.payload.success,
        brands: action.payload.brands,
      }
    case ADD_WOOD_SUCCESS:
      return {
        ...state,
        addWood: action.payload.success,
        woods: action.payload.woods,
      }
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
    case ADD_PRODUCT_SUCCESS:
      return { ...state, addProduct: action.payload }

    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload }

    default:
      return state
  }
}
