const handle500 = function *(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        if (this.isAjax) {
            if (err.custom) {
                this.body = err;
            } else {
                this.body = {
                    message: 'Server Internal Error'
                };
            }
        } else {
            if (err.custom) {
                yield this.render(err.view, err);
            } else {
                yield this.render('error/500');
            }
        }
        this.app.emit('error', err, this);
    }
};

export default handle500; 