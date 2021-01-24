import { combineReducers } from 'redux'
import {
  userLoginReducer,
  userRegisterReducer,
  userCartReducer,
} from './userReducer'
import { productsReducer } from './productReducer'

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  products: productsReducer,
  userCart: userCartReducer,
})

export default rootReducer
