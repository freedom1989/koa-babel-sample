import UserDao from '../dao/userDao';
import CUSTOM_ERRORS from '../framework/customErrors';
import logger from '../framework/logger';

function getUserList() {
    return UserDao.getUserList();
}

function getUserByName(name) {
    return UserDao.getUserByName(name);
}

async function addUser(name, password) {
    // TODO check name and password
    let user = await UserDao.getUserByName(name);
    if (user) {
        CUSTOM_ERRORS.USER_ALREADY_EXISTS.throw(name);
    } else {
        return UserDao.addUser(name, password);
    }
}

async function updateUser(name, password) {
    // TODO check name and password
    let user;
    try {
        user = await UserDao.updateUser(name, password);
    } catch (e) {
        logger.info('catch it!!!');
        throw e;
    }
    if (!user) {
        CUSTOM_ERRORS.USER_DOES_NOT_EXIST.throw(name);
    } else {
        return UserDao.updateUser(name, password);
    }
}

const UserService = {
    getUserList,
    addUser,
    updateUser,
    getUserByName
};

export default UserService;