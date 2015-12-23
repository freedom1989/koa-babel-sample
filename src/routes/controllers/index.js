import Router from 'koa-router';
import userController from './userController';

let router = Router();

router.get('/', function *(next) {
    this.render('index', {title: 'koa-hbs'});
});

router.use(userController.routes());

export default router;