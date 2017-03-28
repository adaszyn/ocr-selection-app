const local = {
    host: 'localhost:3000/'
}

const production = {
    host: 'localhost:3000/'
}

export default (process.ENV === 'production' ? production : local)