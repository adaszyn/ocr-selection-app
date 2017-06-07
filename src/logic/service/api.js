import {postResource, saveFile} from '../util/XHRPromise'
import server from '../constants/server'
import { CONTENT_TYPE } from '../constants/content-type'

export function requestText (sections, sessionId, imageId) {
  const uri = server.host + 'imageToText'
  const request = {
    imageId,
    sessionId,
    sections
  }
  return postResource(uri, JSON.stringify(request), CONTENT_TYPE.JSON)
}

export function requestSession (pdfBlob) {
  const uri = server.host + 'session'
  return postResource(uri, pdfBlob, CONTENT_TYPE.PDF)
}

export function requestEpub (body) {
    const uri = server.host + 'generateEpub'
    return saveFile(uri, JSON.stringify(body), CONTENT_TYPE.JSON, body.title + '.' + body.format)
}