import isEmpty from "lodash/isEmpty";
import logger from "./config/logger"

interface Data {
    stack?: string,
    name?: string,
    message: string,
    getSeverity: Function
}

/**
 * Function create error message
 * @param {Object} [data] error data
 */
const sendError = (data: Data) => {
    try {
        if (isEmpty(data)) return null;

        let stack = data.stack || "No Error Stack";
        let errorName = data.name || "Unknown";
        let severity = data.getSeverity();

        // *Error main data
        let mainData = {
            name: data.name,
            message: data.message,
            severity,
        };

        let value = {
            data: mainData,
            meta: { stack },
            severity,
            message: errorName,
        };

        return value;
    } catch (err) {
        logger.error(err);
    }
};

export default sendError;