import React from 'react'
import { Preview } from '../Preview/Preview'
import { OutputView } from '../OutputView/OutputView'
import { Navbar } from '../Navbar/Navbar'
import {requestImages, requestFakeImages} from "../../logic/service/request-images";
import './MainPage.css'

const setImages = (images) => (state, props) => ({
    ...state,
    images: images
})

export class MainPage extends React.Component {
    constructor () {
        super()
        this.state = {
            images: [],
            selections: []
        }
        requestFakeImages(null)
            .then(({images}) => this.callSetStateWithSetter(setImages, images))
    }

    callSetStateWithSetter (setter, ...args) {
        this.setState(setter(...args))
    }

    onFileLoaded (file) {
        requestImages(file)
            .then(setImages)
    }

    setFakeData () {
        requestFakeImages(null)
            .then(({images}) => this.callSetStateWithSetter(setImages, images))
    }

    render () {
        return <div className='MainPage'>
            <button onClick={this.setFakeData.bind(this)}>SET FAKE IMAGES</button>
            <Navbar onFileLoaded={this.onFileLoaded }/>
            <Preview />
            <OutputView base64Images={this.state.images} />
        </div>
    }
}

