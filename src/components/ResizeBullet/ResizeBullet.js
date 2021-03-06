import React, { Component, PropTypes } from 'react'
import { AbstractAreaComponent } from '../AbstractAreaComponent/AbstractAreaComponent'
import './ResizeBullet.css'
import { PositionPropType } from '../../logic/constants/predefined-prop-types'
import resizeIcon from '../../../public/resize.svg'

export class ResizeBullet extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isDragged: false,
      dragBulletPosition: {
        ...props.position
      }
    }
    this.resizeBulletStyle = {
      backgroundImage: `url(${resizeIcon})`
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
           style={this.resizeBulletStyle}
           onMouseDown={this.onMouseDown.bind(this)}
           onMouseUp={this.onMouseUp.bind(this)}/>
    </AbstractAreaComponent>
  }
}

ResizeBullet.propTypes = {
  position: PositionPropType,
  getContainerSize: PropTypes.func,
  getContainerPosition: PropTypes.func,
  id: PropTypes.string,
  onPositionChange: PropTypes.func
}

ResizeBullet.defaultProps = {}
