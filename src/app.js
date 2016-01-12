#!/usr/bin/env node

import config from './framework/loadConfig'; // keep loadConfig module first
import koa from 'koa';
import router from './routes/index';
import hbs from 'koa-hbs';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import logger from './framework/logger';

const app = koa();

app.use(function *(next) {
    const xhr = this.header['x-requested-with'];
    if(xhr && xhr.toLowerCase() === 'xmlhttprequest') {
        this.isAjax = true;
    } else {
        this.isAjax = false;
    }
    yield next;
});

app.use(function *(next){
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        if(this.isAjax) {
            if(err.custom) {
                this.body = err;
            } else {
                this.body = {
                    message: 'Server Internal Error'
                };
            }
        } else {
            if(err.custom) {
                yield this.render(err.view, err);
            } else {
                yield this.render('error/500');
            }
        }
        this.app.emit('error', err, this);
    }
});

app.use(function *(next){
    yield next;
    if (this.body || !this.idempotent) return;
    this.status = 404;
    if(this.isAjax) {
        this.body = { 
            message: 'Server Internal Error'
        };
    } else {
        yield this.render('error/404');
    }
});

app.use(serve(__dirname + '/static'));

app.use(hbs.middleware({
    viewPath: __dirname + '/views'
}));

app.use(bodyParser());

app.use(router.routes());

app.on('error', function(err){
    if (process.env.NODE_ENV !== 'test') {
        logger.error('unhandled error %s', err, {
            stack: err.stack
        });
    }
});

app.listen(config.port);
logger.info('koa is listening on ' + config.port);
logger.info('Date now %s', new Date());

