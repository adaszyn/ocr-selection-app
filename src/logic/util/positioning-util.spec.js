import { expect } from 'chai'
import {swapXCoordinates, swapYCoordinates} from "./positioning-util";

describe('PositioningUtil', () => {
    describe('swapXCoordinates function', () => {
        it ('should swap x1 with x2', () => {
            const position = {
                x1: 1,
                x2: 2,
                y1: 1,
                y2: 2
            }
            const newPosition = swapXCoordinates(position)
            expect(newPosition.x1).to.equal(2)
            expect(newPosition.x2).to.equal(1)
        })
    })
    describe('swapYCoordinates function', () => {
        it ('should swap x1 with x2', () => {
            const position = {
                x1: 1,
                x2: 2,
                y1: 1,
                y2: 2
            }
            const newPosition = swapYCoordinates(position)
            expect(newPosition.y1).to.equal(2)
            expect(newPosition.y2).to.equal(1)
        })
    })
})