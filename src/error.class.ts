import isEmpty from 'lodash/isEmpty';
import { severities } from './config/index'

/**
 * Class representing a local error
 * @extends Error
 */
class ServerError extends Error {
    severity?: string;
    isCustom: boolean;
    /**
     * Create an error
     * @param {String} name - Name of error
     * @param {String} message - Error Message
     * @param {Object} stack - Error Stack, default null
     * @param {String} severity - Severity of error, default null
     * @param  {...any} args - Other arguments
     */
    constructor(name: string, message: string, stack: string, severity?: string, ...args: (string|number|object)[]) {
        super();
        this.name = name;
        this.message = message;
        this.severity = severity;
        this.stack = stack;
        this.isCustom = true;

        if (!stack) Error.captureStackTrace(this, ServerError);
    }

    getSeverity() {
        if (!isEmpty(this.severity)) return this.severity;

        switch (this.name) {
            case "EvalError":
            case "SyntaxError":
            case "URIError":
                return severities.LOW;

            case "ReferenceError":
            case "AggregateError":
                return severities.MODERATE;

            case "TypeError":
            case "RangeError":
            case "InternalError":
                return severities.MAJOR;

            default:
                return severities.CRITICAL;
        }
    }
}

export default ServerError
