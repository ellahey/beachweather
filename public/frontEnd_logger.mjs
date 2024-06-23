// logger.js
import { createLogger, format, transports } from "winston";

const frontEnd_logger = createLogger({
    level: 'info', // Adjust the log level as needed
    format: format.combine(
        format.colorize(),
        format.simple()
    ),
    transports: [
        new transports.Console(),
    ],
});

export { frontEnd_logger }