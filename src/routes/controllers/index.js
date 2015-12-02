import Router from "koa-router";
import userController from "./userController";

let router = Router();

router.get("/", function *(next) {
    this.body = "get the home page";
});

router.use(userController.routes());

export default router;