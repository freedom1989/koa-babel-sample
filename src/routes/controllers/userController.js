import Router from "koa-router";

let router = Router({
    prefix: "/users"
});

router.get("/", function *(next) {
    this.body = "get user page";
});

export default router;