import {postResource} from "../util/XHRPromise";

export function requestFakeText (sections, sessionId, imageId) {
    return Promise.resolve({
      text: 'Lorem ipsum ...'
    })
}
export function requestTextForImage(sections, sessionId, imageId) {
    return postResource('pdf')
}