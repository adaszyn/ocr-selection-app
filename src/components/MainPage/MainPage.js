import React from 'react'
import { TextView } from '../TextView/TextView'
import { PdfView } from '../OutputView/PdfView'
import { Navbar } from '../Navbar/Navbar'
import './MainPage.css'
import { requestSession, requestText } from '../../logic/service/fake-api'

const setImages = (images) => (state, props) => ({
  ...state,
  images: images
})

const setSessionId = (sessionId) => (state, props) => ({
  ...state,
  sessionId
})


const setOcrActionFinished = (requestId, result, loading) => (state, props) => ({
  ...state,
  ocrResults: {
    ...state.ocrResults,
    [requestId]: {
      loading,
      result
    }
  }
})

export class MainPage extends React.Component {
  constructor () {
    super()
    this.state = {
      images: [],
      sessionId: null,
      selections: [],
      ocrResults: {}
    }
    requestSession(null)
      .then(({sessionId, images}) => {
        this.callSetStateWithSetter(setSessionId, sessionId)
        this.callSetStateWithSetter(setImages, images)
      })
  }

  callSetStateWithSetter (setter, ...args) {
    this.setState(setter(...args))
  }

  onFileLoaded (file) {
    requestSession(file)
      .then(({sessionId, images}) => {
        this.callSetStateWithSetter(setSessionId, sessionId)
        this.callSetStateWithSetter(setImages, images)
      })
  }

  onNewSectionOCRRequest (request) {
    const {x1, x2, y1, y2} = request.section
    const sections = [
      [x1, y1, Math.abs(x1 - x2), Math.abs(y1 - y2), 'Text']
    ]
    const {imageId, requestId} = request
    this.callSetStateWithSetter(setOcrActionFinished, requestId, null, true)
    requestText(sections, this.state.sessionId, imageId)
      .then((result) => this.callSetStateWithSetter(setOcrActionFinished, requestId, result, false))
  }

  render () {
    return <div className='MainPage'>
      <Navbar onFileLoaded={this.onFileLoaded.bind(this)}/>
      <div className='container'>
        <TextView results={this.state.ocrResults} />
        <PdfView onNewSectionOCRRequest={this.onNewSectionOCRRequest.bind(this)} images={this.state.images}/>
      </div>
    </div>
  }
}

