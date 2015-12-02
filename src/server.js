#!/usr/bin/env node

import koa from "koa";
import router from "./routes/index";
import spdy from "spdy";
import spdyOptions from "./conf/spdy-conf";

var app = koa();

app.use(router.routes());

let server = spdy.createServer(spdyOptions, app.callback());

server.on("listening", function() {
    console.log("server is listening on 8443");
});

server.on("error", function(err) {
    console.log(err);
});
server.listen(8443);

