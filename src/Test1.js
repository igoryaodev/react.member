import React, { Component } from 'react'
import { connect } from 'react-redux'

class Test1 extends Component {

  render() {
    this.props
    debugger
    return (
      <div>test1</div>
    )
  }
}

export default connect((state) => state.Test1)(Test1)