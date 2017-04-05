import React, { PropTypes } from 'react'
import './FileInput.css'
import uploadIcon from '../../../public/upload.svg'

export class FileInput extends React.Component {
  constructor () {
    super()
    this.containerStyle = {
      backgroundImage: `url(${uploadIcon})`
    }
  }

  onFileChange (e) {
    const file = e.target.files[0]
    this.props.onFileLoaded(file)
  }

  render () {
    return <div className="FileInputContainer" style={this.containerStyle}>
      <input className="FileInput" type="file" id="file-input" onChange={this.onFileChange.bind(this)}/>
      <label className="file-label" htmlFor="file-input"/>
    </div>
  }
}

export default FileInput

FileInput.propTypes = {
  onFileLoaded: PropTypes.func
}