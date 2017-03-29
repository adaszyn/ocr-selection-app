import React, { Component, PropTypes } from 'react'
import './TextViewBox.css'

export class TextViewBox extends Component {
  render () {
    return <div className="TextViewBox">
      <div className="navbar">
        <div className="close-icon" onClick={this.props.onRemove}>X</div>
      </div>
      <div className="content">
        {this.props.text}
      </div>
    </div>
  }
}

TextViewBox.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  onRemove: PropTypes.func
}

TextViewBox.defaultProps = {}
