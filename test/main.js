import UserDao from '../src/dao/userDao';
import MockUserDao from './mock/dao/mockUserDao';
import mockDao from './MockDaoHelper';

// this will run before any test cases
before(function() {
    console.log('setting up test environment...');
    mockDao(UserDao, MockUserDao, 'UserDao');
});

beforeEach(function() {
    // for every test case, clear the Dao.
    // this will run before other beforeEach method in each file.
    UserDao._reset();
});