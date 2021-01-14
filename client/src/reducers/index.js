import { combineReducers } from 'redux'
import { userLoginReducer, userRegisterReducer } from './userReducer'
import { productsReducer } from './productReducer'

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  products: productsReducer,
})

export default rootReducer
