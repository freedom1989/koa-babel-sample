
let users = [
    {
        name: 'lilintao',
        password: 'passwd1'
    },
    {
        name: 'freedom',
        password: 'passwd2'
    }
];

function getUserList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(users);
        }, 10);
    });
}

function addUser(name, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let user = {
                name,
                password
            };
            users.push(user);
            resolve(user);
        }, 10);
    });
}

function updateUser(name, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // let user;
            // for(user of users) {
            //     if(user.name === name) {
            //         break;
            //     }
            // }
            // user.password = password;
            // resolve(user);
            reject(new Error('simulating database error' + name + ':' + password));
        }, 10);
    });
}

function getUserByName(name) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let findUser = null;
            for(let user of users) {
                if(user.name === name) {
                    findUser = user;
                    break;
                }
            }
            resolve(findUser);
        }, 10);
    });
}

const UserDao = {
    getUserList,
    addUser,
    updateUser,
    getUserByName
};

export default UserDao;

