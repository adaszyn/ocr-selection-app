import React, { PropTypes } from 'react'
import { SelectionBox } from '../SelectionBox/SelectionBox'
import { SelectedBox } from '../SelectedBox/SelectedBox'
import { generateUniqueKey } from '../../logic/util/key-generator'
import { ResizeBullet } from '../ResizeBullet/ResizeBullet'
import { MoveBullet } from '../MoveBullet/MoveBullet'
import { getXDistance, getYDistance, swapXCoordinates, swapYCoordinates } from '../../logic/util/positioning-util'
import { MINIMUM_SELECTION_DISTANCE } from '../../logic/constants/positioning.constants'

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

export const removeSelectionBox = id => state => ({
  ...state,
  selectedSections: state.selectedSections.filter(section => section.id !== id)
})

const addNewSelection = (selectionObject) => (state, props) => ({
  ...state,
  selectedSections: state.selectedSections.concat([selectionObject])
})

export class AreaSelector extends React.Component {
  constructor () {
    super()
    this.state = {
      selectionBoxVisible: false,
      selectionPosition: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      },
      selectedSections: [],
      bulletDrag: null,
      bulletMove: null
    }
    this.style = {
      position: 'relative',
      userSelect: 'none'
    }
    window.addEventListener('keyup', (event) => {
      this.setState({
        selectionBoxVisible: false,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      })
    })
  }

  getCurrentRelativePosition (clientX, clientY) {
    const position = this.props.getElementPosition()
    const size = this.props.getElementSize()
    return {
      x: (clientX - position.x) / size.x,
      y: (clientY - position.y) / size.y
    }
  }

  onMouseUp (event) {
    event.preventDefault()
    this.setState({
      selectionBoxVisible: false
    })
    let newPostion = this.state.selectionPosition
    const xDistance = getXDistance(newPostion)
    const yDistance = getYDistance(newPostion)
    if (xDistance < MINIMUM_SELECTION_DISTANCE || yDistance < MINIMUM_SELECTION_DISTANCE) {
      return;
    }
    if (newPostion.x1 > newPostion.x2) {
      newPostion = swapXCoordinates(newPostion)
    }
    if (newPostion.y1 > newPostion.y2) {
      newPostion = swapYCoordinates(newPostion)
    }
    const selectionBox = {
      position: newPostion,
      id: generateUniqueKey()
    }
    this.setState(addNewSelection(selectionBox))
    this.props.onNewSectionsSelected(selectionBox)
  }

  onMouseDown (event) {
    const {clientX, clientY} = event
    event.preventDefault()
    const position = this.props.getElementPosition()
    const size = this.props.getElementSize()
    this.setState(setSelectionPositionEnd((clientX - position.x) / size.x, (clientY - position.y) / size.y))
    this.setState(setSelectionPositionStart((clientX - position.x) / size.x, (clientY - position.y) / size.y))
    // this prevents selection box to be displayed before START_POSITION is set to new value
    this.setState((state) => ({...state, selectionBoxVisible: true}))

  }

  onMouseMove (event) {
    if (this.state.bulletDrag) {
      const selectionId = this.state.bulletDrag
      const selectedSection = this.state.selectedSections.find(section => section.id === selectionId)
      const {clientX, clientY} = event
      const currentPosition = this.getCurrentRelativePosition(clientX, clientY)
      if (currentPosition.y < selectedSection.position.y1 + 0.01 || currentPosition.x < selectedSection.position.x1 + 0.01) {
        return
      }
      selectedSection.position.y2 = currentPosition.y
      selectedSection.position.x2 = currentPosition.x
      this.setState({
        selectedSections: [
          ...this.state.selectedSections.filter(section => section.id !== selectionId),
          selectedSection
        ]
      })
      return
    }
    if (this.state.bulletMove) {
      const selectionId = this.state.bulletMove
      const selectedSection = this.state.selectedSections.find(section => section.id === selectionId)
      const {clientX, clientY} = event
      const currentPosition = this.getCurrentRelativePosition(clientX, clientY)
      const width = selectedSection.position.x2 - selectedSection.position.x1
      const height = selectedSection.position.y2 - selectedSection.position.y1
      selectedSection.position.x1 = currentPosition.x - width / 2
      selectedSection.position.x2 = currentPosition.x + width / 2
      selectedSection.position.y1 = currentPosition.y - height / 2
      selectedSection.position.y2 = currentPosition.y + height / 2
      this.setState({
        selectedSections: [
          ...this.state.selectedSections.filter(section => section.id !== selectionId),
          selectedSection
        ]
      })
      return
    }

    if (this.state.selectionBoxVisible === false) {
      return
    }
    const {clientX, clientY} = event
    event.preventDefault()
    const position = this.props.getElementPosition()
    const size = this.props.getElementSize()
    this.setState(setSelectionPositionEnd((clientX - position.x) / size.x, (clientY - position.y) / size.y))
  }

  renderSelectedBoxes () {
    return this.state.selectedSections.map(this.renderSelectedBox.bind(this))
  }

  renderSelectedBox (selectionBox) {
    return <SelectedBox getContainerSize={this.props.getElementSize}
                        key={selectionBox.id}
                        getContainerPosition={this.props.getElementPosition}
                        onClose={this.onSelectedBoxClose.bind(this, selectionBox.id)}
                        position={selectionBox.position}
                        id={selectionBox.id}
    />
  }

  onSelectedBoxClose (id) {
    this.setState(removeSelectionBox(id))
    this.props.onSectionRemoved(id)
  }

  renderResizeBullets () {
    return this.state.selectedSections.map(this.renderBulletForSelectedBox.bind(this))
  }

  onBulletDragStart (id) {
    this.setState({
      bulletDrag: id
    })
  }

  onBulletDragStop (id) {
    this.props.onSelectionChanged(this.state.selectedSections.find(section => section.id === id))
    this.setState({
      bulletDrag: null
    })
  }

  renderBulletForSelectedBox (selectionBox) {
    const {x2, y2} = selectionBox.position
    const position = {
      x1: x2,
      x2: x2,
      y1: y2,
      y2: y2
    }
    return <ResizeBullet getContainerSize={this.props.getElementSize}
                         key={selectionBox.id}
                         getContainerPosition={this.props.getElementPosition}
                         position={position}
                         id={selectionBox.id}
                         onDragStart={this.onBulletDragStart.bind(this, selectionBox.id)}
                         onDragStop={this.onBulletDragStop.bind(this, selectionBox.id)}
    />
  }

  renderMoveBullets () {
    return this.state.selectedSections.map(this.renderMoveBullet.bind(this))
  }

  renderMoveBullet (selectionBox) {
    const {x1, x2, y1, y2} = selectionBox.position
    const position = {
      x1: x1 + (x2 - x1) / 2,
      x2: x1 + (x2 - x1) / 2,
      y1: y1 + (y2 - y1) / 2,
      y2: y1 + (y2 - y1) / 2
    }
    return <MoveBullet getContainerSize={this.props.getElementSize}
                       key={selectionBox.id}
                       getContainerPosition={this.props.getElementPosition}
                       position={position}
                       id={selectionBox.id}
                       onMoveStart={this.onBulletMoveStart.bind(this, selectionBox.id)}
                       onMoveStop={this.onBulletMoveStop.bind(this, selectionBox.id)}
    />
  }

  onBulletMoveStart (id) {
    this.setState({
      bulletMove: id
    })
  }

  onBulletMoveStop (id) {
    this.props.onSelectionChanged(this.state.selectedSections.find(section => section.id === id))
    this.setState({
      bulletMove: null
    })
  }

  render () {
    return <div onMouseDown={this.onMouseDown.bind(this)}
                style={this.style}
                onMouseMove={this.onMouseMove.bind(this)}
                onMouseUp={this.onMouseUp.bind(this)}>
      {this.state.selectionBoxVisible &&
      <SelectionBox containerSize={this.props.getElementSize} position={this.state.selectionPosition}/>}
      {this.renderSelectedBoxes()}
      {this.renderResizeBullets()}
      {this.renderMoveBullets()}
      {this.props.children}
    </div>
  }
}

AreaSelector.propTypes = {
  children: PropTypes.object,
  getElementPosition: PropTypes.func,
  getElementSize: PropTypes.func,
  onNewSectionsSelected: PropTypes.func,
  onSectionRemoved: PropTypes.func,
  onSelectionChanged: PropTypes.func
}
AreaSelector.defaultProps = {
  children: null
}
export default AreaSelector