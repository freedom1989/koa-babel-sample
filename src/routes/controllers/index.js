import Router from 'koa-router';
import userController from './userController';

let router = Router();

router.get('/', function *() {
    yield this.render('index', {title: 'hello world!!!!'});
});

router.use(userController.routes());

export default router;