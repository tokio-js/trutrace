import * as tru from "../src/lib";

function tracer(msg: string){// Not traced
    const traces = tru.trace();
    const [simple] = tru.format(msg, "INF", traces, new Date());
    console.log(simple);
}

function internal_call() {// Internal Call
    tracer("Internal Call");
}

function top_level_call() {
    internal_call();
}

function main() {
    top_level_call();
}

main();// Top Level Call