import React from 'react'
import {SortableTextView, TextView} from '../TextView/TextView'
import {PdfView} from '../OutputView/PdfView'
import {Navbar} from '../Navbar/Navbar'
import './MainPage.css'
import {requestSession, requestText} from '../../logic/service/fake-api'

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
    ocrResults: [
        ...state.ocrResults.filter(result => result.requestId !== requestId),
        {
            loading,
            result,
            requestId
        }
    ]
})

export const swapOCRResultsElements = (previousIdx, nextIdx) => state => {
    const prev = state.ocrResults[previousIdx]
    const next = state.ocrResults[nextIdx]
    if (!prev || !next) {
        throw new Error('Wrong index')
        return
    }

    state.ocrResults[previousIdx] = next
    state.ocrResults[nextIdx] = prev
    return {
        ...state
    }
}

export class MainPage extends React.Component {
    constructor() {
        super()
        this.state = {
            images: [],
            sessionId: null,
            selections: [],
            ocrResults: [
                {
                    requestId: 'test1',
                    result: {
                        text: '1'
                    }
                },
                {
                    requestId: 'test2',
                    result: {
                        text: '2'
                    }
                },
                {
                    requestId: 'test3',
                    result: {
                        text: '3'
                    }
                },
                {
                    requestId: 'test4',
                    result: {
                        text: '4'
                    }
                }
            ]
        }
        requestSession(null)
            .then(({sessionId, images}) => {
                this.callSetStateWithSetter(setSessionId, sessionId)
                this.callSetStateWithSetter(setImages, images)
            })
    }

    callSetStateWithSetter(setter, ...args) {
        this.setState(setter(...args))
    }

    onFileLoaded(file) {
        requestSession(file)
            .then(({sessionId, images}) => {
                this.callSetStateWithSetter(setSessionId, sessionId)
                this.callSetStateWithSetter(setImages, images)
            })
    }

    onSectionRemoved(id) {
        const ocrResults = this.state.ocrResults
        const filteredOcrResults = ocrResults.filter(ocrResult => ocrResult.id !== id)
        this.setState({
            selections: this.state.selections.filter(selection => selection.id !== id),
            ocrResults: filteredOcrResults
        })
    }

    onNewSectionOCRRequest(request) {
        const {x1, x2, y1, y2} = request.section
        const sections = [
            [x1, y1, Math.abs(x1 - x2), Math.abs(y1 - y2), 'Text']
        ]
        const {imageId, requestId} = request
        this.callSetStateWithSetter(setOcrActionFinished, requestId, null, true)
        requestText(sections, this.state.sessionId, imageId)
            .then((result) => this.callSetStateWithSetter(setOcrActionFinished, requestId, result, false))
    }

    onSortEnd({oldIndex, newIndex}) {
        this.setState(swapOCRResultsElements(oldIndex, newIndex))
    }


    render() {
        return <div className='MainPage'>
            <Navbar onFileLoaded={this.onFileLoaded.bind(this)}/>
            <div className='container'>
                <SortableTextView onSortEnd={this.onSortEnd.bind(this)} results={this.state.ocrResults}/>
                <PdfView onNewSectionOCRRequest={this.onNewSectionOCRRequest.bind(this)}
                         onSectionRemoved={this.onSectionRemoved.bind(this)}
                         images={this.state.images}/>
            </div>
        </div>
    }
}

