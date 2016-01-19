import UserDao from '../dao/userDao';
import logger from '../framework/logger';
import assert from 'http-assert';

function getUserList() {
    return UserDao.getUserList();
}

function getUserByName(name) {
    assert(name, 404, 'name should not be empty', {custom: true});
    return UserDao.getUserByName(name);
}

async function addUser(name, password) {
    assert(name, 400, 'name should not be empty', {custom: true});
    assert(password, 400, 'password should not be empty', {custom: true});
    // TODO check name and password
    let user = await UserDao.getUserByName(name);
    assert(user === null, 400, 'user already exist', {custom: true});
    return UserDao.addUser(name, password);
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
    assert(user !== null, 400, 'user doesn\'t exist', {custom:true});
    return UserDao.updateUser(name, password);
}

const UserService = {
    getUserList,
    addUser,
    updateUser,
    getUserByName
};

export default UserService;