const handle404 = function *(next) {
    yield next;
    if (this.body || !this.idempotent) return;
    this.status = 404;
    if (this.isAjax) {
        this.body = {
            message: 'Server Internal Error'
        };
    } else {
        yield this.render('error/404');
    }
};
export default handle404;