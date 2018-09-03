// import Menu from '../../components/Layouts/Menu'
import API from '../../services/request'
import styles from './ProductList.less'
import { priceFormat } from '../../utils/util'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactSwipe from 'react-swipe'
import { Carousel } from 'antd-mobile'


// import { fetch } from '../../models/Product/ProductList'
// debugger

export default class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.query()
  }
  componentWillUnMount(){
    console.log('componentWillUnMount')
  }
  query(){
    API.GET(`/api/product`).then(data => {
      this.setState({
        ...data,
        defaultImg: API.defaultImg,
      })
    })
  }
  routerHandle(e){
    // e.preventDefault()
    let _e = e.target
    let _id = _e.id
    if(!_id) return

  }
originWidth(){
  return window.outerWidth
}

  render() {
    const { products, defaultImg } = this.state
    return (
      <div className="ProductList">
        <div className="searchBar">
          <input className="searchBox" autoFocus="true" type="search" placeholder="请输入搜索的商品" />
        </div>
        <div className="swiperBox">
        {
          products && products[0] && (
            <Carousel 
              dots={false}
              dragging={false}
              swiping={false}
              autoplay
              infinite
              resetAutoplay={false}
            >
              {
                  products && products[0] && 
                  products.map((e, i) => {
                    var { productSpec } = e
                    var specPrice = [], min = 0, max = 0;
                    if(productSpec && productSpec[0]){//  取活动价
                      for(var attr of productSpec) {
                        specPrice.push(attr.activityPrice)
                        if(productSpec.productSpec && productSpec.productSpec[0]){
                          for(var sub of productSpec.productSpec){
                            specPrice.push(sub.activityPrice)
                            if(sub.productSpec && sub.productSpec[0]){
                              for(var ssub of sub.productSpec){
                                specPrice.push(ssub.activityPrice)
                              }
                            }
                          }
                        }
                      }
                    }
                    if(specPrice && specPrice[0]){
                      min = specPrice.reduce((prev, next) => Math.min(prev, next))
                      max = specPrice.reduce((prev, next) => Math.max(prev, next))
                    }
                    const routeUrl = `/product/detail/${e.id}?min=${min}&max=${max}`
                    return (
                    <Link key={i} to={routeUrl} >
                      <img src={e.picUrl ? e.picUrl : defaultImg} alt="." />
                    </Link>
                  )}
                  )
                }
            </Carousel>
          )
        }
        </div>
        {
          products&& products[0] &&
          products.map((e, i) => {
            var { productSpec } = e
            console.log(productSpec)
            var specPrice = [], min = 0, max = 0;
            if(productSpec && productSpec[0]){//  取活动价
              for(var attr of productSpec) {
                specPrice.push(attr.activityPrice)
                if(productSpec.productSpec && productSpec.productSpec[0]){
                  for(var sub of productSpec.productSpec){
                    specPrice.push(sub.activityPrice)
                    if(sub.productSpec && sub.productSpec[0]){
                      for(var ssub of sub.productSpec){
                        specPrice.push(ssub.activityPrice)
                      }
                    }
                  }
                }
              }
            }
            if(specPrice && specPrice[0]){// 
              min = specPrice.reduce((prev, next) => Math.min(prev, next))
              max = specPrice.reduce((prev, next) => Math.max(prev, next))
            }
            const routeUrl = `/product/detail/${e.id}?min=${min}&max=${max}`

            return (
              <Link className="coverBox" key={i} to={routeUrl}>
                <div>
                  <img src={e.picUrl? e.picUrl : defaultImg} alt='.' />
                </div>
                <div className="coverName">{e.name}</div>
                <div className="bookBox">
                  <div className="theme price">
                    {
                      min === max ? (
                          <div>{priceFormat(min)}</div>
                      ): (
                        <div>{priceFormat(min)} ~ {priceFormat(max)}</div>
                      )
                    }
                  </div>
                  <div className="minThemeBtn">立即购买</div>
                </div>
              </Link>
            )
          })
        }
      </div>
    )
  }
}