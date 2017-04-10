import { swapOCRResultsElements } from './MainPage'
import { expect } from 'chai'

describe('MainPage.swapOCRResultsElements state reducer', () => {
    it('should swap place of two elements', () => {
        const testState = {
            ocrResults: [
                1,2,3,4
            ]
        }
        const result = swapOCRResultsElements(0, 1)(testState)
        expect(result.ocrResults).to.be.deep.equal([2,1,3,4])
    })

    it('should throw an error when wrong arguments are passed', () => {
        const testState = {
            ocrResults: [
                1,2,3,4
            ]
        }
        expect(function () {
            swapOCRResultsElements(5, 0)(testState)
        }).to.throw(Error);
    })
})