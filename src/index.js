import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import Routes from './routes'
import BasicLayout from './layouts/BasicLayout'
import 'antd-mobile/dist/antd-mobile.css'
import './index.less';
import rootReducer from './models/index'

if(module.hot){
    module.hot.accept();
}

const store = createStore(rootReducer)
ReactDOM.render(
  <Provider store={store}>
    <BasicLayout />
  </Provider>
  , 
  document.getElementById('root')
);

