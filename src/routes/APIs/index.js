import Router from 'koa-router';
import userAPI from './userAPI';

let router = Router({
    prefix: '/api'
});

router.use(userAPI.routes());

export default router;