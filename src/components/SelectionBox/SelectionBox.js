import React, { Component, PropTypes } from 'react'
import { AbstractAreaComponent } from '../AbstractAreaComponent/AbstractAreaComponent'
import './SelectionBox.css'

export class SelectionBox extends Component {
  getSelectionBox () {
    return (
      <AbstractAreaComponent position={this.props.position}>
        <div className="SelectionBox"/>
      </AbstractAreaComponent>
    )
  }

  render () {
    return this.getSelectionBox()
  }
}

SelectionBox.propTypes = {
  position: PropTypes.shape({
    x1: PropTypes.number,
    y1: PropTypes.number,
    x2: PropTypes.number,
    y2: PropTypes.number
  }),
  baseStyle: PropTypes.object
}

SelectionBox.defaultProps = {
  baseStyle: {}
}



