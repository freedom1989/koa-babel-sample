#!/usr/bin/env node

import koa from 'koa';
import router from './routes/index';
import hbs from 'koa-hbs';

var app = koa();

app.use(hbs.middleware({
  viewPath: __dirname + '/static/views'
}));

app.use(router.routes());

app.listen(8000);

