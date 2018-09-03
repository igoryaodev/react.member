import React, { Component } from 'react'
import HeadMenu from './HeadMenu'

export default class Header extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <HeadMenu />
      </div>
    )
  }
}