import React, { Component, PropTypes } from 'react'
import { relativePositionToCSS } from '../../logic/util/positioning-util'
import './AbstractAreaComponent.css'

export class AbstractAreaComponent extends Component {
  render () {
   return <div className="AbstractAreaComponent"
               style={relativePositionToCSS(this.props.position)}
               // onClick={this.onResizeBulletClick.bind(this)}
         // onMouseDown={this.onMouseDown.bind(this)}
         // onMouseMove={this.onMouseMove.bind(this)}
         // onMouseUp={this.onMouseUp.bind(this)}
   >
      {this.props.children}
    </div>
  }
}

AbstractAreaComponent.propTypes = {
  position: PropTypes.shape({
    x1: PropTypes.number,
    y1: PropTypes.number,
    x2: PropTypes.number,
    y2: PropTypes.number,
  }),
  id: PropTypes.string,
  onPositionChange: PropTypes.func
}

AbstractAreaComponent.defaultProps = {}
