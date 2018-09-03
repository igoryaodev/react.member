import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './menu.less'

export default class Menu extends Component {
  // constructor(props){
  //   super(props)
  // }

  componentDidMount() {

  }

  render() {
    return (
      <div className="rootMenu">
        <NavLink to='/'>首页</NavLink>
        <NavLink to='/'>全部商品</NavLink>
        <NavLink to='/'>购物车</NavLink>
        <NavLink to='/'>我的</NavLink>
      </div>
    )
  }

}