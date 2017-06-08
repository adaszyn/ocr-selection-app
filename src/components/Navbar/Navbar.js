import React, { PropTypes } from 'react'
import FileInput from '../FileInput/FileInput'
import './Navbar.css'
import logo from '../../../public/article-scraper.svg'

export class Navbar extends React.Component {
  render () {
    return <div className='Navbar'>
      <img src={logo} className="logo"/>
      <FileInput onFileLoaded={this.props.onFileLoaded}/>
    </div>
  }
}

Navbar.propTypes = {
  onFileLoaded: PropTypes.func
}