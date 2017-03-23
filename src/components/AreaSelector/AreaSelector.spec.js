import {expect} from 'chai'
import {mount} from 'enzyme'
import React from 'react'
import AreaSelector from './AreaSelector'

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

    it('should change the selectionBoxVisible flag on mouseDown event', () => {
        component.simulate('mouseDown')
        expect(component.state().selectionBoxVisible).to.be.true
    })

    it('should change the selectionBoxVisible flag on mouseDown event', () => {
        component.simulate('mouseDown')
        expect(component.state().selectionBoxVisible).to.be.true
        component.simulate('mouseUp')
        expect(component.state().selectionBoxVisible).to.be.false
    })
})