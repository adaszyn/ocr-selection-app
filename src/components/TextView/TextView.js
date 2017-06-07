import React, {PropTypes, Component} from 'react'
import './TextView.css'
import { SortableTextViewBox } from '../TextViewBox/TextViewBox'
import { SortableContainer } from 'react-sortable-hoc';

const DEFAULT_PLACEHOLDER_TEXT = '...'

export class TextView extends Component {
    constructor() {
        super()
        this.state = {
            previewComponentsOrder: []
        }
    }

    handleBlockTypeChange (requestId, blockType) {
        this.props.onBlockTypeChange(requestId, blockType)
    }

    renderPreviewComponents() {
        return this.props.results.map(this.mapKeyToPreviewComponent.bind(this))
    }

    mapKeyToPreviewComponent(item, index) {
        const text = item.result
            ? item.result.text
            : DEFAULT_PLACEHOLDER_TEXT

        const loading = item.loading
        return <SortableTextViewBox index={index}
                                    onBlockTypeChange={this.handleBlockTypeChange.bind(this, item.requestId)}
                                    key={item.requestId}
                                    selectedBlockType={item.blockType}
                                    text={text}
                                    loading={loading}/>

    }

    render() {
        return <div className='TextView'>
            {this.renderPreviewComponents()}
        </div>
    }
}

TextView.propTypes = {
    results: PropTypes.array,
    onBlockTypeChange: PropTypes.func
}

export const SortableTextView = SortableContainer(TextView)