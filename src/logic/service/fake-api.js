import fakeImages from './fakeImages.json'

export function requestText () {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve({text: "Lorem ipsum"})
    }, 1000)
  })
}

export function requestSession () {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            images: fakeImages,
            sessionId: 'FAKE_SESSION_ID'
        })
    }, 2000)
  })
}

export function requestEpub () {
    return Promise.resolve(null)
}