import { combineReducers } from 'redux'
import {
  userLoginReducer,
  userRegisterReducer,
  userAuthReducer,
} from './userReducer'

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userAuth: userAuthReducer,
})

export default rootReducer
