import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'react-saga' 

const testReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
// const sagaMiddleware = createSagaMiddleware()
// const store = createStore(
//     applyMiddleware(sagaMiddleware)
//   )

const storeConfig = () => {
  return createStore(testReducer)
}

export default storeConfig