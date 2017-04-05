import React, { Component, PropTypes } from 'react'
import './MoveBullet.css'
import { AbstractAreaComponent } from '../AbstractAreaComponent/AbstractAreaComponent'

export class MoveBullet extends Component {
  onMouseDown (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onMoveStart()
  }

  onMouseUp (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onMoveStop()
  }

  render () {
    return (
      <AbstractAreaComponent position={this.props.position}>
        <div className="MoveBullet"
             onMouseDown={this.onMouseDown.bind(this)}
             onMouseUp={this.onMouseUp.bind(this)}/>
      </AbstractAreaComponent>
    )
  }
}

MoveBullet.propTypes = {
  position: PropTypes.shape({
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
  }),
  onMoveStart: PropTypes.func,
  onMoveStop: PropTypes.func

}

MoveBullet.defaultProps = {}
