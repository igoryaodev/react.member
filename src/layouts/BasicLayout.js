import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from '../components/Layouts/Header'
import Routes from '../routes/index'
import styles from './BasicLayout.less'


export default class BasicLayout extends Component {
  componentWillUnmount(){
    console.log('componentWillUnmount\n')
  }
  render(){

    return (
      <div>
        <Header />
        <div className="content">
          <Router>
            <Switch>
              {
                Routes && Routes.map((item, index) => (<Route {...item} key={index} />))
              }
              <Redirect from='/' to='/product' />
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}