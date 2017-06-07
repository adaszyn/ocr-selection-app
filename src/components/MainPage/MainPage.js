import React from 'react'
import {Navbar} from '../Navbar/Navbar'
import './MainPage.css'
import {requestEpub, requestSession, requestText} from '../../logic/service/api'
import {BLOCK_TYPE, DEFAULT_SELECTED_BLOCK_TYPE} from "../../logic/constants/block-types";
import {MainView} from "../MainView/MainView";
import {WelcomeView} from "../WelcomeView/WelcomeView";
import {BottomBar} from "../BottomBar/BottomBar";

const getInitialState = () => {
    return {
        images: [],
        isLoading: false,
        sessionId: null,
        selections: [],
        ocrResults: []
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
        this.callSetStateWithSetter(setLoading, true)
        requestSession(file)
            .then(({sessionId, images}) => {
                this.callSetStateWithSetter(setLoading, false)
                this.callSetStateWithSetter(setSessionId, sessionId)
                this.callSetStateWithSetter(setImages, images)
            })
            .catch(() => {
                this.callSetStateWithSetter(setLoading, false)
            })
    }

    onSectionRemoved(id) {
        const ocrResults = this.state.ocrResults
        const filteredOcrResults = ocrResults.filter(ocrResult => ocrResult.requestId !== id)
        this.setState({
            selections: this.state.selections.filter(selection => selection.requestId !== id),
            ocrResults: filteredOcrResults
        })
    }

    onSelectionChanged (request) {
        const {x1, x2, y1, y2} = request.section.position
        const sections = [
            [x1, y1, Math.abs(x1 - x2), Math.abs(y1 - y2), 'Text']
        ]
        const {imageId } = request
        this.callSetStateWithSetter(setOcrActionFinished, request.section.id, null, true)
        requestText(sections, this.state.sessionId, imageId)
            .then((result) => this.callSetStateWithSetter(setOcrActionFinished, request.section.id, result, false))
    }

    onNewSectionOCRRequest(request) {
        const {x1, x2, y1, y2} = request.section.position
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

    renderView() {
        if (this.state.sessionId) {
            return <MainView
                onSectionRemoved={this.onSectionRemoved.bind(this)}
                onSelectionChanged={this.onSelectionChanged.bind(this)}
                ocrResults={this.state.ocrResults}
                setNewBlockType={this.setNewBlockType.bind(this)}
                images={this.state.images}
                onNewSectionOCRRequest={this.onNewSectionOCRRequest.bind(this)}
                onSortEnd={this.onSortEnd.bind(this)}/>
        } else {
            return <WelcomeView onFileLoaded={this.onFileLoaded.bind(this)} loading={this.state.isLoading} />
        }
    }

    onFileExport (args) {
        const elements = this.state.ocrResults.map(ocrResult => ({
            type: BLOCK_TYPE[ocrResult.blockType].tag,
            value: ocrResult.result.text
        }))
        requestEpub({
            ...args,
            elements
        }).catch((err) => {
            console.error(err)
        })
    }

    render() {
        return <div className='MainPage'>
            <Navbar onFileLoaded={this.onFileLoaded.bind(this)}/>
            {this.renderView()}
            <BottomBar onFileExport={this.onFileExport.bind(this)}/>
        </div>
    }
}

