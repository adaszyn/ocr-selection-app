import { expect } from 'chai'
import { mount } from 'enzyme'
import React from 'react'
import AreaSelector from './AreaSelector'
import { removeSelectionBox } from './AreaSelector'

describe('AreaSelector initial state', () => {
  let component
  let initialState
  beforeEach(() => {
    component = mount(<AreaSelector />)
    initialState = component.state()
  })
  it('should consist of selectionPosition obj set to 0, 0', () => {
    expect(initialState.selectionPosition.x1).to.equal(0)
    expect(initialState.selectionPosition.y1).to.equal(0)
    expect(initialState.selectionPosition.x2).to.equal(0)
    expect(initialState.selectionPosition.y2).to.equal(0)
  })

  it('should set selectionBoxVisible flag to false', () => {
    expect(initialState.selectionBoxVisible).to.be.false
  })

  // it('should change the selectionBoxVisible flag on mouseDown event', () => {
  //     component.simulate('mouseDown')
  //     expect(component.state().selectionBoxVisible).to.be.true
  // })
  //
  // it('should change the selectionBoxVisible flag on mouseDown event', () => {
  //     component.simulate('mouseDown')
  //     expect(component.state().selectionBoxVisible).to.be.true
  //     component.simulate('mouseUp')
  //     expect(component.state().selectionBoxVisible).to.be.false
  // })
})

describe('removeSelectionBox', () => {
  let initialState
  beforeEach(() => {
    initialState = {
      selectedSections: []
    }
  })
  it('should remove selectionBox with a proper id', () => {
    initialState.selectedSections.push({
      id: 'a'
    }, {
      id: 'b'
    }, {
      id: 'c'
    })
    const newState = removeSelectionBox('a')(initialState)
    expect(newState.selectedSections).to.have.length(2)
    expect(newState.selectedSections.find(section => section.id === 'a')).to.be.undefined
  })
})