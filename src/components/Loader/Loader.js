import React, { Component, PropTypes } from 'react'
import './Loader.css'

export class Loader extends Component {
    render () {
        return <div className="Loader" >
            <div className="spinner">
                <div className="bounce1"/>
                <div className="bounce2"/>
                <div className="bounce3"/>
            </div>
        </div>
    }
}

Loader.propTypes = {

}

Loader.defaultProps = {

}
