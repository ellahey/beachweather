// logger.js
const {createLogger, format, transports} = require("winston");

const logger = createLogger({
    level: 'info', // Adjust the log level as needed
    format: format.combine(
        format.colorize(),
        format.simple()
    ),
    transports: [
        new transports.Console(),
    ],
});

module.exports = logger;
