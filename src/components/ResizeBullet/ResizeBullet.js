import React, { Component, PropTypes } from 'react'
import { AbstractAreaComponent } from '../AbstractAreaComponent/AbstractAreaComponent'
import './ResizeBullet.css'
import { getPositionRelativeToContainer } from '../../logic/util/positioning-util'

export class ResizeBullet extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isDragged: false,
      dragBulletPosition: {
        ...props.position
      }
    }
  }

  getBulletPosition () {
    const dragPosition = this.state.dragBulletPosition
    const minX = Math.min(dragPosition.x1, dragPosition.x2)
    const minY = Math.min(dragPosition.y1, dragPosition.y2)
    const width = Math.abs(dragPosition.x1 - dragPosition.x2)
    const height = Math.abs(dragPosition.y1 - dragPosition.y2)
    return {
      left: `${(minX + width) * 100}%`,
      top: `${(minY + height) * 100}%`,
    }
  }

  onMouseDown (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onDragStart()
  }

  onMouseUp (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onDragStop()
  }

  render () {
    return <AbstractAreaComponent position={this.props.position}>
      <div className="ResizeBullet"
           onMouseDown={this.onMouseDown.bind(this)}
           onMouseUp={this.onMouseUp.bind(this)}/>
    </AbstractAreaComponent>
  }
}

ResizeBullet.propTypes = {
  position: PropTypes.shape({
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
  }),
  getContainerSize: PropTypes.string,
  getContainerPosition: PropTypes.string,
  id: PropTypes.string,
  onPositionChange: PropTypes.func
}

ResizeBullet.defaultProps = {}
