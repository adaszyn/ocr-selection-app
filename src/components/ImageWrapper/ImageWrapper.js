import React, {PropTypes} from 'react'
import AreaSelector from '../AreaSelector/AreaSelector'
import './ImageWrapper.css'

export class ImageWrapper extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            imgAspectRatio: 1.0
        }
        this.imageElementRef = null
        this.hiddenImgElement = new Image();
        this.hiddenImgElement.onload = this.setHiddenSize.bind(this)
        this.hiddenImgElement.src = this.getImageBase64Src(this.props.base64Image)
    }

    getImageBase64Src (payload) {
        return `data:image/png;base64,${payload}`
    }

    setHiddenSize () {
        const { width, height } = this.hiddenImgElement
        this.setState({
            imgAspectRatio: width / height
        })
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
                {/*<div className="image-overlay"/>*/}
                <div ref={(imageElementRef) => {this.imageElementRef = imageElementRef}}
                     className="image-container"
                     style={{
                         width: '100%',
                         paddingBottom: `${1 / this.state.imgAspectRatio * 100}%`,
                         border: "3px solid black",
                         backgroundSize: '100% 100%',
                         backgroundImage: `url("${this.getImageBase64Src(this.props.base64Image)}")`}}>

                </div>

                {/*<img ref={(imageElementRef) => {this.imageElementRef = imageElementRef}}*/}
                     {/*className="image"*/}
                     {/*src={this.getImageBase64Src(this.props.base64Image)} />*/}
            </AreaSelector>
        </div>
    }
}

ImageWrapper.propTypes = {
    base64Image: PropTypes.string
}

export default ImageWrapper