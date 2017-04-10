import React, {PropTypes, Component} from 'react'
import './TextView.css'
import {SortableTextViewBox, TextViewBox} from '../TextViewBox/TextViewBox'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const DEFAULT_PLACEHOLDER_TEXT = '...'

export class TextView extends Component {
    constructor() {
        super()
        this.state = {
            previewComponentsOrder: []
        }
    }

    renderPreviewComponents() {
        return this.props.results.map(this.mapKeyToPreviewComponent.bind(this))
    }

    mapKeyToPreviewComponent(item, index) {
        const text = item.result
            ? item.result.text
            : DEFAULT_PLACEHOLDER_TEXT

        const loading = item.loading

        return <SortableTextViewBox index={index} key={item.id} text={text} loading={loading}/>

    }

    render() {
        return <div className='TextView'>
            {this.renderPreviewComponents()}
        </div>
    }
}

TextView.propTypes = {
    results: PropTypes.array
}

export const SortableTextView = SortableContainer(TextView)