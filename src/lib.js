"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trace = exports.format = exports.TraceMessage = void 0;
// Injector
(() => { globalThis["__tokio_internal_t"] = (() => { return { f: (f) => { return `[${f}]`; }, m: (m, c, e) => { var FLAG = false; let res = ""; for (let i = 0; i < m.length; i++) {
        if (m[i] == '"' && FLAG == true) {
            FLAG = false;
            res += `${c}"`;
        }
        else if (m[i] == '"' && FLAG == false) {
            FLAG = true;
            res += "\"\u001b[38;5;56m";
        }
        else {
            res += m[i];
        }
    } return `${c}${res}${e}`; }, d: (r) => { return `${r.getDate()}/${r.getMonth() + 1}/${r.getFullYear()}:${r.getHours()}:${r.getMinutes()}:${r.getSeconds()}.${r.getMilliseconds()}`; }, l: (l) => { let p = ""; if (l == "ERR") {
        p = "\u001b[38;5;196m";
    }
    else if (l == "WRN") {
        p = "\u001b[38;5;208m";
    }
    else if (l == "INF") {
        p = "\u001b[38;5;34m";
    }
    else if (l == "DBG") {
        p = "\u001b[38;5;31m";
    }
    else if (l == "TRC") {
        p = "\u001b[38;5;242m";
    } return [p, "\u001b[0m"]; } }; })(); globalThis["__tokio_internal_format"] = (m, l, _f, r) => { const message = new TraceMessage(r, m, l, _f); return [message.format("SIMPLE"), message.format("CORELOG"), message.format("TOPLOG")]; }; globalThis["__tokio_internal_trace"] = (_i) => { _i = Math.abs(Math.floor(_i)); try {
    try {
        throw new Error();
    }
    catch (e) {
        const arr = e.stack.replace(/  /g, "").split(/\n/g);
        const len = arr.length;
        let line = "";
        let trc = arr[3 + _i].split("(")[1].split(")")[0];
        for (let i = 0; i < len; i++) {
            if (arr[i].startsWith("at Object.<anonymous>")) {
                line = arr[i].split("(")[1].split(")")[0];
                return [line, trc];
            }
        }
        return ["", ""];
    }
}
catch (e) {
    if (e instanceof TypeError) {
        try {
            throw new Error();
        }
        catch (e) {
            const arr = e.stack.replace(/  /g, "").split(/\n/g);
            let trc = arr[4].split("at ")[1];
            return [trc, trc];
        }
    }
    else {
        console.error("Failed to trace, Error: " + e);
        return ["", ""];
    }
} }; globalThis["__tokio_internal_msgformat"] = (t, l, m, tc, ic, f) => { let time = globalThis["__tokio_internal_t"].d(t); let r = ""; for (let i = 0; i < 23; i++) {
    if (time[i] == undefined) {
        r += " ";
    }
    else {
        r += time[i];
    }
} if (f == "CORELOG") {
    return `| ${r} | ${l} | ${globalThis["__tokio_internal_t"].f(ic)} ${m}`;
}
else if (f == "TOPLOG") {
    return `| ${r} | ${l} | ${tc} ${m}`;
}
else {
    let colors = globalThis["__tokio_internal_t"].l(l);
    return `\u001b[38;5;14m${globalThis["__tokio_internal_t"].d(t)} ${colors[0]}${l}${colors[1]} ${globalThis["__tokio_internal_t"].m(m, TraceMessage.TextColorStart, TraceMessage.TextColorEnd)}`;
} }; })();

class TraceMessage {
    static #COLORFUL = false;
    static TextColorStart = (() => { if (TraceMessage.#COLORFUL) {
        return "\u001b[38;5;91m";
    }
    else {
        return "";
    } })();
    static TextColorEnd = (() => { if (TraceMessage.#COLORFUL) {
        return "\u001b[0m";
    }
    else {
        return "";
    } })();
    #time;
    message;
    level;
    #internal_call;
    #top_level_call;
    constructor(time, message, level, file) {
        this.message = message;
        this.level = level;
        this.#time = time;
        this.#internal_call = file[1];
        this.#top_level_call = file[0];
    }
    format(formater) {
        return globalThis["__tokio_internal_msgformat"](this.#time, this.level, this.message, this.#top_level_call, this.#internal_call, formater);
    }
    export() {
        return {
            timestamp: this.#time.getTime(),
            message: this.message,
            level: this.level,
            file: {
                top_level_call: this.#top_level_call,
                internal_call: this.#internal_call
            }
        };
    }
}
exports.TraceMessage = TraceMessage;
function format(message, level, files, time) {
    return globalThis["__tokio_internal_format"](message, level, files, time);
}
exports.format = format;
function trace(depth = 1) {
    return globalThis["__tokio_internal_trace"](depth);
}
exports.trace = trace;
