import fakeImages from './fakeImages.json'

export function requestText (sections, sessionId, imageId) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve({text: "Lorem ipsum"})
    }, 1000)
  })
}

export function requestSession (pdfBlob) {
  return new Promise((resolve, reject) => {
    resolve({
      images: fakeImages,
      sessionId: 'FAKE_SESSION_ID'
    })
  })
}