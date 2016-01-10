export default async function getUsers() {
    let abc = await getlist();
    return abc;
}

function getlist() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(12345);
        }, 1000);
    });
}