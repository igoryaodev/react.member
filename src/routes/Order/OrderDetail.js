import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { createStore } from 'redux'
import API from '../../services/request'
// import { fetch } from '../../models/Product/ProductList'
// debugger

export default class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.query()
  }

  query(){
    const { match } = this.props 
    const { params } = match
    const { id } = params
    API.GET(`/api/product/withspec/${id}`).then(data => {
      this.setState({
        product: data,
        defaultImg: API.defaultImg,
      })
      document.getElementById('description').innerHTML = data.description
    })
  }
  submit() {
    const { match } = this.props 
    const { params } = match
    const { id } = params
    let payload = {
      orderChannel: 0,
      businessType: 1,
      userId: 0,
      productCounts: [
        {
          productId: id,
          productSpecId: 63,
          count: 1
        }
      ]
    }
    API.POST(`/api/order`, payload).then(data => {
      if(data && data.status === 1) {
        window.location.href = `/order/detail/${id}`
      }
    })
  }


  render() {
    const { product, defaultImg } = this.state
    // const desc = product && () => (product.description)
    return (
      <div>
        {
         product && product.id && (
          <div>
            <div>
              <img src={product.picUrl ? product.picUrl : defaultImg} alt='.' />
              <div >{product.name}</div>
            </div>
            <div id="description"></div>
            <div> 
              <Link to='/'>立即购买</Link>
            </div>
          </div>
         ) 
        }
      </div>
    )
  }
}