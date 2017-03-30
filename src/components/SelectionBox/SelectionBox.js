import React, { Component, PropTypes } from 'react'

export class SelectionBox extends Component {
  getCSSPosition (selectionPosition) {
    const minX = Math.min(selectionPosition.x1, selectionPosition.x2)
    const minY = Math.min(selectionPosition.y1, selectionPosition.y2)
    return {
      left: `${minX * 100}%`,
      top: `${minY * 100}%`,
      width: `${Math.abs(selectionPosition.x1 - selectionPosition.x2) * 100}%`,
      height: `${Math.abs(selectionPosition.y1 - selectionPosition.y2) * 100}%`
    }
  }

  onMouseLeave () {

  }

  onMouseEnter () {

  }

  onMouseDown (e) {
  }

  onMouseUp (e) {
  }

  getSelectionBox () {
    return <div className="selectionBox"
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
                onMouseDown={this.onMouseDown.bind(this)}
                onMouseUp={this.onMouseUp.bind(this)}
                style={{
                  position: 'absolute',
                  border: '1px dashed black',
                  ...this.props.baseStyle,
                  ...this.getCSSPosition(this.props.position)
                }}
    />
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



