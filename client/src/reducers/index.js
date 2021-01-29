import { combineReducers } from 'redux'
import {
  userLoginReducer,
  userRegisterReducer,
  userCartReducer,
} from './userReducer'
import { productsReducer } from './productReducer'
import { siteReducer } from './siteReducer'

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  products: productsReducer,
  userCart: userCartReducer,
  site: siteReducer,
})

export default rootReducer
