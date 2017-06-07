import React from 'react'
import {SortableTextView, TextView} from '../TextView/TextView'
import {PdfView} from '../PdfView/PdfView'
import {Navbar} from '../Navbar/Navbar'
import './MainPage.css'
import {requestSession, requestText} from '../../logic/service/fake-api'
import {DEFAULT_SELECTED_BLOCK_TYPE} from "../../logic/constants/block-types";
import {MainView} from "../MainView/MainView";
import {WelcomeView} from "../WelcomeView/WelcomeView";
import {Loader} from "../Loader/Loader";

const getInitialState = () => {
    return {
        images: [],
        isLoading: false,
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
}

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

export const setLoading = isLoading => (state) => {
    state.isLoading = isLoading
    return state
}

export class MainPage extends React.Component {
    constructor() {
        super()
        this.state = getInitialState()

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

    setNewBlockType(requestId, blockTypeId) {
        this.setState(setBlockTypeForOcrResult(requestId, blockTypeId))
    }

    onNewProjectSelected() {
        this.callSetStateWithSetter(setLoading, true)
        requestSession(null)
            .then(({sessionId, images}) => {
                this.callSetStateWithSetter(setSessionId, sessionId)
                this.callSetStateWithSetter(setImages, images)
                this.callSetStateWithSetter(setLoading, false)
            })
            .catch(() => {
                this.callSetStateWithSetter(setLoading, false)
            })
    }

    renderView() {
        if (this.state.sessionId) {
            return <MainView
                onSectionRemoved={this.onSectionRemoved.bind(this)}

                ocrResults={this.state.ocrResults}
                setNewBlockType={this.setNewBlockType.bind(this)}
                images={this.state.images}
                onNewSectionOCRRequest={this.onNewSectionOCRRequest.bind(this)}
                onSortEnd={this.onSortEnd.bind(this)}/>
        } else {
            return <WelcomeView loading={this.state.isLoading}
                                onNewProjectSelected={this.onNewProjectSelected.bind(this)}/>
        }
    }

    render() {
        return <div className='MainPage'>
            <Navbar onFileLoaded={this.onFileLoaded.bind(this)}/>
                {this.renderView()}
        </div>
    }
}

