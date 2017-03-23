import React, {PropTypes} from 'react'
import FileInput from '../FileInput/FileInput'

export class Navbar extends React.Component {
    render () {
        return <div className='Navbar'>
            <h1>Navbar</h1>
            <label>Select file:</label>
            <FileInput onFileLoaded={this.props.onFileLoaded} />
        </div>
    }
}

Navbar.propTypes = {
    onFileLoaded: PropTypes.func
}