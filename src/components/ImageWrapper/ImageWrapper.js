import React, {PropTypes} from 'react'
import AreaSelector from '../AreaSelector/AreaSelector'
import './ImageWrapper.css'

/*
 {
 backgroundImage: `url("data:image/gif;base64, ${this.props.base64Image}")`,
 width: '600px',
 height: '600px',
 backgroundPosition: "0% 0%",
 backgroundSize: "100% auto"
 }
*/

export class ImageWrapper extends React.Component {
    constructor () {
        super()
        this.imageElementRef = null
    }
    getImageBase64Src (payload) {
        return `data:image/png;base64, ${payload}`
    }

    getImagePosition () {
        const rect = this.imageElementRef.getBoundingClientRect()
        return {
            x: rect.left,
            y: rect.top
        }
    }

    getImageSize () {
        const rect = this.imageElementRef.getBoundingClientRect()
        return {
            x: rect.width,
            y: rect.height
        }
    }

    render () {
        return <div className="ImageWrapper">
            <AreaSelector getElementPosition={this.getImagePosition.bind(this)}
                          getElementSize={this.getImageSize.bind(this)} >
                <img ref={(imageElementRef) => {this.imageElementRef = imageElementRef}}
                     className="image"
                     src={this.getImageBase64Src(this.props.base64Image)} />
            </AreaSelector>
        </div>
    }
}

ImageWrapper.propTypes = {
    base64Image: PropTypes.string
}

export default ImageWrapper