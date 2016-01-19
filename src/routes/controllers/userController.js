import Router from 'koa-router';
import UserService from '../../service/userService';
import assert from 'http-assert';

let router = Router({
    prefix: '/users'
});

router.get('/', function *() {
    let userlist = yield UserService.getUserList();
    yield this.render('userlist', { users: userlist });
});

router.get('/:name', function *() {
    let name = this.params.name;
    let user = yield UserService.getUserByName(name);
    assert(user, 404, 'user does not exist', {custom: true});
    yield this.render('user', user);
});

export default router;