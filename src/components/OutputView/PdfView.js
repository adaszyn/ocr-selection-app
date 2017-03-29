import React, { PropTypes } from 'react'
import ImageWrapper from '../ImageWrapper/ImageWrapper'
import './PdfView.css'
import { generateUniqueKey } from '../../logic/util/key-generator'
export class PdfView extends React.Component {
  onNewSectionSelected (request) {
    this.props.onNewSectionOCRRequest({
      ...request,
      requestId: generateUniqueKey()
    })
  }
  render () {
    return <div className='PdfView'>
      {this.props.images.map(image => <ImageWrapper onNewSectionSelected={this.onNewSectionSelected.bind(this)}
                                                    imageId={image.imageId} responses={this.props.responses[image.imageId]} base64Image={image.base64Image}/>)}
    </div>
  }
}
PdfView.propTypes = {
  images: PropTypes.array,
  onNewSectionOCRRequest: PropTypes.func,
  responses: PropTypes.any
}
PdfView.defaultProps = {
  responses: {
    'main-00': {
      text: "LorepIpsum et .... "
    }
  }
}