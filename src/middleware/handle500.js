const handle500 = function *(next) {
    try {
        yield next;
    } catch (err) {
        if (this.isAjax) {
            if (err.custom) {
                this.status = err.status || 500;
                this.body = {
                    message: err.message
                };
            } else {
                this.status = 500;
                this.body = {
                    message: 'Server Internal Error'
                };
            }
        } else {
            if (err.custom) {
                this.status = err.status || 500;
                yield this.render(err.view || 'error/err', { message: err.message });
            } else {
                this.status = 500;
                yield this.render('error/err', err);
            }
        }
        this.app.emit('error', err, this);
    }
};

export default handle500; 