import FileSaver from 'file-saver'

export function postResource (resource, data, contentType) {
    return new Promise ((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.open('POST', resource, true)
        request.setRequestHeader('Content-type', contentType)
        request.onreadystatechange = function ({target: {response}}) {
            if (request.readyState === 4 && request.status === 200) {
                resolve(JSON.parse(response))
            }
        }
        request.onerror = function (error) {
            reject(error)
        }
        request.send(data)
    })
}

export function saveFile (resource, data, contentType, fileName) {
    return new Promise ((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.open('POST', resource, true)
        request.responseType = 'blob'
        request.setRequestHeader('Content-type', contentType)
        request.onreadystatechange = function ({target: {response}}) {
            if (request.readyState === 4 && request.status === 200) {
                FileSaver.saveAs(response, fileName);
            }
        }
        request.onerror = function (error) {
            reject(error)
        }
        request.send(data)
    })
}