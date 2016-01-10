#!/usr/bin/env node

import koa from 'koa';
import router from './routes/index';
import hbs from 'koa-hbs';
import serve from 'koa-static';

var app = koa();

app.use(function *(next){
  try {
    yield next;
  } catch (err) {
    // some errors will have .status
    // however this is not a guarantee
    this.status = err.status || 500;
    this.type = 'html';
    this.body = '<p>Something <em>exploded</em>, please contact us.</p>';

    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.
    this.app.emit('error', err, this);
  }
});

// custom 404
app.use(function *(next){
    yield next;
    if (this.body || !this.idempotent) return;
    yield this.render('error/404');
});

app.use(serve(__dirname + '/static'));

app.use(hbs.middleware({
    viewPath: __dirname + '/views'
}));

app.use(router.routes());

app.on('error', function(err){
    if (process.env.NODE_ENV != 'test') {
        console.log('[ERROR] %s', err.message);
    }
});

app.listen(8000);
console.log('koa is listening on 8000');

