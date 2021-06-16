// used for starting the application
// imports teh application from app.js then starts the app
const app = require('./app') // the actual express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${ config.PORT }`)
})

