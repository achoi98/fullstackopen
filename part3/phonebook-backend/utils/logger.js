const info = (...params) => {
    console.log(...params)
}

// function for printing normal log messages
const error = (...params) => {
    console.error(...params)
}


// function for printing error messages
module.exports = {
    info, error
}