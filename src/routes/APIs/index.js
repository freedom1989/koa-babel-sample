import Router from 'koa-router';
import UserAPI from './userAPI';

let router = Router({
    prefix: '/api'
});

router.use(UserAPI.routes());

export default router;