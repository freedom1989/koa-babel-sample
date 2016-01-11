import Router from 'koa-router';
import controllers from './controllers/index';
import apis from './APIs/index';

let router = Router();

router.use(controllers.routes());
router.use(apis.routes());

export default router;