import React, { Component, PropTypes } from 'react'
import './SelectionToolKit.css'

export class SelectionToolKit extends Component {
  render () {
    return <div className="SelectionToolKit"
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}>
      X
    </div>
  }
}

SelectionToolKit.propTypes = {
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func
}

SelectionToolKit.defaultProps = {}
