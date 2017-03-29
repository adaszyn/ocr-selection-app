import React, { Component, PropTypes } from 'react'
import {SelectionBox} from "../SelectionBox/SelectionBox";
import './SelectedBox.css'
import {SelectionToolKit} from "../SelectionToolKit/SelectionToolKit";

export class SelectedBox extends SelectionBox {
    constructor () {
        super()
        this.state = {
            ...this.state,
            mouseIsOver: false
        }
    }
    setMouseIsOverValue (value) {
        this.setState({
            mouseIsOver: value
        })
    }

    onMouseEnter () {
        console.log('onMouseEnter');
        this.setMouseIsOverValue(true)
    }

    onMouseLeave () {
        this.setMouseIsOverValue(false)
    }

    render () {
        return <div className="SelectedBox">
            <div className="toolkit-container">
                {this.state.mouseIsOver && <SelectionToolKit />}
            </div>
            {this.getSelectionBox()}
        </div>
    }
}

SelectedBox.propTypes = {

}

SelectedBox.defaultProps = {

}
