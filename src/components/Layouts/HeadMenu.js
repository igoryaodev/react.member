import React, { Component } from 'react'
import { HashRouter as Router, NavLink } from 'react-router-dom'
import './HeadMenu.less'

const logo = 'http://vartcdn.vart.la/pgc/activity/01130974284443148a15c2889ec71a4f.png'

export default class HeadMenu extends Component{

  render(){
    return(
      <div className="HeadMenu">
        <div className="topLogo">
          <img src={logo} alt='logo' />
        </div>
        <div>
          <Router>
            <NavLink to='/product'>票务</NavLink>
          </Router>
        </div>
      </div>
    )
  }
}