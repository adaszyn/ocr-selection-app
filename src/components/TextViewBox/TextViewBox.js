import React, {Component, PropTypes} from 'react'
import './TextViewBox.css'
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import draghandleUrl from '../../../public/drag.svg'
import {DropDown} from "../DropDown/DropDown";
import {DEFAULT_BLOCKS} from "../../logic/constants/block-types";

const DragHandle = SortableHandle(() => (
    <img className='drag-handle' style={{height: '40px'}} src={draghandleUrl} />
))

const MAX_TEXT_SIZE = 30

export class TextViewBox extends Component {

    renderTextPreview (text) {
        if (!text) {
            return null
        }
        if (text.length > MAX_TEXT_SIZE) {
            return text.substr(0, MAX_TEXT_SIZE) + '...'
        }
        return text
    }

    render() {
        return <div className="TextViewBox">
            <div className="navbar">
            </div>
            <DragHandle />
            <div className="content">
                { this.renderTextPreview(this.props.text) }
            </div>
            <DropDown selected={this.props.selectedBlockType} values={DEFAULT_BLOCKS} onChange={this.props.onBlockTypeChange} />
        </div>
    }
}

TextViewBox.propTypes = {
    loading: PropTypes.bool,
    text: PropTypes.string,
    onRemove: PropTypes.func,
    onBlockTypeChange: PropTypes.func,
    selectedBlockType: PropTypes.string
}

TextViewBox.defaultProps = {}

export const SortableTextViewBox = SortableElement(TextViewBox)
