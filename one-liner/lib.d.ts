/**
 * @author AtomicGamer <github.com/AtomicGamer9523>
 * @license MIT
 * @version 1.0.0
 * @module TruTrace
*/


interface ILogMessage {
    timestamp: number;
    message: string;
    level: string;
    file: {
        top_level_call: string;
        internal_call: string;
    };
}
/**
 * ## `TraceMessage`
 * A utility class for standardizing log messages.
 * Messages can be formated using the `format` method, to be used inside tokio's logging system.
 * Or they can be exported to other libraries, to then be processed there,
 */
export declare class TraceMessage {
    #private;
    /**
     * ## `TextColorStart`
     * The starting color code for the message.
     * @returns {string} color code
     */
    static TextColorStart: string;
    /**
     * ## `TextColorEnd`
     * The ending color code for the message.
     * @returns {string} color code
     */
    static TextColorEnd: string;
    /**
     * message provided by the user
     */
    message: string;
    /**
     * severity level of the message
     */
    level: string;
    constructor(time: Date, message: string, level: string, file: string[]);
    /**
     * ## `format`
     * formats a `TraceMessage` object into a string
     * @param {"CORELOG" | "SIMPLE" | "TOPLOG" | undefined} formater Formater to use, defaults to "SIMPLE"
     * @returns {string} formatted message
     */
    format(formater?: "CORELOG" | "SIMPLE" | "TOPLOG"): string;
    /**
     * ## `export`
     * exports log message
     * @returns {ILogMessage} a log message object
     */
    export(): ILogMessage;
}
/**
 * ## **`format`**
 * Formats a loggable message. \
 * not to be confused with {@link TraceMessage.format `TraceMessage.format`}, which formats a {@link TraceMessage `TraceMessage`} object,
 * which can than be passed into here
 * @param {any} message message
 * @param {string} level log level
 * @param {string[]} files caller files, obtain via the public {@link trace `trace`} function
 * @param {Date} time current time
 * @returns {string[]} 3 formated strings
 * @example
 * ```ts
 * const [simple, corelog, toplog] = format("hello world", "INF", trace(), new Date());
 * ```
 */
export declare function format(message: any, level: string, files: string[], time: Date): string[];
/**
 * ## **`trace`**
 * Traces a function call. \
 * Returns an array of two strings. \
 * The first string is the topmost function that called a lot of items in the call stack. \
 * The second string is the function that actually contained the call to `trace()`.
 * @param {number} [depth=1] depth of the call stack to trace (Modifying this highly is not recommended)
 * @returns {string[]} 2 strings, the first is the top level call, the second is the internal call
 * @example
 * ```ts
 * const [toplevel, internal] = trace();
 * ```
 */
export declare function trace(depth?: number): string[];
export {};