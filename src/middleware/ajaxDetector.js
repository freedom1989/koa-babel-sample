const ajaxDetector = function*(next) {
    const xhr = this.header['x-requested-with'];
    if (xhr && xhr.toLowerCase() === 'xmlhttprequest') {
        this.isAjax = true;
    } else {
        this.isAjax = false;
    }
    yield next;
};
export default ajaxDetector;