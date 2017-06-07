import React from 'react'
import {SortableTextView, TextView} from '../TextView/TextView'
import {PdfView} from '../OutputView/PdfView'
import {Navbar} from '../Navbar/Navbar'
import './MainPage.css'
import {requestSession, requestText} from '../../logic/service/fake-api'
import {DEFAULT_SELECTED_BLOCK_TYPE} from "../../logic/constants/block-types";

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
            requestId,
            blockType: DEFAULT_SELECTED_BLOCK_TYPE.id
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

export const setBlockTypeForOcrResult = (requestId, blockType) => state => {
    const ocrResult = state.ocrResults.find(result => result.requestId === requestId)
    if (!ocrResult) {
        return state
    }
    ocrResult.blockType = blockType
    return state
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
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris'
                    }
                },
                {
                    requestId: 'test2',
                    result: {
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
                    }
                },
                {
                    requestId: 'test3',
                    result: {
                        text: 'akdhsa kdjsakdjsad jsajkdas'
                    }
                },
                {
                    requestId: 'test4',
                    result: {
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
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

    setNewBlockType (requestId, blockTypeId) {
        this.setState(setBlockTypeForOcrResult(requestId, blockTypeId))
    }


    render() {
        return <div className='MainPage'>
            <Navbar onFileLoaded={this.onFileLoaded.bind(this)}/>
            <div className='container'>
                <SortableTextView useDragHandle={true} onSortEnd={this.onSortEnd.bind(this)}
                                  onBlockTypeChange={this.setNewBlockType.bind(this)}
                                  results={this.state.ocrResults}/>
                <PdfView onNewSectionOCRRequest={this.onNewSectionOCRRequest.bind(this)}
                         onSectionRemoved={this.onSectionRemoved.bind(this)}
                         images={this.state.images}/>
            </div>
        </div>
    }
}

