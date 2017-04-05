import React, { Component, PropTypes } from 'react'
import './SelectionToolKit.css'
import closeIcon from '../../../public/cancel.svg'

export class SelectionToolKit extends Component {
  constructor () {
    super()
    this.selectionToolkitStyle = {
      backgroundImage: `url(${closeIcon})`
    }
  }

  render () {
    return <div className="SelectionToolKit"
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}>
      <div className="close" style={this.selectionToolkitStyle}/>
    </div>
  }
}

SelectionToolKit.propTypes = {
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func
}

SelectionToolKit.defaultProps = {}
