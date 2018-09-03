import API from '../../services/request'
import './ProductDetail.less'
import { priceFormat, querystring } from '../../utils/util'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Icon, Carousel, InputItem } from 'antd-mobile'

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: 'skuModal hide',
      booking: false,
      count: 1,
    }
  }
  componentDidMount() {
    this.query()
  }
  /*
  * @获取商品详情
  */
  query(){
    const { match, location } = this.props
    const { params } = match
    const { id } = params
    let { search } = location
    const priceRange = querystring(search)
    // debugger
    API.GET(`/api/product/withspec/${id}`).then(data => {
      if(!data) return
      let product = data,
          productSpec = data.productSpec, // 商品规格
          activeSpec, // 选中的商品规格
          activeImg, // 选中规格的标题图
          activeSwipers,// 轮播图
          firstSku = productSpec, // 第一层规格
          secondSku,// 第二层规格
          thirdSku, // 第三层规格
          vipPrice, // 会员价
          originPrice, // 用于价格计算
          price, // 原价
          inInventory, // 库存
          productSpecId, // 规格ID
          activityPrice; // 活动价

      if(firstSku && firstSku[0] && firstSku[0].id)
        firstSku[0].class = 'active'
      secondSku = productSpec && productSpec[0] && productSpec[0].productSpec && productSpec[0].productSpec
      if(secondSku && secondSku[0] && secondSku[0].id)
        secondSku[0].class = 'active'
      thirdSku = secondSku && productSpec[0].productSpec[0] && productSpec[0].productSpec[0].productSpec
      if(thirdSku && thirdSku[0] && thirdSku[0].id)
        thirdSku[0].class = 'active'
      if(firstSku && !secondSku[0]){
        activeSpec = firstSku[0]
      }
      if(firstSku && secondSku[0] && (!thirdSku || thirdSku && !thirdSku[0])){
        activeSpec = secondSku[0]
      }
      if(firstSku && secondSku && thirdSku && thirdSku[0]){
        activeSpec = thirdSku[0]
      }
      if(activeSpec){
        activeImg = activeSpec.orderPicUrl
        vipPrice = activeSpec.vipPrice// 会员价
        price = activeSpec.price // 原价
        activityPrice = activeSpec.activityPrice// 活动价
        inInventory = activeSpec.inInventory// 库存
        originPrice = activityPrice
        productSpecId = activeSpec.id
        if(activeSpec.picUrl )
          activeSwipers = activeSpec.picUrl.split(',')
      }

      this.setState({
        product: data,
        defaultImg: API.defaultImg,
        routeUrl: `/order/detail/${id}`,
        productSpec, // 商品规格
        activeSpec, // 选中的商品规格
        activeImg, // 选中规格的标题图
        activeSwipers,// 轮播图
        firstSku, // 第一层规格
        secondSku,// 第二层规格
        thirdSku, // 第三层规格
        vipPrice, // 会员价
        price, // 原价
        activityPrice, // 活动价
        inInventory, // 库存
        originPrice, // 无会员
        productSpecId,
        priceRange,
      })
      if(data.description)
        document.getElementById('description').innerHTML = data.description.replace(/&nbsp;/g, '')
    })
  }
  /*
  * @提交订单
  */
  submit() {
    const { productSpecId, count } = this.state
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
          productSpecId: productSpecId,
          count: count
        }
      ]
    }
    API.POST(`/api/order`, payload).then(data => {
      if(data && data.status === 1) {
        debugger
        window.location.href = `/order/detail/${id}`
      }
    })
  }
  /*
  * @选择商品规格
  *
  */
  changeSkuProp(e) {
    if(!e.target.dataset) return
    e.stopPropagation()
    let { productSpec, secondSku, thirdSku } = this.state
    let currentClass = e.target.getAttribute('class')
    let newClass = currentClass + ' active'
    let data = e.target.dataset
    let payload, picUrl = [];
    let { keys, index, id, parent, grand } = data
    let activeNodes = document.querySelectorAll('div[data-role]')
    for(var attr of activeNodes){
      if(attr.dataset.keys !== keys) continue
      let selfClass = attr.getAttribute('class') 
      if(selfClass && selfClass.indexOf('active') !== -1){
        let realClass = selfClass.replace('active','')
        attr.setAttribute('class', realClass)
      }
    }
    e.target.setAttribute('class', newClass)
    switch (keys){
      case 'first':
        payload = productSpec[index]
        if(payload && payload.picUrl) picUrl = payload.picUrl.split(',') || []
        if(!secondSku && !thirdSku)
          this.setState({
            productSpec: productSpec,
            price: payload.price,
            activityPrice: payload.activityPrice,
            vipPrice: payload.vipPrice,
            inInventory: payload.inInventory,
            activeImg: payload.orderPicUrl,
            activeSwipers: picUrl,
            specType: payload.specType,
            specName: payload.specName,
            originPrice: payload.activityPrice, // 无会员
            productSpecId: id,
          })
        else
          this.setState({
            productSpec: productSpec,
            price: 0,
            activityPrice: 0,
            vipPrice: 0,
            inInventory: 0,
            activeImg: payload.orderPicUrl,
            activeSwipers: picUrl,
          })
        return
      case 'second':

        return 2
      case 'third':
        return 3
    }
  }
  /*
  * @显示规格弹框
  */
  showModal() {
    this.setState({
      modal: 'skuModal show',
    })
  }
  /*
  * @隐藏规格弹框
  */
  hideModal() {
     this.setState({
      modal: 'skuModal hide',
    })
  }

  /*
  * @显示订单预览
  */
  booking() {
    this.setState({
      booking: true,
    })
  }
  /*
  * @显示商品详情
  */
  cansel() {
    let { product } = this.state
    this.setState({
      booking: false,
      modal: 'skuModal hide',
    })
    if(product && product.description){
      document.getElementById('description').innerHTML = product.description.replace(/&nbsp;/g, '')
    }
  }

  /*
  * @商品数量编辑
  */
  increment(){
    let { count } = this.state
    count++ 
    this.setState({ count: count })
  }
  decrement(){
    let { count } = this.state 
    if(count > 1) count--
    this.setState({ count: count })
  }
  countChange(e){
    if(e){
      let value = e.target.value
      if(value)
        this.setState({count: value})
    } 
  }

  render() {
    const { 
      product, // 商品数据
      defaultImg, // 默认图
      routeUrl, // 订单详情
      booking, // 订单预览
      productSpec, // 商品规格
      activeSpec, // 选中的商品规格
      activeImg, // 选中规格的标题图
      activeSwipers,// 轮播图
      firstSku, // 第一层规格
      secondSku,// 第二层规格
      thirdSku, // 第三层规格
      vipPrice, // 会员价
      price, // 原价
      activityPrice, // 活动价
      originPrice, // 
      count, // 数量
      inInventory, // 库存
      specType,
      specName,
      priceRange,
    } = this.state

    return (
      <div>
        {
         product && product.id && (
          <div className="productDetail" style={{display: booking? 'none' : 'block'}}>
            <div className="productHeader">
              <div className="swiper">
                {
                  activeSwipers && activeSwipers[0] ? (
                    <Carousel autoplay>
                      {
                        activeSwipers.map((s, i) => (
                          <img key={i} src={s} alt='.' />
                        ))
                      }
                    </Carousel>
                  ) : 
                  (
                    <img src={product.picUrl} alt='.' />
                  )
                }
              </div>
              <div className="productName">{product.name}</div>
              <div className="productPrice">
                {
                 priceRange && priceRange.min === priceRange.max ? 
                 (
                  <span>{priceFormat(priceRange.min)}</span>
                  ) : priceRange && (
                    <span> {priceFormat(priceRange.min)} ~ {priceFormat(priceRange.max)}</span>
                  )
                }
               </div>
            </div>
            <div className="skuTab" onClick={() => this.showModal()}>
              {
                specName ? (
                  <div>
                    <span className="theme">{specType}：</span>
                    <span className="gray">{specName}</span>
                  </div>
                ) : (
                  <div>选择：规格</div>
                )
              }
              <Icon type="right" />
            </div>
            <div className="description" id="description"></div>
            <div> 
              <div className="detailBtn themeBtn" onClick={() => this.showModal()}>立即购买</div>
            </div>
            <div className={this.state.modal}>
              <div className="opacity" onClick={() => this.hideModal()}></div>
              <div className="modalContent">
                <div className="mbody">
                  <div>
                     {
                      productSpec && productSpec[0] && (
                        <div>
                          <div className="modalHeader">
                            <img className="titleImage" src={activeImg} alt='.' />
                            <div className="modalTitle">
                              <div className="mTileName">{product.name}</div>
                              <div className="priceNumber">
                                <span className="originPrice">原价：{priceFormat(price)}</span><span className="activityPrice">活动价：{priceFormat(activityPrice)}</span>
                              </div>
                              <div className="priceNumber">
                                <span className="vipPrice">VIP: {priceFormat(vipPrice)}</span>
                                <span className="inInventory">库存: {inInventory}</span>
                              </div>
                              <Icon onClick={() => this.hideModal()} className="close" size="large" type="cross-circle-o" color="#405E79" />
                            </div>
                          </div>
                          <div className="scrollbox">
                            <div className="specType">
                              {productSpec[0].specType}
                            </div>
                            <div className="specProperty">
                              {
                                productSpec.map((first, firstNum) => {
                                  return (
                                    <div className={first.class} data-role key={firstNum} 
                                    data-keys="first"
                                    data-index={firstNum}
                                    data-id={first.id} 
                                    data-parent={0} 
                                    data-grand={0}
                                    onClick={e => this.changeSkuProp(e)}>
                                      {first.specName}
                                    </div>
                                  )
                                })
                              }
                            </div>
                            <div className="specType">
                              {
                                secondSku && secondSku[0] && secondSku[0].specType
                              }
                            </div>
                            <div className="specProperty">
                              {
                                secondSku && secondSku[0] && secondSku.map((second, secondNum) => {
                                  return (
                                    <div className={second.class} data-role key={secondNum} onClick={e => this.changeSkuProp(e)}>
                                      {second.specName}
                                    </div>
                                  )
                                })
                              }
                            </div>
                            <div className="specType">
                              {
                                thirdSku && thirdSku[0] && thirdSku[0].specType
                              }
                            </div>
                            <div className="specProperty">
                              {
                                thirdSku && thirdSku[0] && thirdSku.map((third, thirdNum) => {
                                  return (
                                    <div className={third.class} data-role key={thirdNum} onClick={e => this.changeSkuProp(e)}>
                                      {third.specName}
                                    </div>
                                  )
                                })
                              }
                            </div>
                            <div className="countNumber">
                              <div>数量</div>
                              <div className="countRight">
                                <button className="numBtn decrement" onClick={() => this.decrement()} style={{background: count > 1?'none':'#f5f5f5'}}>-</button>
                                <input className="number" type="tel" value={count} onChange={e => this.countChange(e)} />
                                <button className="numBtn increment" onClick={() => this.increment()}>+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                     }
                  </div>
                  <div className="themeBtn" onClick={() => this.booking()}>立即购买</div>
                </div>
              </div>
            </div>
          </div>
         ) 
        }
        {
          product && (
            <div className="orderBooking" style={{display: booking? 'block' : 'none'}}>
              <div className="orderHeader">
                <div className="orderProduct">
                  <div className="orderImage">
                    <img src={activeImg} alt='.' />
                  </div>
                  <div className="orderText">
                    <div className="activeName">{product.name}</div>
                    <div className="activeSpec">
                    <span className="theme">{specType}</span>
                    <span className="gray">{specName}</span>
                    </div>
                    <div className="activeCount">{count}</div>
                  </div>
                </div>
                <div className="orderCells">
                  <div className="cellHeader">共{count}件</div>
                  <div className="cellFooter">合计：{priceFormat(originPrice*count)}</div>
                </div>
                <div className="orderCells">
                  <div className="cellHeader">优惠券</div>
                  <div className="cellFooter"><Icon type="right" /></div>
                </div>
              </div>
              <div className="tips">
                <p>温馨提示</p>
              </div>
              <div className="footerBar">
                <div className="footerCount">{priceFormat(originPrice*count)}</div>
                <div className="footerBtns">
                  <div className="minBtn backBtn" onClick={() => this.cansel()}>返回</div>
                  <div className="minBtn saveBtn" onClick={() => this.submit()}>提交</div>
                </div>
              </div>
            </div>
          )

        }
      </div>
    )
  }
}

export default withRouter(ProductDetail)