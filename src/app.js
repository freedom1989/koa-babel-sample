#!/usr/bin/env node

import config from './framework/loadConfig'; // keep loadConfig module first
import koa from 'koa';
import router from './routes/index';
import hbs from 'koa-hbs';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import logger from './framework/logger';
import ajaxDetector from './middleware/ajaxDetector';
import handleErrors from './middleware/handleErrors';
import handle404 from './middleware/handle404';
import session from 'koa-session';
import compress from 'koa-compress';

const app = koa();

app.use(compress());
app.use(session(app));

app.use(ajaxDetector);

app.use(handleErrors);

app.use(handle404);

app.use(serve(__dirname + '/static'));

app.use(hbs.middleware({
    viewPath: __dirname + '/views',
    disableCache: process.env.NODE_ENV === 'development'
}));

app.use(bodyParser());

app.use(router.routes());

app.on('error', function(err) {
    if (process.env.NODE_ENV !== 'test') {
        logger.error('unhandled error %s', err, {
            stack: err.stack
        });
    }
});

app.listen(config.port);
logger.info('koa is listening on ' + config.port);
logger.info('Date now %s', new Date());