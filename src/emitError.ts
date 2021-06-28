import errorEvents from "./event.instance";
import sendError from "./sendError";
import logger from "./config/logger";
import ServerError from './error.class';

/**
 * Listen on custom_error and transform error
 */
errorEvents.on("custom_error", (err) => {
    try {
        logger.error(err, `Error Severity - ${err.severity}`);
        const value = sendError(err);
        errorEvents.emit("reformed_error", value);
    } catch (err) {
        logger.error(err);
    }
});

interface CustomError {
    isCustom?: boolean,
    name: string,
    message: string,
    stack: string
    severity?: string
}

/**
 * It transform error.
 * @param {} err - Error which need to reformed
 */
const emitError = function (err: CustomError) {
    try {
        if (!err) throw new Error("empty error input");
        if (!err.isCustom){
            let error = new ServerError(err.name, err.message, err.stack, err.severity)
            errorEvents.emit('custom_error', error);
        } else{
            errorEvents.emit("custom_error", err);
        }
    } catch (err) {
        logger.error(err);
    }
};

export default emitError;