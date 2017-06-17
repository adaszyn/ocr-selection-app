export const local = {
  host: 'http://localhost:3000/'
}

export const production = {
  host: '/ocr-api'
}

export default (process.env.NODE_ENV === 'production' ? production : local)