import React, {PropTypes} from 'react'

export class FileInput extends React.Component {
    onFileChange (e) {
        const file = e.target.files[0];
        this.props.onFileLoaded(file)
    }
    render() {
        return <input type="file" onChange={this.onFileChange.bind(this)}/>
    }
}

export default FileInput

FileInput.propTypes = {
    onFileLoaded: PropTypes.func
}