import React, { Component } from 'react'
import { connect } from 'react-redux'

class Test extends Component {

  render() {
    this.props
    debugger
    return (
      <div>test</div>
    )
  }
}

export default connect((state) => state.ProductList)(Test)