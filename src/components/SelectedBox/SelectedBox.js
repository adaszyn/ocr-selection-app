import React, { Component, PropTypes } from 'react'
import { SelectionToolKit } from '../SelectionToolKit/SelectionToolKit'
import { ResizeBullet } from '../ResizeBullet/ResizeBullet'
import { relativePositionToCSS } from '../../logic/util/positioning-util'
import { AbstractAreaComponent } from '../AbstractAreaComponent/AbstractAreaComponent'
import './SelectedBox.css'
import { MoveBullet } from '../MoveBullet/MoveBullet'

export class SelectedBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      mouseIsOver: false,
      position: props.position
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      position: props.position
    })
  }

  setMouseIsOverValue (value) {
    this.setState({
      mouseIsOver: value
    })
  }

  onMouseEnter () {
    this.setMouseIsOverValue(true)
  }

  onMouseLeave () {
    this.setMouseIsOverValue(false)
  }

  render () {
    return (
      <AbstractAreaComponent position={this.props.position}>
        <div className="SelectedBox" onMouseLeave={this.onMouseLeave.bind(this)}
             onMouseEnter={this.onMouseEnter.bind(this)}>
          <div className="toolkit-container">
            {this.state.mouseIsOver && <SelectionToolKit />}
          </div>
        </div>
      </AbstractAreaComponent>
    )
  }
}

SelectedBox.propTypes = {
  position: PropTypes.shape({
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
  }),
  id: PropTypes.string,
  onPositionChange: PropTypes.func,
  getContainerSize: PropTypes.func,
  getContainerPosition: PropTypes.func,
}

SelectedBox.defaultProps = {}
