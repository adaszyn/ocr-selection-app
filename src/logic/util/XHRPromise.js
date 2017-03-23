export function postResource (resource, data) {
    return new Promise ((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.open('POST', resource, true)
        request.setRequestHeader('Content-type', 'application/pdf')
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