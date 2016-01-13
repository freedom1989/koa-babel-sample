// NOTE: Do NOT use Arrow Functions in test files
// reson: search 'Arrow functions' in https://mochajs.org/ 

import UserService from '../../src/service/userService';
import chai from 'chai';

const expect = chai.expect;

describe('UserService', function() {

    beforeEach(function(done) {
        Promise.all([
            UserService.addUser('user1', 'password1'),
            UserService.addUser('user2', 'password2')
        ]).then(function() {
            done();
        });
    });

    afterEach(function() {});

    describe('#getUserList', function() {
        it('should have users', function(done) {
            UserService.getUserList().then(function(users) {
                expect(users.length).to.equal(2);
                done();
            }).catch(function(e) {
                done(e);
            });
        });
    });

    describe('#addUser', function() {
        it('should add non-exist user successfully', function(done) {
            console.log('test2');
            UserService.addUser('user3', 'password3').then(function(user) {
                expect(user.name).to.equal('user3');
                expect(user.password).to.equal('password3');
                UserService.getUserList().then(function(users) {
                    expect(users).to.not.be.null;
                    expect(users.length).to.equal(3);
                    done();
                });
            }).catch(function(e) {
                done(e);
            });
        });

        it('should have users', function(done) {
            UserService.getUserList().then(function(users) {
                expect(users.length).to.equal(2);
                done();
            }).catch(function(e) {
                done(e);
            });
        });

        it('should throw custom error when user already exist', function(done) {
            UserService.addUser('user2', 'password2').then(function() {
                done(new Error('existing user are override!!!'));
            }).catch(function(err) {
                expect(err).to.not.be.null;
                expect(err.status).to.equal(400);
                expect(err.custom).to.be.true;
                done();
            });
        });
    });


});