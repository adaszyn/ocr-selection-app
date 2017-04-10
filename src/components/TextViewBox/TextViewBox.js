import React, {Component, PropTypes} from 'react'
import './TextViewBox.css'
import { SortableElement } from 'react-sortable-hoc';

export class TextViewBox extends Component {
    render() {
        return <div className="TextViewBox">
            <div className="navbar">
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

export const SortableTextViewBox = SortableElement(TextViewBox)
