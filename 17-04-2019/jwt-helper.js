// jsonwebtoken: mã hóa dữ liệu
const jwt = require('jsonwebtoken');

// Dùng callback
// function generateSignature(callback) {
//     jwt.sign({
//         id: 123456,
//         name: 'son'
//     }, 'this is the key', (err, data) => {
//         err ? callback(err) : callback(data);
//     });
// }

// generateSignature((err, data) => {
//     err ? console.error(err) : console.log(data);
// });

// Dùng Promise
function generateSignature(callback) {
    return new Promise((resolve, reject) => {
        jwt.sign({
            id: 123456,
            name: 'son'
        }, 'this is the key', (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

// generateSignature()
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.error(err);
//     });

// Dùng Async Await
async function test() {
    try {
        const data = await generateSignature();
        // return await generateSignature();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// test();

