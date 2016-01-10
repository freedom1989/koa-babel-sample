import Router from 'koa-router';
import getUsers from '../../dao/userDao';

let router = Router({
    prefix: '/users'
});

router.get('/', function *(next) {
    let abc = yield getUsers();
    this.body = abc;
});

export default router;