import Router from 'koa-router';

let router = Router({
    prefix: '/users'
});

router.get('/', function *() {
    this.body = 'get user page';
});

export default router;