import server from '../../../config/server'
import {postResource} from "../util/XHRPromise";

export function requestTextForImage(sections, sessionId, imageId) {
    return postResource(server.host + 'pdf')
}