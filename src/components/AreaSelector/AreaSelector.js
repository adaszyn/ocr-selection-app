import React, {PropTypes} from 'react'

const setSelectionPositionStart = (x, y) => (state, props) => ({
    ...state,
    selectionPosition: {
        ...state.selectionPosition,
        x1: x,
        y1: y
    }
})

const setSelectionPositionEnd = (x, y) => (state, props) => ({
    ...state,
    selectionPosition: {
        ...state.selectionPosition,
        x2: x,
        y2: y
    }
})

const addNewSelection = (selectionObject) => (state, props) => ({
    ...state,
    selectedSections: state.selectedSections.concat([selectionObject])
})

export class AreaSelector extends React.Component {
    constructor() {
        super()
        this.state = {
            selectionBoxVisible: false,
            selectionPosition: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            },
            selectedSections: []
        }
        this.style = {
            position: 'relative'
        }
    }

    onMouseUp() {
        this.setState({
            selectionBoxVisible: false
        })
        const selectionBox = {
            ...this.state.selectionPosition
        }
        this.setState(addNewSelection(selectionBox))
        this.props.onNewSectionsSelected(selectionBox)
    }

    onMouseDown({clientX, clientY}) {
        const position = this.props.getElementPosition()
        const size = this.props.getElementSize()
        this.setState({
            selectionBoxVisible: true,

        })
        this.setState(setSelectionPositionStart(clientX - position.x, clientY - position.y))
    }

    onMouseMove({clientX, clientY}) {
        const position = this.props.getElementPosition()
        this.setState(setSelectionPositionEnd(clientX - position.x, clientY - position.y))
    }

    getCSSPosition (selectionPosition) {
        const minX = Math.min(selectionPosition.x1, selectionPosition.x2)
        const minY = Math.min(selectionPosition.y1, selectionPosition.y2)
        return {
            left: minX,
            top: minY,
            width: Math.abs(selectionPosition.x1 - selectionPosition.x2),
            height: Math.abs(selectionPosition.y1 - selectionPosition.y2)
        }
    }

    renderSelectionBox (selectionBox) {
        return <div style={{
            position: 'absolute',
            border: '2px solid red',
            ...this.getCSSPosition(selectionBox)
        }}></div>
    }

    render() {
        return <div onMouseDown={this.onMouseDown.bind(this)}
                    style={this.style}
                    onMouseMove={this.onMouseMove.bind(this)}
                    onMouseUp={this.onMouseUp.bind(this)}>
            {this.state.selectionBoxVisible && <div className="selectionBox" style={{
                position: 'absolute',
                border: '1px dashed black',
                ...this.getCSSPosition(this.state.selectionPosition)
            }}/>}
            {this.state.selectedSections.map(this.renderSelectionBox.bind(this))}
            {this.props.children}
        </div>
    }
}

AreaSelector.propTypes = {
    children: PropTypes.object,
    getElementPosition: PropTypes.func,
    getElementSize: PropTypes.func,
    onNewSectionsSelected: PropTypes.func
}
AreaSelector.defaultProps = {
    children: null,
    onNewSectionsSelected: () => null,
}
export default AreaSelector