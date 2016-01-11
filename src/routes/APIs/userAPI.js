import Router from 'koa-router';
import UserService from '../../service/userService';

let router = Router({
    prefix: '/users'
});

router.get('/', function *() {
    let userList = yield UserService.getUserList();
    this.body = userList;
});

router.get('/:name', function *() {
    let name = this.params.name;
    let user = yield UserService.getUserByName(name);
    if(!user) {
        this.status = 404;
        this.body = {
            'message': 'user not found'
        };
    } else {
        this.body = user;
    }
}); 

router.post('/', function *() {
    let name = this.request.body.name;
    let password = this.request.body.password;
    let user = yield UserService.addUser(name, password);
    this.body = user;
});

router.put('/:name', function *() {
    let name = this.params.name;
    let password = this.request.body.password;
    let user = yield UserService.updateUser(name, password);
    this.body = user;
});

export default router;