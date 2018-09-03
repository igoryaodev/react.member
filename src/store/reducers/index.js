import { combineReducers } from 'redux'
import productList from './product/productList'

let rootReducer = combineReducers({
  productList,
})

export default rootReducer