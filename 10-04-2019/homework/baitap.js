/* Question:
	Làm lại bài tập hôm trước, xử lý module fs để readFile và writeFile. https://nodejs.org/api/fs.html
	1. Tạo file users.js lưu mảng users, tạo file products.js lưu mảng producs.
	2. Dùng fs.readFile để lấy dữ liệu từ hai file đó.
	3. Thực hiện yêu cầu bài trước.
	4. Dùng fs.writeFile để write kết quả vào file.
*/

/* Load necessary module */
const { readFile, writeFile } = require('./io.js');

/* Help to convert string array object to array object */
function convert_object(str) {
	let array_object_str = str.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
	array_object_str = array_object_str.replace(/'/g, '"');
	return JSON.parse(array_object_str);
}

/* Using async await to synchronize */
const run_app = async () => {
	/* Read file */
	const users = convert_object(await readFile('users.js'));
	const products = convert_object(await readFile('products.js'));

	/* Ex1 */
	let products_temp = products.map(product => {
		return Object.assign({}, product);
	});
	// Using map() and find() function to export the result of Ex1
	const result_ex1 = products_temp.map(product => {
		product.userId = users.find(user => user.id === product.userId);
		return product;
	});

	/* Ex 2*/
	// Using map() and filter() function to export the result of Ex2
	const result_ex2 = users.map(user => {
		user.products = products.filter(product => {
			return product.userId === user.id;
		});
		return user;
	});

	/* Write file */
	await writeFile('result_ex1.json', JSON.stringify(result_ex1));

	// Cách 1
	await writeFile('result_ex2.json', JSON.stringify(result_ex2))
		.then(return_data => {
			console.log(return_data);
		})
		.catch(err => {
			console.error(err);
		});
	// Cách 2: Thay vì dùng then catch thì dùng try catch
	// try {
	// 	const mess = await writeFile('result_ex2.json', JSON.stringify(result_ex2));
	// 	console.log(mess);
	// } catch (error) {
	// 	console.error(error);
	// }
}


/* Run application -> It'll create 2 files name result_ext1.json and result_ext2.json */
run_app();
