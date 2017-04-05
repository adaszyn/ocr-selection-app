import React, { Component, PropTypes } from 'react'
import { SelectionToolKit } from '../SelectionToolKit/SelectionToolKit'
import { AbstractAreaComponent } from '../AbstractAreaComponent/AbstractAreaComponent'
import './SelectedBox.css'
import { PositionPropType } from '../../logic/constants/predefined-prop-types'

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
            {true && <SelectionToolKit />}
          </div>
        </div>
      </AbstractAreaComponent>
    )
  }
}

SelectedBox.propTypes = {
  position: PositionPropType,
  id: PropTypes.string,
  onPositionChange: PropTypes.func,
  getContainerSize: PropTypes.func,
  getContainerPosition: PropTypes.func,
}

SelectedBox.defaultProps = {}
