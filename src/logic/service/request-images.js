import {postResource} from "../util/XHRPromise";
import fakeImages from './fakeImages.json'

export function requestImages(pdfBlob) {
    return postResource('https://dk6fxzxbh3.execute-api.eu-west-1.amazonaws.com/test/pdftoimages', pdfBlob)
}

export function requestFakeImages(data) {
    return new Promise((resolve, reject) => {
        resolve({
            images: fakeImages
        })
    })
}