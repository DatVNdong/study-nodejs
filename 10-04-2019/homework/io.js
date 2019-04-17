const fs = require('fs');

const read_file = (path, opts = 'utf8') =>
	new Promise((resolve, reject) => {
		fs.readFile(path, opts, (err, data) => {
			err ? reject(err) : resolve(data);
		});
	});

const write_file = (path, data, opts = 'utf8') =>
	new Promise((resolve, reject) => {
		fs.writeFile(path, data, opts, (err) => {
			err ? reject(err) : resolve('The file has been saved!');
		});
	});

module.exports = {
	readFile: read_file,
	writeFile: write_file
};
// module exports dùng theo kiểu key : value, value là tên hàm hoặc dùng value không cũng được