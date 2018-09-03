import ProductList from './Product/ProductList'
import ProductDetail from './Product/ProductDetail'
import OrderDetail from './Order/OrderDetail'
import NotFound from './NotFound'

import Test from './Test'

const routers = [
  {
    exact: true,
    name:'ProductList',
    path: '/product',
    component: ProductList
  },
  {
    exact: true,
    name:'ProductDetail',
    path: '/product/detail/:id',
    component: ProductDetail
  },
  {
    exact: true,
    name:'OrderDetail',
    path: '/order/detail/:id',
    component: OrderDetail
  },
  {
    exact: true,
    name:'NotFound',
    path: '/404',
    component: NotFound
  },

]

module.exports = routers
