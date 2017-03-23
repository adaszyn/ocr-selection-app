import React, { PropTypes } from 'react'
import ImageWrapper from '../ImageWrapper/ImageWrapper'
export class OutputView extends React.Component {

    render () {
        return <div className='OutputView'>
            {this.props.base64Images.map(base64Image => <ImageWrapper base64Image={base64Image}/>)}
        </div>
    }
}
OutputView.propTypes = {
    base64Images: PropTypes.array
}