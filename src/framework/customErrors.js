
const CUSTOM_ERRORS = {
    USER_ALREADY_EXISTS: {
        throw: function(name) {
            throw {
                status: 400,
                custom: true,
                message: name + ' already exist'
            };
        }
    },
    USER_DOES_NOT_EXIST: {
        throw: function(name) {
            throw {
                status: 400,
                custom: true,
                message: name + 'does not exist'
            };
        }
    }
};

export default CUSTOM_ERRORS;