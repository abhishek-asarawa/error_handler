import pino from 'pino';
const logger = pino().child({
    name: "ServiceLog",
    level: process.env.LOG_LEVEL || "debug",
});

export default logger;
