import sinon from 'sinon';

export default function mockDao(actual, mock, daoName) {

    console.log('mocking dao...' + daoName);

    for(let key in actual) {
        if(actual.hasOwnProperty(key)) {
            sinon.stub(actual, key, mock[key]);
        }
    }
    actual._reset = function() {
        mock._reset();
    };
}