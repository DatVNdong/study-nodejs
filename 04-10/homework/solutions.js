/* writeStream dùng khi làm web xem phim, đi từng phần, giống youtube (đứt mạng thì dừng, có mạng thì write tiếp) */
/* Hàm async cũng là một promise */
const fs = require('fs');
const path = require('path'); // định nghĩa đường dẫn tuyệt đối ở bất cứ đâu

const data = 'Hello Node.js';
const writingPath = path.resolve('./data');

fs.writeFile(writingPath + '/message.txt', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});