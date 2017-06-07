import React, {Component, PropTypes} from 'react'
import {SortableTextView} from "../TextView/TextView";
import {PdfView} from "../PdfView/PdfView";

export class MainView extends Component {
    render() {
        const {onNewSectionOCRRequest, onSectionRemoved, ocrResults, onSortEnd, setNewBlockType, images} = this.props
        return <div className='container MainView'>
            <SortableTextView useDragHandle={true} onSortEnd={onSortEnd}
                              onBlockTypeChange={setNewBlockType}
                              results={ocrResults}/>
            <PdfView onNewSectionOCRRequest={onNewSectionOCRRequest}
                     onSectionRemoved={onSectionRemoved}
                     images={images}/>
        </div>

    }
}

MainView.propTypes = {
    onNewSectionOCRRequest: PropTypes.func.isRequired,
    onSectionRemoved: PropTypes.func.isRequired,
    ocrResults: PropTypes.any.isRequired,
    onSortEnd: PropTypes.func.isRequired,
    setNewBlockType: PropTypes.func.isRequired,
    images: PropTypes.any.isRequired

}

MainView.defaultProps = {}
