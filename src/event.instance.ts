import EventEmitter from "events";

class ErrorEmitter extends EventEmitter {}

/**
 * Instance of ErrorEmitter class
 */
const errorEvents = new ErrorEmitter();

export default errorEvents;