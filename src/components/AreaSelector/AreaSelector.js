import React, {PropTypes} from 'react'
import {SelectionBox} from "../SelectionBox/SelectionBox";
import {DEFAULT_SELECTED} from "../../logic/constants/selection-box.styles";
import {SelectedBox} from "../SelectedBox/SelectedBox";

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
        this.setState(setSelectionPositionStart((clientX - position.x) / size.x, (clientY - position.y) / size.y))
    }

    onMouseMove({clientX, clientY}) {
        const position = this.props.getElementPosition()
        const size = this.props.getElementSize()
        this.setState(setSelectionPositionEnd((clientX - position.x) / size.x, (clientY - position.y) / size.y))
    }



    renderSelectedBox (selectionBox) {
        return <SelectedBox position={selectionBox} baseStyle={DEFAULT_SELECTED} />
    }


    render() {
        return <div onMouseDown={this.onMouseDown.bind(this)}
                    style={this.style}
                    onMouseMove={this.onMouseMove.bind(this)}
                    onMouseUp={this.onMouseUp.bind(this)}>
            {this.props.children}
            {this.state.selectionBoxVisible &&
                <SelectionBox position={this.state.selectionPosition} />}
            {this.state.selectedSections.map(this.renderSelectedBox.bind(this))}
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